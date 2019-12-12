# Craft Digest API

API implemented for use with Craft Digest application

## Authentication

Authentication done using JWT authentication. Users log in with their username and password, and their beers are associated with their user ID.

## Base URL

https://craftdigest.herokuapp.com/

## GET - Beers

### Base URL + '/beers/:user_id'

Returns all beers associated with the given user id number. 

Response is an array of beers in JSON format.

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
