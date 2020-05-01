const clientesRouter = require('./clientes/clients.route')
const apiVersion = '/api/v1'

const routes = function initServerRoutes(server) {
    server.use(`${apiVersion}/clientes`, clientesRouter)
}

module.exports = routes