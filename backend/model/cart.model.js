const mongoose = require("mongoose");
const User = require('./auth.model');

const ingredientSchema = new mongoose.Schema({
    food: { type: String, required: false },
    foodCategory: { type: String, required: false },
    image: { type: String, required: false },
    Weight: { type: String, required: false },
    text: { type: String, required: false }
});

const recipeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    label: {type: String, required: false},
    image: {type: String, required: false},
    title: { type: String, required: false },
    ingredients: [ingredientSchema]
});

const Recipe = new mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;