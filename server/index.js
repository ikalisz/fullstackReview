require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const auth_ctrl = require('./controllers/auth_controller')
const balance_ctrl = require('./controllers/balance_controller')
app.use(express.json())
massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    console.log('DB connected')
})
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.listen(SERVER_PORT, () => {
    console.log(`Server working on port ${SERVER_PORT}`)
})
app.post('/auth/register', auth_ctrl.register)
app.post('/auth/login', auth_ctrl.login)
app.get('/auth/details', auth_ctrl.getDetails)
app.post('/balance/deposit', balance_ctrl.deposit)
app.post('/balance/withdrawl', balance_ctrl.withdrawl)