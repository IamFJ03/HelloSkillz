const Recipe = require("../model/cart.model");

const addToCart = async (req, res) => {
    const { title, label, image, ingredients } = req.body;
    console.log(title, label, image, ingredients, req.user);
    try {
        const checkRedundancy = await Recipe.findOne({ user: req.user.id, label });
        if (checkRedundancy)
            return res.json({ message: "Meal already present" });
        else {
            const recipeAdd = new Recipe({ title, label, image, ingredients, user: req.user.id });
            await recipeAdd.save();
            res.json({ message: "Meal Added", newRecipe: recipeAdd });
        }
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const fetchCart = async (req, res) => {
    console.log("Logged In User Id:", req.user.id);
    try {
        const fetchedCart = await Recipe.find({ user: req.user.id });
        if (fetchCart) {
            res.json({ message: "meals found", cartInfo: fetchedCart });
        }
        else {
            res.json({ message: "Something went wrong" });
        }
    }
    catch (e) {
        res.status.json({ message: "Internal Server Error" });
    }
}

const deleteFromCart = async () => {

}

module.exports = { addToCart, fetchCart, deleteFromCart };