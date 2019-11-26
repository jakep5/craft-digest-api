const knex = require('knex')
const app = require('../src/app')
const testHelperObject = require('./testHelperObject')

describe('Beers endpoints', function() {
    let db

    const testBeers = testHelperObject.makeBeersArray()
    const testUsers = testHelperObject.makeUsersArray()

    function makeAuthenticationHeader(user) {
        const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
        return `Basic ${token}`
    }

    before('make knex instance for test database', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup tables', () => testHelperObject.cleanTables(db))

    afterEach('cleanup tables', () => testHelperObject.cleanTables(db))

    describe(`Protected endpoints`, () => {
        beforeEach('insert beers', () => 
            testHelperObject.seedTestBeers(
                db, 
                testUsers,
                testBeers
            )
        )

        const protectedEndpoints = [
            {
                name: 'GET /beers/:user_id',
                path: '/beers/1'
            }
        ]

        protectedEndpoints.forEach(endpoint => {
            describe.only(endpoint.name, () => {
                it(`responds with 401 when no bearer token/incorrect authorization`, () => {
                    return supertest(app)
                        .get(endpoint.path)
                        .expect(401, { error: `Unauthorized request` })
                })
            })

            it(`responds 401 when JWT secret supplied is invalid`, () => {
                const validUser = testUsers[0]
                const invalidSecret = 'incorrect-secret'
                return supertest(app)
                    .get(endpoint.path)
                    .set('Authorization', testHelperObject.makeAuthenticationHeader(validUser, invalidSecret))
                    .expect(401, { error: `Unauthorized request` })
            })
        })
    })
})