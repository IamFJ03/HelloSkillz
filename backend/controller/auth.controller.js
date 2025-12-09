const User = require("../model/auth.model");
const jwt = require("jsonwebtoken");

const jwtkey = 'iamFJ03';

const SignUp = async (req, res) => {
const {username, email, password} = req.body;
console.log(username, email, password);
const fetch = await User.findOne({username});
try{
if(fetch)
    res.json({message:"User Already Exists"});
else{
    const newUser = await User.create({username, email, password});
    res.json({message:"User Created Succesfully", user: newUser});
}
}
catch(e){
    res.status(500).json({message:"Internal Server Error"});
}
}

function Authenticate(req, res, next){

    const token = req.cookies.token
    if(!token)
        return res.status(401).json({message: "Token is missing from Authorization header" });

    jwt.verify(token, jwtkey, (err, user) => {
        if(err)
            return res.status(505).json({ error: "Not Found" });

        req.user = user;
        req.token = token;
        next();
    })
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const fetchUser = await User.findOne({ email });
        if (!fetchUser)
            return res.json({ message: "User Not Found" });

        if (fetchUser.password !== password)
            return res.json({ message: "Incorrect Password" });

        const user = {
            id: fetchUser._id,
            username: fetchUser.username,
            email: fetchUser.email
        };

        const token = jwt.sign(user, jwtkey, { expiresIn: "1h" });
        
        res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 60 * 60 * 1000
});

        res.json({
            success: true,
            message: "Authentication Succesfull",
            USER: user
        });

    } catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const me = async (req, res) => {
    try{
    const fetch = await User.findOne({_id: req.user.id});
    res.json({message:"User Info", user:fetch});
    }
    catch(e){
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports = {SignUp, Login, Authenticate, me};