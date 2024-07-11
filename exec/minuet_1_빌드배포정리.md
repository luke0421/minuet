# 1. 빌드 배포 정리

## 목차

1. [기술 스택](#기술-스택)
2. [빌드 및 배포](#빌드-및-배포)


## 기술 스택

1. 이슈 관리 : Jira
2. 형상 관리 : Gitlab
3. 빌드/배포 관리 : Jenkins `2.426.3`
4. 커뮤니케이션 : MatterMost, Notion, Discord
5. 개발 환경
    1) 운영체제 Window10
    2) IDE 
         - VSCode `1.85.1`
         - InteliJ `2023.3.2`
    3) 데이터베이스 : MySQL `8.0.36`
    4) 서버 : AWS EC2
         - Ubuntu `20.04 LTS`
         - Docker `25.0.1`
         - docker-compose `2.24.2`
         - Nginx `1.18.0(ubuntu)`
         - Https/SSL `Let's Encrypt`
    
6. 세부사항
    1) Frontend
        - lang: HTML5, CSS3, JAVASCRIPT, Node.js `21.5.0` 
        - Framework: 
            * react-native: `0.73.5`
            * reduxjs/toolkit: `2.2.1`
        - 주요 Libraries
            * axios: `1.6.7`
            * firebase `10.8.1`
        - build 환경
            * expo: `~ 50.0.13`
        - 개발 도구
            * Vite: `5.0.8`
            * ESLint: `8.56.0`
            * Prettier `3.2.4`

    2) Backend
        - Language: Java 17
        - Framework:
            *  Spring Boot: 3.2.1
            *  Spring Security: 3.2.1
            *  Spring Data JPA
        - 주요 Libraries:
            * Lombok
            * JJwt: `0.11.5`
        -  개발 도구:
            *  Spring Boot Devtools
            *  Gradle `8.5`
        -  API 문서화:
            *  Swagger



## 빌드 및 배포
### 1. Spark 설치
📜 [docker Image](https://hub.docker.com/r/bitnami/spark)
1) docker 이미지 다운로드
    ```
    docker pull bitnami/spark
    ```
2) docker-compose.yaml 작성
    - ❗ docker-compose가 설치된 환경이어야 함
    ```bash
    $ cd ~
    $ mkdir spark
    $ cd spark
    $ vim docker-compose.yaml

    version: '3.8'
    services:
    spark-master:
        image: bitnami/spark:3.2.4
        container_name: spark-master
        ports:
        - "8080:8080"
        - "7077:7077"
        volumes:
        - /home/luke/spark-master/library/mysql-connector-j-8.0.33.jar:/opt/bitnami/spark/jars/mysql-connector-j-8.0.33.jar
        - /home/luke/spark-master/library/stopword.txt:/opt/bitnami/spark/stopword.txt
        - /home/luke/spark-master/library/pip-install.sh:/opt/bitnami/spark/pip-install.sh
        environment:
        - SPARK_MODE=master

    # 같은 방식으로 worker 여러 대 추가.
    spark-worker-1:
        image: bitnami/spark:3.2.4
        container_name: spark-worker-1
        depends_on:
        - spark-master
        ports:
        - "8081:8081"
        volumes:
        - /home/ubuntu/spark-master/library/mysql-connector-j-8.0.33.jar:/opt/bitnami/spark/jars/mysql-connector-j-8.0.33.jar
        - /home/ubuntu/spark-master/library/stopword.txt:/opt/bitnami/spark/stopword.txt
        - /home/ubuntu/spark-master/library/pip-install.sh:/opt/bitnami/spark/pip-install.sh
        environment:
        - SPARK_MODE=worker
        - SPARK_MASTER_URL=spark://spark-master:7077
        - SPARK_WORKER_MEMORY=4G
        - SPARK_WORKER_CORES=2

    
    ```
3) 컨테이너 실행
    ```bash
    $ cd ~/spark
    docker compose up -d 
    ```

4) 코드 실행을 위한 사전 python library 설치
    ```bash
    # spark 컨테이너 터미널 접속
    $ docker exec -it spark-master sh

    # volume을 통한 pip-install.sh 실행
    $ ./pip-install.sh
    ```

5) 분산 처리 실행
    ```bash
    # 절대 경로의 final_hot_tag.py 파일을 docker 환경으로 복사.
    $ docker cp -L /home/ubuntu/spark/code/final_hot_tag.py spark-master:/opt/bitnami/spark/final_hot_tag.py

    # final_hot_tag.py 파일을 이용하여 docker 환경에서 분산 처리 실행.
    $ docker exec spark-master spark-submit --master spark://spark-master:7077 final_hot_tag.py
    ```


### 2. AWS EC2 기본 설정 및 nginx 설치
1) (선택) 우분투 미러서버 변경
    - 처음 우분투를 받았을 때 기본설정 되어 있는 미러서버는 느리거나 update시 일부 다운로드가 되지 않는 오류가 발생하는 경우가 있음
    - 국내에서 접근 가능한 가장 빠른 카카오 미러서버로 기본설정 변경

    ```bash
    $ sudo vim /etc/apt/sources.list

    # esc버튼 클릭 후
    :%s/{기존에 입력되어 있던 미러서버 주소}/mirror.kakao.com
    :wq

    deb http://mirror.kakao.com/ubuntu/ focal main restricted

    deb http://mirror.kakao.com/ubuntu/ focal-updates main restricted

    deb http://mirror.kakao.com/ubuntu/ focal-updates universe

    deb http://mirror.kakao.com/ubuntu/ focal multiverse

    deb http://mirror.kakao.com/ubuntu/ focal-updates multiverse

    deb http://mirror.kakao.com/ubuntu/ focal-backports main restricted universe multiverse
    ```

2) nginx 설치 및 SSL 인증서 발급, 적용
    ```bash
    # nginx 설치
    sudo apt-get update
    sudo apt-get install nginx

    # 설치 및 버전 확인
    nginx -v
    ```

    - nginx설치후 letsencrypt를 이용해 SSL 인증서 발급
    ```bash
    sudo apt-get install letsencrypt # letsencrypt 설치

    sudo systemctl stop nginx # 발급을 위한 nginx 정지

    sudo letsencrypt certonly --standalone -d {도메인 주소} # letsencrypt로 서버 domain에 SSL 인증서 발급
    ```

    - nginx 설정 파일을 프로젝트에 맞게 수정
    ```
    sudo vim /etc/nginx/sites-available/default

    server {
            location /api/v1/ {
            proxy_pass http://localhost:{백엔드 포트번호}/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            }


        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/j10e205.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/j10e205.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    }


    server {
        if ($host = j10e205.p.ssafy.io) {
            return 301 https://$host$request_uri;
        } # managed by Certbot


            listen 80 ;
            listen [::]:80 ;
        server_name j10e205.p.ssafy.io;
        return 404; # managed by Certbot
    }

    ```

    * nginx 테스트 후 재가동
    ```bash
    $ sudo nginx -t
    $ sudo systemctl restart nginx
    ```
### 3. FrontEnd 빌드 및 배포
1) Expo CLI 설치
    ```bash
    $ npm install -g expo-cli
    ```
2) Expo에 프로젝트 생성하기
    ```bash
    $ npx create-expo-app minuet
    ```
3) Expo 회원가입

4) 터미널에서 EAS서비스와 상호작용하기 위해 EAS CLI 설치
    ```
    $ npm install -g eas-cli
    ```
5) Exop 로그인
    ```bash
    bash eas login
    ```
6) EAS Build 용 Android 선택 <br>
    ex) Which platforms would you like to configure for EAS Build? » Android
7) eas.json 설정
    ```bash
    build : { preview : { android : {buildType :"apk"}}} 
    ```
8) 빌드 실행
    ```bash
    $ eas build -p android --profile preview
    ```
9) 빌드 결과
    🤖 Android app: https://expo.dev/artifacts/eas/uEgxQE2TmoZN6oJXdVFq9D.apk



### 4. BackEnd 빌드 및 배포
* BackEnd Dockerfile
    ```dockerfile
    FROM openjdk:17-jdk-alpine as build

    WORKDIR /workspace

    COPY gradlew .
    COPY gradle gradle
    COPY build.gradle .
    COPY settings.gradle .
    COPY src src

    RUN chmod +x ./gradlew

    RUN ./gradlew clean build

    FROM openjdk:17-jdk-alpine

    EXPOSE 8090

    COPY --from=build /workspace/build/libs/*.jar /app/app.jar

    ENTRYPOINT ["java","-jar","/app/app.jar"]
    ```

* jenkins에서 Push 알림을 받아 clone 후 자동 배포
    ```bash
    # Spring Project 폴더로 이동
    cd /var/jenkins_home/workspace/back/back/minuet/

    # Docker 이미지 빌드
    docker build -t back-end-image .

    # Docker 컨테이너를 실행합니다.
    if docker ps -a --format '{{.Names}}' | grep -q "back-end-server"; then
        echo "기존의 back-end-server 컨테이너 종료"
        docker stop back-end-server
        echo "기존의 back-end-server 컨테이너 삭제"
        docker rm back-end-server
        echo "새로운 back-end-server 컨테이너 시작"
        docker run -d --name back-end-server -p 8090:8080 back-end-image
    else
        echo "새로운 back-end-server 컨테이너 시작"
        docker run -d --name back-end-server -p 8090:8080 back-end-image
    fi
    ```

* ❗ application.yaml 파일은 git에 업로드되지 않으므로 따로 설정해줌
    ```bash
    echo "branch에서 pull 받은 경로로 이동"
    cd /var/jenkins_home/workspace/back/back/minuet/src/main/resources

    echo "application.yaml 작성"
    cat > application.yaml << EOF
    spring:
        datasource:
            driver-class-name: com.mysql.cj.jdbc.Driver
            url: jdbc:mysql://<your-host>:<your-port>/<db-name>?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8
            username: <db-username>
            password: <db-password>
            
        data:
            mongodb:
            uri: mongodb+srv://<user-name>:<user-password>@<your-host>/<db-name>

        jpa:
            hibernate:
            ddl-auto: update
            properties:
            hibernate:
                format_sql: true

        logging:
        level:
            org.hibernate.Sql: debug

        # Swagger
        springdoc:
        packages-to-scan: com.ssafy.minuet # 컨트롤러 가져오기
        default-consumes-media-type: application/json;charset=UTF-8
        default-produces-media-type: application/json;charset=UTF-8
        swagger-ui:
            path: /api-docs/
            disable-swagger-default-url: true
            display-request-duration: true
            operations-sorter: method
            use-fqn: true

        # JWT
        jwt:
        #HS256 알고리즘을 사용할 것. 256bit, 즉 64bit 이상의 secret key를 사용
        secret_key: <your-secret-key>
        expiration_time: <expiration time>
    EOF
    ```
