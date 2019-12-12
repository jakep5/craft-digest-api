const express = require('express')
const BeersService = require('./beers-service')
const { requireAuthentication } = require('../middleware/jwtAuthentication')
const path = require('path')

const beersRouter = express.Router()

const jsonBodyParser = express.json()

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
            /* res.json(beers.map(BeersService.serializeBeer)) */
        })
        .catch(next)
})

beersRouter
    .route('/')
    .all(requireAuthentication)
    .post(requireAuthentication, jsonBodyParser, (req, res, next) => {
        const { name, brewery_name, brewery_location, tasting_notes, abv, rating, user_id } = req.body
        const newlyAddedBeer = { name, brewery_name, brewery_location, tasting_notes, abv, rating, user_id }

        for (const [key, value] of Object.entries(newlyAddedBeer)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body, please include it` }
                })
            }
        }

        BeersService.insertBeerIntoDb(
            req.app.get('db'),
            newlyAddedBeer
        )
            .then(beer => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${beer.id}`))
                    .json(BeersService.serializeBeer(beer))
            })
            .catch(next)
    })

beersRouter
    .route('/:beerId')
    .all(requireAuthentication)
    .delete((req, res, next) => {
        BeersService.deleteBeer(
            req.app.get('db'),
            req.params.beerId
        )
            .then(res.status(204))
            return null;
    })

module.exports = beersRouter