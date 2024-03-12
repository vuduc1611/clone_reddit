const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    // register
    registertUser: async(req, res) => {
        if(req.body.password.length > 7) {
            try{
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);

                // Create new user
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashed,
                })

                // Save user to Mongoose DB
                const user = await newUser.save();
                res.status(200).json(user);
            }catch(err){
                res.status(500).json(err.massage)
            }

        } else {
            res.status(401).json({message: "Must be 7 character or more"})
        }
    },
    //token
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_KEY,
            { expiresIn: "365d" }
        )
    },
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        )
    },
    requestRefreshToken: (req, res) => {
        // take refresh token from client
        const refreshToken = req.cookies.refreshToken
        // if token is not valid, send err
        if(!refreshToken) return res.status(401).json({message: "You're not authenticated"})

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err) {
                console.log(err)
            }
            // console.log("check user", user)
            const  newAccessToken = authController.generateAccessToken(user)
            const  newRefreshToken = authController.generateRefreshToken(user)
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            })

        })
    },
    // log in
    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({username: req.body.username})
                .select("+password")
            if(!user){
                return res.status(404).json({message: "Incorrect username"})
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                return res.status(404).json({message:"Incorrect password"});
            } else if(user && validPassword) {
                //Generate access token
                const accessToken = authController.generateAccessToken(user)
                //Generate refresh token
                const refreshToken = authController.generateRefreshToken(user)
                // Store token in cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "none",
                })
                const returnedUser = {
                    ...user._doc,
                    accessToken: accessToken
                }
                res.status(200).json(returnedUser)
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // log out 
    logoutUser: async(req, res) => {
        //Clear cookies when user logs out
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
    }
}
module.exports = authController;