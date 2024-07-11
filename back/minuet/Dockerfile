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
