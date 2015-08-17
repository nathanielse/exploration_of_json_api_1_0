# Exploration of JSON API 1.0

A simple project for exploring the specification
[JSON API 1.0](http://jsonapi.org) with an [Ember](http://emberjs.com/)
application and an API server built with
[Ruby on Rails](http://rubyonrails.org/) .

## Build a development environment

A development environment can be built with Linux containers using
[Docker](https://docs.docker.com/compose/) and
[Docker Compose](https://docs.docker.com/compose/). On the website of the Docker
project, installation guides are available for the Docker Engine and Docker
Compose.

The following commands build the development environment and install the
dependencies of the Ember application :

    $ docker-compose build
    $ docker-compose run emberapp npm install
    $ docker-compose run emberapp bower --allow-root install

## Launch application

Use the command :

    $ docker-compose up

## Use the development environment with the Ember application

Change permissions of files that are owned by the container user 'root' :

    $ docker-compose run emberapp chown -R $UID /.root /myapp

For the shell Bash, to ease the use of the command-line applications `ember`,
`npm` and `bower`, add the following aliases :

    $ alias ember="docker-compose run -u $UID --no-deps --service-ports emberapp ember"
    $ alias npm="docker-compose run -u $UID --no-deps emberapp npm"
    $ alias bower="docker-compose run -u $UID --no-deps emberapp bower"

## Use the development environment with the API server

For Bash, add aliases for `rails` and `rake` commands :

    $ alias rails="docker-compose run -u $UID --service-ports apiserver rails"
    $ alias rake="docker-compose run -u $UID apiserver rake"
