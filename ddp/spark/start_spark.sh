#!/bin/bash

# =====================================================================================================
# codename.py를 반드시 작성할 것.
# =====================================================================================================

# 절대 경로로 codename.py 파일을 docker 환경으로 복사.
docker cp -L /home/luke/spark-master/code/final_hot_tag.py spark-master:/opt/bitnami/spark/final_hot_tag.py

# codename.py 파일을 이용하여 docker 환경에서 분산 처리 실행.
docker exec spark-master spark-submit --master spark://spark-master:7077 final_hot_tag.py