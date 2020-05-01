const mongoose = require('mongoose')

module.exports = async () => {
    mongoose.connect(process.env.URL_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

    const database = mongoose.connection

    database.on('error', (error) => console.log(error))

    await database.once('open', () => {
        console.log('Database connected')
    })
}
