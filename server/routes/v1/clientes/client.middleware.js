const transformBodyLowerCase = (req, res, next) => {
    req.body.name && (req.body.name = req.body.name.toLowerCase())
    req.body.last_name && (req.body.last_name = req.body.last_name.toLowerCase())
    req.body.email && (req.body.email = req.body.email.toLowerCase())
    req.body.password && (req.body.password = req.body.password.toLowerCase())
    next()
}

module.exports = {
    transformBodyLowerCase
}