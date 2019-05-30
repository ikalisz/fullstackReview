const bcrypt = require('bcryptjs')
//require bcrypt to create auth
module.exports = {
    checkUser: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get(db)
        if (username && password) {
            const result = await db.get_user_login(username)
            const userFound = result[0]
            if (!userFound) {
                res.status(404).send('User not found')
            }
            if (bcrypt.compareSync(password, userFound.password)) {
                req.session.user = {
                    username: username,
                }
            }
        } else {
            res.status(400).send(`Both username and password and required.`)
        }
    },
    register: async (req, res) => {
        const {firstname, lastname, email, username, password} = req.body
        const db = req.app.get(db)
        const userFound = await db.check_user_email({email})
        if (userFound[0]) return res.status(409).send('Email already in use.')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const createdUser = await db.register_user({firstname, lastname, email, username, password: hash})
    }
}