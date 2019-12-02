const xss = require('xss')

const BeersService = {
    getAllBeers(db) {
        return db
            .from('craft-digest_beers AS beer')
            .select(
                'beer.id',
                'beer.name',
                'beer.brewery_name',
                'beer.brewery_location',
                'beer.tasting_notes',
                'beer.abv',
                'beer.rating'
            )
    },

    getUserBeers(db, userId) {
        return BeersService.getAllBeers(db)
        .where('user_id', userId)
    },

    deleteBeer(db, id) {
        return db
            .from('craft-digest_beers')
            .where({id})
            .delete()
    },

    serializeBeer(beer) {
        return {
            id: beer.id,
            name: xss(beer.name),
            brewery_name: xss(beer.brewery_name),
            brewery_location: xss(beer.brewery_location),
            tasting_notes: xss(beer.tasting_notes),
            abv: parseFloat(beer.abv),
            rating: parseFloat(beer.rating)
        }
    },

    insertBeerIntoDb(knex, newlyAddedBeer) {
        return knex
            .insert(newlyAddedBeer)
            .into('craft-digest_beers')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = BeersService