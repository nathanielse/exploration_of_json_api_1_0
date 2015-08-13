FROM debian:jessie

ENV DEBIAN_FRONTEND noninteractive
ENV PATH $PATH:/usr/local/iojs/bin

RUN apt-get update -qq && \
    apt-get install -y \
            ca-certificates \
            git \
            wget

RUN wget https://iojs.org/dist/v3.0.0/iojs-v3.0.0-linux-x64.tar.gz && \
    tar -xzvf iojs-v3.0.0-linux-x64.tar.gz && \
    mv iojs-v3.0.0-linux-x64 /usr/local/iojs && \
    rm -rf iojs-v3.0.0-linux-x64.tar.gz

RUN npm install -g \
        bower \
        ember-cli

RUN mkdir /myapp
WORKDIR /myapp
