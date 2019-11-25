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
        console.log(userId)
        return BeersService.getAllBeers(db)
        .where('user_id', userId)
    },

    serializeBeer(beer) {
        return {
            id: beer.id,
            name: xss(beer.name),
            brewery_name: xss(beer.brewery_name),
            brewery_location: xss(beer.brewery_location),
            tasting_notes: xss(beer.tasting_notes),
            abv: beer.abv,
            rating: beer.rating
        }
    }
}

module.exports = BeersService