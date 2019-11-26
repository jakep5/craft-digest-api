const testHelperObject = {
    makeBeersArray() {
        return [
            {
                id: 1,
                name: "Spotted Cow",
                brewery_name: "New Glarus Brewing Company",
                brewery_location: "New Glarus, WI",
                tasting_notes: "Wheat, apple, malt",
                abv: 5,
                rating: 4.5,
                user_id: 1
            },
            {
                id: 2,
                name: "Miller Lite",
                brewery_name: "Miller Brewery",
                brewery_location: "Milwaukee, WI",
                tasting_notes: "Corn, malt",
                abv: 4.2,
                rating: 3.5,
                user_id: 1

            },
            {
                id: 3,
                name: "Spaten Optimator",
                brewery_name: "Spaten Brewery",
                brewery_location: "Munich, Germany",
                tasting_notes: "Chocolate, coffee, heavy malt",
                abv: 7,
                rating: 4,
                user_id: 1
            },
            {
                id: 4,
                name: "New Belgium Voodoo Ranger IPA",
                brewery_name: "New Belgium Brewery",
                brewery_location: "Fort Collins, CO",
                tasting_notes: "Bitter, citrus, hops",
                abv: 6,
                rating: 4.75,
                user_id: 1
            },
            {
                id: 5,
                name: "New Belgium Fat Tire",
                brewery_name: "New Belgium Brewery",
                brewery_location: "Fort Collins, CO",
                tasting_notes: "Wheat, malt, roses",
                abv: 5,
                rating: 3.25,
                user_id: 1
            },
            {
                id: 6,
                name: "Bell's Two Hearted Ale",
                brewery_name: "Bell's Brewery",
                brewery_location: "Kalamazoo, MI",
                tasting_notes: "Malt, bitter, heavy taste",
                abv: 7,
                rating: 3,
                user_id: 2
            }
        ]
    },

    makeUsersArray() {
        return [
            {
                id: 1,
                user_name: "testuser",
                password: 'password',
                date_created: new Date('2029-01-22T16:28:32.615Z')
            },
            {
                id: 2, 
                user_name: "secondtestuser",
                password: 'password',
                date_created: new Date('2029-01-22T16:28:32.615Z')
            }
        ]
    },

    cleanTables(db) {
        return db.transaction(trx =>
            trx.raw(
                `TRUNCATE
                craft-digest_beers,
                craft-digest_users
                `
            )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE craft-digest_beers_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE craft-digest_users_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('craft-digest_beers_id_seq', 0)`),
                    trx.raw(`SELECT setval('craft-digest_users_id_seq', 0)`),
                ]))    
        )

    }


}

module.exports = testHelperObject