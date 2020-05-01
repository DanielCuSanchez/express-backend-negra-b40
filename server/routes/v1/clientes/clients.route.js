const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { response } = require('../../../utils/response')
const { clientValidator, loginValidator } = require('./clients.validator')
const { transformBodyLowerCase } = require('./client.middleware')
const { getClients, consultEmailClient, createClient, updateClient, deleteClient } = require('./clients.controller')
const router = express.Router()

const authUser = passport.authenticate('jwt', { session: false })

router.get('/', authUser, async (req, res) => {

    const clients = await getClients()

    clientValidator
        ?
        response.success(req, res, 200, clients)
        :
        response.error(req, res, 400, 'error')
})

router.get('/:id', async (req, res) => {
    try {
        const client = await getClients(req.params.id)
        if (!client) {
            response.success(req, res, 404, 'error')
            return
        }
        response.success(req, res, 200, client)

    } catch (error) {
        console.log(error)
    }

})

router.post('/', [clientValidator, transformBodyLowerCase], async (req, res) => {
    const { email } = req.body
    //Check avaliability of email for the account
    const userExists = await consultEmailClient(email)
    if (userExists.length != 0) {
        response.error(req, res, 400, 'email already exists')
        return
    }
    let newClient = req.body
    const hashedPassword = await bcrypt.hash(newClient.password, 10)
    newClient = {
        ...newClient,
        password: hashedPassword
    }
    const clientCreated = await createClient(newClient)
    clientCreated
        ? response.success(req, res, 201, clientCreated)
        : response.error(req, res, 400, 'bad request')

})

router.post('/login', [loginValidator, transformBodyLowerCase], async (req, res) => {
    const userRegistered = await consultEmailClient(req.body.email)
    if (userRegistered.length === 0) {
        response.error(req, res, 400, 'user does not exist')
        return
    }
    const passwordCorrect = await bcrypt.compare(req.body.password, userRegistered.password)
    if (passwordCorrect) {
        console.log(userRegistered._id)
        const token = await jwt.sign({ _id: userRegistered._id }, 'secret', { expiresIn: '24h' })
        response.success(req, res, 200, token)
    }
    else {
        response.error(req, res, 400, 'incorrect password')
        return
    }
})

router.put('/:id', clientValidator, async (req, res) => {
    const { id } = req.params
    try {
        const clientUpdated = await updateClient(req.body, id)
        if (!clientUpdated) {
            response.error(req, res, 404, 'error')
        } else {
            response.success(req, res, 200, clientUpdated)
        }
    } catch (error) {
        console.log(error)
    }
})
router.delete('/', async (req, res) => {
    try {
        const deleted = await deleteClient()
        deleted
            ? response.success(req, res, 200, 'all deleted')
            : response.error(req, res, 500, 'error')
    } catch (error) {
        console.log(error)
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleted = await deleteClient(id)
        deleted
            ? response.success(req, res, 200, 'deleted')
            : response.error(req, res, 400, 'error')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router