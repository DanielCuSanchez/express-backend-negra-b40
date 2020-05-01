const { app, PORT } = require('./server')

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
