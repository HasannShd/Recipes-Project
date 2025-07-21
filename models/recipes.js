const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    content: String,
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const recipesSchema = new mongoose.Schema({
    title: String,
    description: String,
    ingredients: String,
    instructions: String,
    image: {
        url: { type: String, required: true },
        cloudinary_id: { type: String, required: true}
    },
    seller: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

module.exports = mongoose.model('recipes', recipesSchema)