const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require("./routes/user-routes")
const port = process.env.PORT
const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, Authorization,")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST, PATCH, DELETE")
    next()
})

app.use('/api/users', userRoutes)

app.use((req, res, next) => {
    const error = new HttpError("NO ROUTES LIKE THIS EXISTS!", 404)
    throw error
})
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || "Unknown error occured" })
})


app.listen(port, () => {
    console.log("we in port:", port)
})