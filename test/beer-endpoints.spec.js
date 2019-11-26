const knex = require('knex')
const app = require('../src/app')
const {testHelperObject} = require('./testHelperObject')

describe('Beers endpoints', function() {
    let db

    const makeBeersArray = testHelperObject.makeBeersArray()
    const makeUsersArary = testHelpersObject.makeUsersArary()

    function makeAuthenticationHeader(user) {
        const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
        return `Basic ${token}`
    }

    before('make knex instance for test database', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup tables', () => testHelperObject.cleanTables(db))

    afterEach('cleanup tables', () => testHelperObject.cleanTables(db))
})