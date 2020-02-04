const express = require('express')
const app = express()
const api = require('./routes/api')
const bodyParser = require('body-parser')
const path=require('path')

app.use(express.static(path.join(__dirname,'..','node_modules')))
app.use(express.static(path.join(__dirname,'..','dist')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use( '/', api )

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/weatherapp', { useNewUrlParser: true })







const port = 3000
app.listen(process.env.port || port, function () {
    console.log(`Running on port ${port}`)
})