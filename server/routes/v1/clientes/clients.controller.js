const Client = require('./clients.model')

const getClients = (_id) => {
    if (!_id) {
        return Client.find()
    } else {
        return Client.findById(_id)
    }
}

const consultEmailClient = (mail) => {
    return Client.findOne({ email: mail }).exec()
}

const createClient = (client) => {
    return Client.create(client)
}

const updateClient = (ClientActualizado, _id) => {
    return Client.findOneAndUpdate(_id, ClientActualizado, { new: true })
}

const deleteClient = (_id) => {
    if (!_id) {
        return Client.deleteMany()
    } else {
        return Client.findOneAndRemove(_id)
    }
}

module.exports = {
    getClients,
    consultEmailClient,
    createClient,
    updateClient,
    deleteClient
}