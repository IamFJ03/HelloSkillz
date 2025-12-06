const Recipe = require("../model/cart.model");

const addToCart = async (req, res) => {
const {title, label, image, ingredients} = req.body;
console.log(title, label, image, ingredients, req.user);
try{
const recipeAdd = new Recipe({title, label, image, ingredients, user: req.user.id});
await recipeAdd.save();

res.json({message:"Meal Added", newRecipe:recipeAdd });
}
catch(e){
    res.status(500).json({message:"Internal Server Error"});
}
}

const deleteFromCart = async () => {

}

module.exports = {addToCart, deleteFromCart};