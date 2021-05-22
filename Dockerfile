FROM alpine

RUN apk add openjdk8
COPY woofer-0.0.1-SNAPSHOT usr/local/tomcat/webapps/woofer-0.0.1-SNAPSHOT

