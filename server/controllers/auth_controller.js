const bcrypt = require('bcryptjs')
//require bcrypt to create auth
module.exports = {
    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        if (username && password) {
            const result = await db.get_user_login(username)
            const userFound = result[0]
            if (!userFound) return res.status(404).send('User not found')
            if (bcrypt.compareSync(password, userFound.password)) {
                const balance = await db.get_balance({id: userFound.login_id})
                req.session.user = {
                    id: userFound.login_id,
                    username: userFound.username,
                    balance: balance[0].balance
                }
                res.status(200).send(req.session.user)
            } else {
                res.status(401).send('Incorrect username or password')
            }
        } else {
            res.status(400).send(`Both username and password and required.`)
        }
    },
    register: async (req, res) => {
        const {firstname, lastname, email, username, password} = req.body
        const db = req.app.get('db')
        const {session} = req
        const userFound = await db.check_user_email({email})
        if (userFound[0]) return res.status(409).send('Email already in use.')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const createdUser = await db.register_user({firstname, lastname, email, username, password: hash})
        session.user = {
            id: createdUser[0].login_id,
            username: createdUser[0].username,
            balance: createdUser[0].balance
        }
        res.status(201).send(session.user)
    },
    logout: (req, res) => {
        const {session} = req
        session.destroy()
        res.status(200).send('Logged out')
    },
    getDetails: async (req, res) => {
        const {session} = req
        const db = req.app.get('db')
        if (session.user) {
            const result = await db.get_user_details({id: session.user.id})
            const {firstname, email, balance, user_id} = result[0]
            return res.status(200).send({firstname, email, balance, user_id, username: session.user.username})
        }
        return res.status(401).send('Please Log In')
    }
}