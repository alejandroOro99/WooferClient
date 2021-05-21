FROM alpine

COPY README.md usr/local/tomcat/webapps/README.md

COPY build/libs/Woofer2021Server-1.0-SNAPSHOT.jar usr/local/tomcat/webapps/Woofer2021Server-1.0-SNAPSHOT.jar
