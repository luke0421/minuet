# 라이브러리 로드
from krwordrank.word import summarize_with_keywords
from kiwipiepy import Kiwi
from pyspark.sql import SparkSession, Row
from pyspark.sql.functions import sum
import os, pymongo

# ===========================================================================================================================

# Spark Session 생성
spark = SparkSession.builder\
    .appName("Hot Keyword")\
    .master("spark://localhost:7077")\
    .config("spark.jars", "/opt/bitnami/spark/jars/mysql-connector-j-8.0.33.jar")\
    .getOrCreate()

# ===========================================================================================================================
# MySQL 연결 정보
mysql_host = "localhost"
mysql_port = "3306"
mysql_database = "example_db"
mysql_username = "ubuntu"
mysql_password = "password"

# 테이블 데이터 가져오기.
table_list = ((), ("economic_news", 1), ("social_news", 2), ("life_news", 3), ("world_news", 4), ("science_news", 5))

# 5개의 뉴스 테이블에서 데이터 읽기
dfs = []
for i in range(2, len(table_list)):  # 예시로 1부터 5까지의 테이블 이름을 가정
    query = f"(SELECT id, content FROM {table_list[i][0]} WHERE publish_time > NOW() - INTERVAL 1 HOUR) AS tmp"
    # query = f"(SELECT id, content FROM {table_list[i][0]} limit 5000) AS tmp"
    tmp_df = spark.read.format("jdbc").options(
        url=f"jdbc:mysql://{mysql_host}:{mysql_port}/{mysql_database}",
        driver="com.mysql.cj.jdbc.Driver",
        dbtable=query,
        user=mysql_username,
        password=mysql_password
    ).load()
    dfs.append(tmp_df)

# 데이터 프레임 병합
merged_df = dfs[0]
for df in dfs[1:]:
    merged_df = merged_df.union(df)

# ===========================================================================================================================

# 불용어 리스트 가져오기
stop_words = set()                                              # 저장할 불용어 집합
file = open(os.getcwd()+'/stopword.txt', 'r', encoding='UTF-8')    # 현재 작업 디렉토리의 stopword.txt 파일 열기
lines = file.readlines()
for i in lines:
    stop_words.add(i.replace('\n',''))

# 파일 입출력 연결 해제
file.close()

# ===========================================================================================================================
def extract_keywords_and_nouns(iterator):
    kiwi = Kiwi()
    results = []

    for row in iterator:
        # 키워드 추출
        texts = []
        sentence = row['content']
        sentences = kiwi.split_into_sents(sentence)
        texts += [sent.text for sent in sentences]
        keywords = summarize_with_keywords(texts, min_count=2, max_length=10)

        # 각 키워드에 대한 명사 추출
        for keyword, importance in keywords.items():
            analysis_results = kiwi.analyze(keyword, top_n=1)
            nouns = [result.form for result in analysis_results[0][0] if result.tag in ['NNP', 'NNG']]
            for noun in nouns:
                if noun in stop_words:
                    continue
                results.append(Row(id=row['id'], noun=noun, importance=importance))

    return results

# RDD를 사용하여 mapPartitions 호출
extracted_rdd = merged_df.rdd.mapPartitions(extract_keywords_and_nouns)

# 최종 결과를 데이터 프레임으로 전환
final_df = spark.createDataFrame(extracted_rdd, schema=["id", "noun", "importance"])

# ===========================================================================================================================
# 결과 생성

# 'keyword'를 기준으로 그룹화하고, 각 그룹 내에서 'importance'의 최대값을 선택
grouped_keywords_df = final_df.groupBy("hot-nouns").agg(sum("importance").alias("max_importance"))

# 'max_importance'를 기준으로 내림차순 정렬하고, 상위 10개의 결과를 선택
top_10_keywords = grouped_keywords_df.orderBy("max_importance", ascending=False).limit(10)

top_10_keywords.show()
    
# ===========================================================================================================================
# mongoDB 삽입

rows = top_10_keywords.toLocalIterator() 
my_list = []
for row in rows:
    tmp_dict = {}
    tmp_dict["word"] = row["hot-nouns"]
    tmp_dict["_class"] = "com.ssafy.minuet.hotTag.entity.HotTag"
    my_list.append(tmp_dict)

# MongoDB와 연결
client = pymongo.MongoClient("mongodb+srv://localhost")

# 데이터베이스 선택
db = client["minuet"]

# 컬렉션 선택 (없으면 새로 생성됨)
collection = db["hottag"]

# 이전 데이터
before_data = collection.find()

# 기존의 모든 데이터 삭제
collection.delete_many({})

# 새 데이터 추가
insert_many_result = collection.insert_many(my_list)

# mongoDB connection 해제
client.close()

# ===========================================================================================================================

# Spark Session 종료
spark.stop()