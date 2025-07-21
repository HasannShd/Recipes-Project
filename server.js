require('dotenv').config({ quiet: true })
const express = require('express')
const router = express.Router()
const app = express()
const methodOverride = require('method-override')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path')
const listingsController = require('./controllers/listings.controller')


app.use('/listings', listingsController)

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🙃.`)})

// NEW LISTING FORM
app.get('/', (req, res) => {
  res.send('Welcome to Recipe Tracker!');
});
// NEW LISTING FORM
router.get('/', (req, res) => {
  res.send('The /new route is working!')
})


const port = process.env.PORT ? process.env.PORT : "3000"
app.listen(port, () => {
    console.log(`The express app is ready on port ${3000}`)
})