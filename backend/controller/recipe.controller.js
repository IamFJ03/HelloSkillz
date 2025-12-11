const UserAccess = require("../model/recipe.model");
const payment = require("../model/payment.model");
const updateAccess = async (req, res) => {
    console.log("User Id:", req.user.id);
    try {
        const paymentInfo = await payment.findOne({ User: req.user.id });
        const find = await UserAccess.findOne({ user: req.user.id });
        if (find && find.userAccess >= 3) {
            if (paymentInfo.captured)
                return res.json({ message: "User Access Granted", newLevel: find.userAccess });
            else
                return res.json({ message: "Access to free meal recipe reached its limit" });
        }

        const update = await UserAccess.findOneAndUpdate({ user: req.user.id }, {
            $inc: { userAccess: 1 }
        },
            { new: true, upsert: true });

        res.json({ message: "User Access Granted", newLevel: update })
    }

    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserAccess = async (req, res) => {

}

module.exports = { updateAccess, getUserAccess };