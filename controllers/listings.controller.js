const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in')
const Listing = require('../models/listing')

// POST FORM DATA TO DATABASE
router.post('/', isSignedIn, async (req, res) => {
  try {
    req.body.seller = req.session.user._id
    await Listing.create(req.body)
    res.redirect('/listings')
  } catch (error) {
    console.log(error)
    res.send('Something went wrong')
  }
})
// NEW LISTING FORM
router.get('/new', isSignedIn, (req, res) => {
  res.render('listings/new.ejs')
})


module.exports = router