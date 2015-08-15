FROM debian:jessie

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -qq && \
    apt-get -y install \
            libpq-dev \
            build-essential \
            postgresql-client \
            ruby \
            ruby-dev

ADD Gemfile /myapp/Gemfile
WORKDIR /myapp
RUN gem install bundler && bundle install
