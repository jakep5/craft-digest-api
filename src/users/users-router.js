const express = require('express')
const UsersService = require('./users-service')
const path = require('path')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { password, user_name } = req.body

        for (const field of ['user_name', 'password'])
            if(!req.body[field])
                return res.status(400).json({
                    error: `Request body does not include ${field}`
                })
            
    })

module.exports = usersRouter