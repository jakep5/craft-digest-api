const express = require('express')
const BeersService = require('./beers-service')
/* const { requireAuth } = require('../middleware/jwt-auth')
 */
const beersRouter = express.Router()

beersRouter
    .route('/:user_id')
/*     .all(requireAuth)
 */    .get((req, res, next) => {
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