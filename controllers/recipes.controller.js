const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in')
const recipes = require('../models/recipes')

// POST FORM DATA TO DATABASE
router.post('/', isSignedIn, async (req, res) => {
  try {
    req.body.seller = req.session.user._id
    console.log(req.body)
    await recipes.create(req.body)
    res.redirect('/recipes')
  } catch (error) {
    console.log(error)
    res.send('Something went wrong')
  }
})

// NEW recipes FORM
router.get('/new', isSignedIn, (req, res) => {
  res.render('recipes/new.ejs')
})

// VIEW THE INDEX PAGE
router.get('/', async (req, res) => {
    const foundrecipe = await recipes.find()
    res.render('recipes/index.ejs', { foundrecipe })
})

// VIEW A SINGLE recipes (SHOW PAGE)
router.get('/:recipesId', async (req, res) => {
    try {
        const foundrecipe = await recipes.findById(req.params.recipesId).populate('seller').populate('comments.author')
        res.render('recipes/show.ejs', { foundrecipe })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// DELETE recipes FROM DATABASE
router.delete('/:recipesId', isSignedIn, async (req, res) => {
    const foundrecipe = await recipes.findById(req.params.recipesId).populate('seller')
    if (foundrecipe.seller._id.equals(req.session.user._id)) {
        await foundrecipe.deleteOne()
        return res.redirect('/recipes')
    }
    return res.send('Not authorized')
})

// RENDER THE EDIT FORM VIEW
router.get('/:recipesId/edit', isSignedIn, async (req, res) => {
    const foundrecipe = await recipes.findById(req.params.recipesId).populate('seller')
    if (foundrecipe.seller._id.equals(req.session.user._id)) {
        return res.render('recipes/edit.ejs', { foundrecipe })
    } 
    return res.send('Not authorized')
})

// UPDATE recipes
router.put('/:recipesId', isSignedIn, async (req, res) => {
    const foundrecipe = await recipes.findById(req.params.recipesId).populate('seller')
    if (foundrecipe.seller._id.equals(req.session.user._id)) {
        await recipes.findByIdAndUpdate(req.params.recipesId, req.body, { new: true })
        return res.redirect(`/recipes/${req.params.recipesId}`)
    } 
    return res.send('Not authorized')
})

// POST COMMENT FORM TO THE DATABASE
router.post('/:recipesId/comments', isSignedIn, async (req, res) => {
    const foundrecipe = await recipes.findById(req.params.recipesId)
    req.body.author = req.session.user._id
    foundrecipe.comments.push(req.body)
    await foundrecipe.save()
    res.redirect(`/recipes/${req.params.recipesId}`)
})

module.exports = router