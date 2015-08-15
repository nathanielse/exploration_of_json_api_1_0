# Exploration of JSON API 1.0

A simple project for exploring the specification
[JSON API 1.0](http://jsonapi.org) with an Ember application and an API server
built with Ruby on Rails .

## Build a development environment

A development environment can be built in Linux containers using
[Docker](https://docs.docker.com/compose/) and
[Docker Compose](https://docs.docker.com/compose/). On the website of the Docker
project, installation guides are available for the Docker Engine and Docker
Compose.

The following command build the development environment and install the
dependencies of the Ember application :

    $ docker-compose build
    $ docker-compose run emberapp npm install
    $ docker-compose run emberapp bower install
