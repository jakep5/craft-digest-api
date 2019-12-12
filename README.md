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

## POST - Beers

### Base URL + '/beers/'

Posts a beer to the database with given form inputs, adding on the user ID of the user that is currently logged in.

Example POST request format:

{
  "name": "New Glarus Spotted Cow",
  "brewery_name": "New Glarus Brewing Company",
  "brewery_location": "New Glarus, Wisconsin",
  "tasting_notes": "Orange, wheat, sweet",
  "abv": "5.25",
  "rating": "4.5",
  "user_id": "1"
}

## POST - User creation

### Base URL + '/users/

Posts a user to the database with a given username and password. Assigns the user a 'user_id' based on position in the database. Also adds date created value for future reference.

Example POST user format:

{
  "user_name": "testuser",
  "password": "Password123!",
  "date_created": "now()" <-- utilizes javascript's now() method to generate the current time
}
  
## POST - User login

### Base URL + '/auth/login'

Validates sign in input with values in the database. Compares input password values with the hashed values in the database. If username and password match a value in the database, JWT is created for the user and returned, subsequently stored in browser storage.

Example POST user format for login authentication:

{
  "user_name": "testuser",
  "password": "Password123!"
}

