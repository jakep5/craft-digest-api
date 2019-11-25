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

        const passwordError = UsersService.validatePassword(password)

        if(passwordError) {
            return res.status(400).json({ error: passwordError })
        }

        UsersService.getUserWithUserName(
            req.app.get('db'),
            user_name
        )
            .then(getUserWithUserName => {
                if (getUserWithUserName)
                    return res.status(400).json({ error: `Username already taken` })

                return UsersService.generateHashPassword(password)
                    .then(hashedPassword => {
                        const newUser = {
                            user_name,
                            password: hashedPassword,
                            date_created: 'now()',
                        }

                        return UsersService.putUserInDb(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                res
                                    .status(201)
                                    .location(path.posix.join(req.originalUrl, `/${userl.id}`))
                                    .json(UsersService.serializeUser(user))
                            })
                    })
            })
            
    })

module.exports = usersRouter