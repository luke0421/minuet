import schedule
import time, os

shell_script = '/home/ubuntu/spark-master/code/start_spark.sh'

# 실행할 명령: bash my_script.sh
sys_command = 'bash ' + shell_script

def job():
    # 스크립트 실행
    os.system(sys_command)

# 15분마다 job 함수를 실행하도록 스케줄 설정
schedule.every(10).minutes.do(job)

while True:
    schedule.run_pending()  # 예약된 작업이 있다면 실행
    time.sleep(1)  # CPU 대기.
