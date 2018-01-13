FROM ubuntu:14.04

MAINTAINER szm

LABEL "version"="0.0.1"

RUN apt-get update
RUN apt-get install --yes wget
RUN apt-get install --yes curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN apt-get install --yes build-essential

# COPY jdk-8u152-linux-x64.tar.gz /home

# JDK
RUN \
wget --header "Cookie: oraclelicense=accept-securebackup-cookie" -O /home/jdk-8u152-linux-x64.tar.gz http://download.oracle.com/otn-pub/java/jdk/8u152-b16/aa0333dd3019491ca4f6ddbe78cdb6d0/jdk-8u152-linux-x64.tar.gz \
  && tar -xzf /home/jdk-8u152-linux-x64.tar.gz -C /home \
  && rm /home/jdk-8u152-linux-x64.tar.gz \
  && ln -s /home/jdk1.8.0_152 /home/jdk
ENV PATH $PATH:/home/jdk/bin
ENV JAVA_HOME /home/jdk
ENV _JAVA_OPTIONS -Djava.net.preferIPv4Stack=true

WORKDIR /usr/src/app

ENV NODE_PATH=/usr/local/lib/node_modules/:/usr/local/lib

COPY ./* /usr/src/app/
COPY docker-process.json /usr/src/app/

# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN npm install pm2 -g
RUN npm install

CMD [ "pm2-docker", "docker-process.json" ]

EXPOSE 8080
