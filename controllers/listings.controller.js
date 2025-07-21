const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in')


// NEW LISTING FORM
router.get('/new', isSignedIn, (req, res) => {
  res.render('listings/new.ejs')
})


module.exports = router