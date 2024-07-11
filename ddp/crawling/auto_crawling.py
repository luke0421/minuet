from datetime import datetime, timedelta
import schedule, time, random
import crawling_science
import crawling_gyeongnam, crawling_incheon
import random

# 이 파일의 내용을 수정하여 여러대의 서버에서 구동합니다.
def run_crawling():
    print(datetime.now().date())
    print("=====================================================================")
    print("start crawling_gyeongnam...")
    crawling_gyeongnam.start_crawling()
    print("crawling_gyeongnam FINISH !!!")

    print(datetime.now().date())
    print("=====================================================================")
    print("start crawling_science...")
    crawling_science.start_crawling()
    print("crawling_science FINISH !!!")

    print(datetime.now().date())
    print("=====================================================================")
    print("start crawling_incheon...")
    crawling_incheon.start_crawling()
    print("crawling_incheon FINISH !!!")
    print()
    print()

def schedule_today_tasks(start_hour, end_hour, from_minute, to_minute):
    print("=====================================================================")
    print(datetime.now().date())
    print()

    # 현재 스케줄된 모든 작업 취소
    schedule.clear()

    # 오늘 날짜 계산
    today = datetime.now().date()

    # 오늘 start_hour 시부터 end_hour 시까지 스케줄 설정
    start_time = datetime.combine(today, datetime.min.time()).replace(hour=start_hour)
    end_time = datetime.combine(today, datetime.min.time()).replace(hour=end_hour)

    # start_hour 시부터 end_hour 시까지 from_minute ~ to_minute분 간격으로 task 실행
    current_time = start_time
    while current_time < end_time:
        # 스케줄 설정
        schedule.every().day.at(current_time.strftime("%H:%M")).do(run_crawling)
        # 랜덤 간격 설정
        random_minutes = random.randint(from_minute, to_minute)
        current_time += timedelta(minutes=random_minutes)

    my_jobs = schedule.get_jobs()
    print("=====================================================================")
    print("my scheduled jobs:")
    for job in my_jobs:
        print(f"Job(interval={job.interval}, unit={job.unit}, do={job.job_func.__name__}, Next run={job.next_run})")
    print()


# 매일 아침 6시 50분에 오늘의 일정을 스케줄링
# 7시 부터 22시까지 16 ~ 25 분 랜덤으로 스케줄 실행
# 6시 50분에 시작할 경우, 최소 16분 이후인 7시 6분에 시작된다.
# 이미 시간이 현재보다 지난 스케줄들은 실행이 되지 않는다.
schedule.every().day.at("06:50").do(schedule_today_tasks, 7, 22, 16, 25)

while True:
    schedule.run_pending()
    time.sleep( random.uniform(3,10))  # CPU 소모를 줄이기 위해 잠시 대기합니다.
