const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    // register
    registertUser: async(req, res) => {
        console.log(req.body)
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
    generateAccessToken: () => {
            
    },
    generateRefreshToken: () => {

    },
    requestRefreshToken: () => {

    },
    // log in
    loginUser: async() => {
        
    },
    // log out 
    logoutUser: async() => {
        
    }
}
module.exports = authController;