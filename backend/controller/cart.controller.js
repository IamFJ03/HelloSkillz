const Recipe = require("../model/cart.model");

const addToCart = async (req, res) => {
const {title, label, image, ingredients} = req.body;
console.log(title, label, image, ingredients, req.user);
}

const deleteFromCart = async () => {

}

module.exports = {addToCart, deleteFromCart};