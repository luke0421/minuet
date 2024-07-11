# pip install selenium
# pip install requests
# pip install beautifulsoup4
# pip install pandas
# pip install tqdm

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException
from tqdm import tqdm
import json
import time

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db



### firebase 저장


def initialize_firebase():
    cred = credentials.Certificate("C:/Users/SSAFY/Downloads/nd-project-d4d15-firebase-adminsdk-fusb9-9dd8b3b9d5.json")  # Firebase 서비스 계정 키 파일 경로
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://nd-project-d4d15-default-rtdb.asia-southeast1.firebasedatabase.app/'  # 파이어베이스 데이터베이스 URL
    })

def write_to_firebase(data, urls):
    ref = db.reference('news_data/world')  # 'news_data'라는 노드에 데이터를 저장합니다. 이 부분은 파이어베이스에서 원하는 경로로 수정할 수 있습니다.
    ref.set(data)
    ref_urls = db.reference('urls/world')
    ref_urls.set(urls)

if not firebase_admin._apps:
    initialize_firebase()


### firebase 끝


def driver_setting():
    # selenium 사용을 위한 크롬 드라이버 설정
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def get_urls(path):
    ref = db.reference(f'urls/{path}')
    try:
        data = ref.get()
    except:
        return None
    
    return data

def crawling():
    # 저장된 기사 url 목록
    saved_urls = []

    temp = get_urls('world')

    if temp:
        saved_urls = [*temp]
    news_data = []

    driver = driver_setting()

    url = 'https://news.naver.com/section/105' # 네이버 world뉴스
    driver.get(url)

    button = driver.find_element(By.CLASS_NAME, 'section_more_inner._CONTENT_LIST_LOAD_MORE_BUTTON')

    for _ in range(0):
        button.click()
        time.sleep(0.5)

    # 웹 페이지가 로드될 때까지 기다립니다 (최대 10초 기다림)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'sa_text_title')))


    # 기사 목록을 가져오는 과정에서 StaleElementReferenceException 오류가 발생할 경우 재시도합니다.
    for _ in tqdm(range(5)):  # 몇 번 시도할지 임의로 정함
        try:
            title_urls = driver.find_elements(By.CLASS_NAME, 'sa_text_title')
            break
        except StaleElementReferenceException:
            print("StaleElementReferenceException occurred. Retrying...")
            continue

    for title_url in tqdm(title_urls):
        if title_url.get_attribute('href') in saved_urls:
            continue
        news_dict = {}
        try:
            article_url = title_url.get_attribute('href')
            driver.execute_script("window.open('');") # 새 탭 열기
            driver.switch_to.window(driver.window_handles[1]) # 새 탭으로 전환
            driver.get(article_url)

            # 제목과 기사 내용을 가져올 때까지 기다립니다 (최대 10초 기다림)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'media_end_head_headline')))
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'go_trans._article_content')))

            title = driver.find_element(By.CLASS_NAME, 'media_end_head_headline').text
            article = driver.find_element(By.CLASS_NAME, 'go_trans._article_content').text
            datestamp = driver.find_element(By.CLASS_NAME, 'media_end_head_info_datestamp_time._ARTICLE_DATE_TIME').text
            try:
                img_url = driver.find_element(By.ID, 'img1').get_attribute('src')
            except:
                img_url = None

            try:
                summary_button = driver.find_element(By.CLASS_NAME, 'media_end_head_autosummary_button._toggle_btn._SUMMARY_BTN')
                summary_button.click()
                time.sleep(0.5)
                summary = driver.find_element(By.CLASS_NAME, '_contents_body._SUMMARY_CONTENT_BODY').text
            except:
                summary = None


            news_dict['title'] = title
            news_dict['content'] = article
            news_dict['img_url'] = img_url
            news_dict['article_url'] = article_url
            news_dict['datestamp'] = datestamp
            news_dict['summary'] = summary
            if news_dict not in news_data:
                news_data.append(news_dict)

            saved_urls.append(article_url)

        except StaleElementReferenceException:
            print("StaleElementReferenceException occurred. Retrying...")
            continue
        finally:
            driver.close() # 탭 닫기
            driver.switch_to.window(driver.window_handles[0]) # 기존 탭으로 전환

    return news_data, saved_urls

def save_to_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def crawling_and_save():
    news_data, saved_urls = crawling()  # 먼저 기사 데이터를 가져옵니다.
    save_to_json(news_data, 'news_data_105.json')  # 가져온 데이터를 JSON 파일로 저장합니다.
    write_to_firebase(news_data, saved_urls)

crawling_and_save()




