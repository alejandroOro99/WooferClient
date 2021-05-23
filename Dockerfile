FROM alpine

RUN apk add openjdk8
COPY build/libs/woofer-0.0.1-SNAPSHOT.jar usr/local/tomcat/webapps/woofer-0.0.1-SNAPSHOT.jar

