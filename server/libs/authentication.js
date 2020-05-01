const JwtStrategy = require('passport-jwt')
const { getClients } = require('../routes/v1/clientes/clients.controller')


const jwtOptions = {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

module.exports = new JwtStrategy.Strategy(jwtOptions, async function (jwtPayload, next) {
    try {
        const user = await getClients(jwtPayload._id)
        if (user) {
            authUser = {
                email: user.email,
                id: user._id
            }
            console.log(authUser)
            next(null, authUser)
        } else {
            next(null, false)
        }
    } catch (error) {
        console.log(error)
    }
})

