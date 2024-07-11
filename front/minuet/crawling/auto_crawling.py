import schedule
import time
import crawling_101
import crawling_102
import crawling_103
import crawling_104
import crawling_105

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

def initialize_firebase():
    cred = credentials.Certificate("C:/Users/SSAFY/Downloads/nd-project-d4d15-firebase-adminsdk-fusb9-9dd8b3b9d5.json")  # Firebase 서비스 계정 키 파일 경로
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://nd-project-d4d15-default-rtdb.asia-southeast1.firebasedatabase.app/'  # 파이어베이스 데이터베이스 URL
    })

def write_to_firebase(data):
    ref = db.reference('news_data/economic')  # 'news_data'라는 노드에 데이터를 저장합니다. 이 부분은 파이어베이스에서 원하는 경로로 수정할 수 있습니다.
    ref.set(data)

if not firebase_admin._apps:
    initialize_firebase()

url_dict = dict()

url_dict['economic_urls'] = []
url_dict['life_urls'] = []
url_dict['science_urls'] = []
url_dict['social_urls'] = []
url_dict['world_urls'] = []

section_arr = ['economic', 'life', 'science', 'social', 'world']

def run_crawling():
    crawling_101.crawling_and_save()
    crawling_102.crawling_and_save()
    crawling_103.crawling_and_save()
    crawling_104.crawling_and_save()
    crawling_105.crawling_and_save()

# 일정 간격으로 실행할 작업을 스케줄링합니다.
# schedule.every().minutes.do(run_crawling)  # 매 분마다 실행
schedule.every().hour.do(run_crawling)  # 매 시간마다 실행
# schedule.every().day.at("10:00").do(run_crawling)  # 매일 10:00에 실행

while True:
    schedule.run_pending()
    time.sleep(1)  # CPU 소모를 줄이기 위해 잠시 대기합니다.
