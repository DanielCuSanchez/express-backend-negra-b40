const Joi = require('@hapi/joi')
const { response } = require('../../../utils/response')
const schemaClientValidator = Joi.object({
    name: Joi.string().min(3).required(),
    last_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required()
})

const clientValidator = (req, res, next) => {
    const { error } = schemaClientValidator.validate(req.body, { abortEarly: false, convert: false })

    if (!error) {
        next()
    }
    else {
        const errors = error.details.map(error => {
            return error.message
        })
        console.log(error)
        response.error(req, res, 400, errors)
    }
}


const schemaLoginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required()
})

const loginValidator = (req, res, next) => {
    const { error } = schemaLoginValidator.validate(req.body, { abortEarly: false, convert: false })
    if (!error) {
        next()
    }
    else {
        response.error(req, res, 400, 'user or password incomplete')
    }
}


module.exports = { clientValidator, loginValidator }