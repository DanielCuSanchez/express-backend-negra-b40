const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/v1')
const passport = require('passport')
const authentication = require('./libs/authentication')
require('dotenv').config()
const initDatabase = require('./services/database')

const PORT = process.env.PORT || 4000


const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('short'))
passport.use(authentication)
console.log(typeof(authentication))
app.use(passport.initialize())
initDatabase()
routes(app)

module.exports = { app, PORT }