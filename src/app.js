require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const beersRouter = require('./beers/beers-router')
const { CLIENT_ORIGIN } = require('./config');
const helmet = require('helmet')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors());

app.use('/beers', beersRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.send('Hello, boilerplate!')
})

app.get('/api/*', (req, res) => {
    res.json({ok: true});
});

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error'} }
    } else {
        console.error(error)
        response = { message: error.message, object: error }
    }
    res.status(500).json(response)
})

module.exports = app