const UserAccess = require("../model/recipe.model");

const updateAccess = async (req, res) => {
    console.log("User Id:", req.user.id);
    try {
        const update = await UserAccess.findOneAndUpdate({ user: req.user.id }, {
            $inc: { userAccess: 1 }
        },
            { new: true, upsert: true });

        res.json({ message: "User Access Updated", newLevel: update })
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserAccess = async (req, res) => {

}

module.exports = { updateAccess, getUserAccess };