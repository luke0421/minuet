from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException
from krwordrank.word import summarize_with_keywords
from krwordrank.sentence import summarize_with_sentences
from kiwipiepy import Kiwi
from datetime import datetime
import pymysql
import time, random

kiwi = Kiwi()
my_penalty = lambda x:0 if (25 <= len(x) <= 80) else 1

# 이미 수집한 DB 정보 기입
saved_news_host_name = 'host'
saved_news_host_port = 3308 
saved_news_username = 'ubuntu'
saved_news_password = 'password'
saved_news_database_name = 'example_db'

# 뉴스 요약 저장한 DB 정보 기입
summary_news_host_name = 'host'
summary_news_host_port = 3306
summary_news_username = 'ubuntu'
summary_news_password = 'password'
summary_news_database_name = 'example_db'

# 크롤링에 필요한 정보 기입
stopword_path = '/home/ubuntu/minuet/crawling/news_stopword.txt' # 불용어 리스트 파일 절대 경로
saved_news_table_name = 'gangwon_news' # 수집한 뉴스 테이블명
saved_news_url_table_name = 'gangwon_url_saved' # 중복 수집 방지를 위한 수집한 뉴스 url 테이블명
target_url = 'https://www.yna.co.kr/local/gangwon/index/1' # 크롤링할 목표 url 메인 페이지
summary_news_target_table_name = 'region_news' # 뉴스 요약 저장할 테이블 명
summary_news_target_table_category_number = '3' # 뉴스 요약 테이블의 카테고리 번호.(예시. 부산:'1', 울산:'2', 강원:'3', 경남:'4', 인천:'5')

# ================================================================================================================
# 크롤링 시작하는 함수

def start_crawling():
    saved_urls = get_saved_urls_from_mysql(saved_news_url_table_name) # DB test 테이블에서 이미 수집한 뉴스 url 로딩.
    news_data, new_saved_urls = crawling(saved_urls=saved_urls, target_url=target_url) # 크롤링 실행
    # 넣을 데이터, 넣을 데이터 테이블명, 넣을 url, 넣을 url 테이블명
    save_summary_to_mysql(news_data, summary_news_target_table_name, summary_news_target_table_category_number) # 요약 뉴스 본문 DB의 regino_news 테이블에 강원 카테고리로 저장
    save_news_to_mysql(news_data, saved_news_table_name, new_saved_urls, saved_news_url_table_name) # DB에 크롤링 결과(새로운 뉴스 정보, 새로운 뉴스 url) 저장.

# ================================================================================================================
# DB에서 이미 수집한 뉴스 URL 로딩

def get_saved_urls_from_mysql(table_name):

    urls = []
    try:
        db = pymysql.connect(
        host=saved_news_host_name,     # MySQL Server Address
        port=saved_news_host_port,     # MySQL Server Port
        user=saved_news_username,      # MySQL username
        passwd=saved_news_password,    # password for MySQL username
        db=saved_news_database_name,   # Database name
        charset='utf8'
        )
        
        cursor = db.cursor()

        # 2시간 이전 뉴스 이후에 올라온 뉴스 url 가져오기.
        sql= f"SELECT * FROM {table_name} WHERE publish_time > NOW() - INTERVAL 2 HOUR;"
        cursor.execute(sql)
        data = cursor.fetchall()
        urls = list(map(lambda x: x[1], data))

    except Exception as e:
        print(e)

    finally:
        db.close()
    
    return urls

# ================================================================================================================
# 새로 크롤링한 뉴스 데이터 DB에 저장

def save_news_to_mysql(news_data, data_table_name, new_saved_urls, urls_table_name):

    try:
        db = pymysql.connect(
        host=saved_news_host_name,     # MySQL Server Address
        port=saved_news_host_port,     # MySQL Server Port
        user=saved_news_username,      # MySQL username
        passwd=saved_news_password,    # password for MySQL username
        db=saved_news_database_name,   # Database name
        charset='utf8'
        )
        
        cursor = db.cursor()

        publish_time = datetime.now()
        # 수집한 url을 urls_table_name에 저장
        for url in new_saved_urls:
            sql = f"INSERT INTO {urls_table_name} (url, publish_time) VALUES('{url}', '{publish_time}');"
            cursor.execute(sql)

        # 수집한 news data를 data_table_name 에 저장
        for news in news_data:
            sql = "INSERT INTO {} (title, content, article_url, img_url, summary, publish_time) VALUES(%s, %s, %s, %s, %s, %s);".format(data_table_name)
            cursor.execute(sql, (news['title'], news['content'], news['article_url'], news['img_url'], news['summary'], publish_time))

        db.commit()
    
    except Exception as e:
        print(e)

    finally:
        db.close()

    return 

# ================================================================================================================
# 요약 뉴스 데이터 DB에 저장

def save_summary_to_mysql(news_data, data_table_name, category):
    stopwords = get_stopwords()
    try:
        db = pymysql.connect(
        host=summary_news_host_name,     # MySQL Server Address
        port=summary_news_host_port,     # MySQL Server Port
        user=summary_news_username,      # MySQL username
        passwd=summary_news_password,    # password for MySQL username
        db=summary_news_database_name,   # Database name
        charset='utf8'
        )
        
        cursor = db.cursor()
        publish_time = datetime.now().date()

        # None 이거나 공백만으로 이루어진 요약 제거.
        news_data = list(filter(lambda x: (x["summary"] is not None) and (not x["summary"].isspace()), news_data))

        # summary 를 생활 카테고리로 news table에 저장
        for news in news_data:
            keyword = get_keywords(text=news['content'], stopwords=stopwords)
            sql = "INSERT INTO {} (title, content, newsurl, imgurl, publish_date, region_id, like_count, dislike_count, bookmark_count, keyword) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);".format(data_table_name)
            cursor.execute(sql, (news['title'], news['summary'], news['article_url'], news['img_url'], publish_time, category, '0', '0', '0', keyword))

        db.commit()

    except Exception as e:
        print(e)

    finally:
        db.close()

    return

# ================================================================================================================
# selenium 사용을 위한 크롬 드라이버 설정

def driver_setting():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless") # GUI 없이 실행
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=chrome_options)
    return driver

# ================================================================================================================
# 크롤링

def crawling(saved_urls, target_url):

    # 크롤링 하기 위한 드라이버 셋팅
    driver = driver_setting()
    driver.get(target_url)

    # 웹 페이지가 로드될 때까지 기다립니다 (최대 10초 기다림)
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'tit-wrap')))

    # 기사 목록들을 가져오기
    news_urls = []
    try:
        # 특정 클래스를 가진 요소를 식별
        parent_element = driver.find_element(By.CLASS_NAME, 'box-latest01')
        child_elements = parent_element.find_elements(By.CLASS_NAME, 'tit-wrap')
        
        for title_url in child_elements:
            href = title_url.get_attribute('href')
            if href and href not in saved_urls:
                news_urls.append(href)

    except StaleElementReferenceException:
        print("StaleElementReferenceException occurred.")
        # 에러 발생하면 페이지 수집하지 않고 넘어간다.
        pass

    # 크롤링 시작
    news_data = [] # 크롤링 데이터 저장할 리스트.
    new_saved_urls = [] # 새로 수집한 뉴스 url
    
    for news_url in news_urls:
        try:
            driver.execute_script("window.open('');") # 새 탭 열기
            driver.switch_to.window(driver.window_handles[1]) # 새 탭으로 전환
            driver.get(news_url)
        except StaleElementReferenceException:
            # 새 탭을 여는데 실패하면, 게시글이 사라지거나 주소가 바뀐 것이다.
            # 그럴 경우 해당 게시글은 수집하지 않고 다음 뉴스로 넘어간다.
            continue

        try:
            # 제목과 기사 내용을 가져올 때까지 기다립니다 (최대 5초 기다림)
            WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'tit')))
            WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'update-time')))
            WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "img")))
            article_element = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "story-news")))

            header = driver.find_element(By.CLASS_NAME, 'title-article01') # title을 위함.
            articles =  article_element.find_elements(By.TAG_NAME, 'p')
            article=""

            for p_tag in articles:
                if "yna.co.kr" in p_tag.text:
                    break
                else:
                    article= article + p_tag.text

            news_dict = {
                'title': header.find_element(By.CLASS_NAME, 'tit').text,
                'content': article,
                'img_url': None,
                'article_url': news_url,
                'summary': None
            }

            # 이미지 URL이 있으면 가져온다.
            try:
                real_img_url = article_element.find_element(By.CLASS_NAME, 'img')
                news_dict['img_url'] = real_img_url.find_element(By.TAG_NAME, 'img').get_attribute('src')
            except:
                pass

            # 요약 있다면 가져오기

            try:
                summary_button = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'btn-type01.tip01.summary01.on')))
                summary_button.click()
                time.sleep(random.uniform(0.5, 1))
                summary_element = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "scroller")))

                summary_elements =  summary_element.find_elements(By.TAG_NAME, 'p')
                summary=""

                for p_tag in summary_elements:
                    summary= summary + p_tag.text
                    if "제보는 카카오톡 okjebo" in p_tag.text:
                        break
                    else:
                        summary= summary + p_tag.text

                news_dict['summary'] = summary
                
            except:
                news_dict['summary'] = make_summary(article)
                pass

            news_data.append(news_dict)
            new_saved_urls.append(news_url)

        except StaleElementReferenceException:
            print("StaleElementReferenceException occurred. Retrying...")

        finally:
            driver.close() # 탭 닫기
            driver.switch_to.window(driver.window_handles[0]) # 기존 탭으로 전환
            time.sleep(random.uniform(3,6))

    return news_data, new_saved_urls

# ================================================================================================================
# 불용어 리스트 가져오기
def get_stopwords():
    stopwords = set() # 저장할 불용어 집합
    file = open(stopword_path, 'r', encoding='UTF-8') 
    lines = file.readlines()
    for line in lines:
        stopwords.add(line.replace('\n',''))

    # 파일 입출력 연결 해제
    file.close()
    return stopwords

# ================================================================================================================
# 뉴스 핵심 키워드 선정

def get_keywords(text, stopwords):
    # 문장 분리
    sentences = [sent.text for sent in kiwi.split_into_sents(text)]

    # 문장이 하나일 경우 키워드 없음
    if(len(sentences) < 2):
        return ""
    # KR-WordRank에서 제공하는 summarize_with_keywords 함수 사용하여 키워드 추출
    keywords = summarize_with_keywords(sentences, min_count=3, max_length=10)  # stopwords 파라미터 제거

    # 키워드와 점수를 포함하는 리스트 생성 및 점수 기준 내림차순 정렬
    top_keywords = sorted(keywords.items(), key=lambda x: x[1], reverse=True)

    # 선택된 키워드들을 공백으로 구분하여 하나의 문자열로 합침
    tmp_keywords = ' '.join([keyword for keyword, _ in top_keywords])

    # 형태소 분석
    analyzed_keywords = kiwi.analyze(tmp_keywords, top_n=1)

    # 형태소 분석 결과에서 불용어 제거 후 명사 추출, 여기서 불용어 제거 수행
    hot_keywords = [result.form for analyzed in analyzed_keywords for result in analyzed[0] if result.tag in ['NNP', 'NNG']]
    hot_keywords = [keyword for keyword in hot_keywords if keyword not in stopwords][:3]  # 불용어 제거 및 상위 3개 추출

    # 최종 결과를 문자열로 합침
    result = ' '.join(hot_keywords)

    return result

# ================================================================================================================
# 뉴스 요약 기능

def make_summary (text):
    try:
        sentences = [sent.text for sent in kiwi.split_into_sents(text)]
        # 문장이 하나일 경우 키워드 없음
        if(len(sentences) < 4):
            return " ".join(sentences) 
        
        # 요약 실행
        keysents = summarize_with_sentences(
            sentences,
            num_keywords=2,  # 추출할 키워드 개수
            num_keysents=4,  # 추출할 핵심 문장 개수
            min_count=3,  # 단어의 최소 출현 빈도
            max_length=10,  # 추출할 단어의 최대 길이
            penalty=my_penalty  # 문장 길이에 따른 패널티 조정
        )[1]
    
        # 결과 출력
        # print("키워드:", keywords)
        return " ".join(keysents)
    
    except:
        return text
