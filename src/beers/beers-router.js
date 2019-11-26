const express = require('express')
const BeersService = require('./beers-service')
const { requireAuthentication } = require('../middleware/jwtAuthentication')
const beersRouter = express.Router()

beersRouter
    .route('/:user_id')
    .all(requireAuthentication)
    .get((req, res, next) => {
        BeersService.getUserBeers(
            req.app.get('db'),
            req.params.user_id
        )
        .then(beers => {
            console.log(beers)
            res.json(beers.map(BeersService.serializeBeer))
        })
        .catch(next)
})

module.exports = beersRouter