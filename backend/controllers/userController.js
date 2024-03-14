const User = require("../models/User");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const authController = require("./authController");

const userController = {
    searchAllUser: async (req, res) => {
        try{
            const username = req.query.username
            const users = await User.find({username: {$regex: username}})
                .limit(2)
                .select("username profilePicture theme")
                .exec();
            return res.status(200).json(users);
        } catch(err) {
            return res.status(500).json(err);
        }
    },
    getUser: async (req, res) => {
        try {
            const user = User.findById(req.params.id);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(
                    req.params.id.trim(),
                    { $set: req.body },
                    { returnDocument: "after"} 
                ).select("+password");
            const accessToken = await authController.generateAccessToken(user);
            if(req.body.profilePicture || req.body.theme) {
                try {
                    await Post.updateMany({userId: req.params.id},
                        { $set: {avaUrl: req.body.profilePicture,theme: req.body.theme}}
                    );
                    await Comment.updateMany(
                        {ownerId: req.params.id},
                        {$set: {avaUrl: req.body.profilePicture,theme: req.body.theme}}
                    );
                } catch (error) {
                    res.status(500).json(error);
                }
            }
            const returnedUser = {
                ...user._doc,
                accessToken: accessToken
            };
            res.status(200).json(returnedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        if(req.body.userId === req.params.id) {
            try{
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User deleted");
            }catch(err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You can only delete your account");
        }
    },
    getLeaderboard: async (req, res) => {
        try{
            const users = await User.find().sort({karmas: -1}).limit(10);
            res.status(200).json(users);
        }catch(err) {
            return res.status(500).json(err);
        }
    },
    followUser: async (req, res) => {
        if(req.body.userId === req.params.id) {
            return res.status(403).json("You can't follow yourself");
        }
        try {
            const user = await User.findById(req.params.id);
            // if user not follow yet
            if(!user.followers.includes(req.body.userId)) {
                await User.findByIdAndUpdate(req.params.id, {
                    $push: { followers: req.body.userId },
                });
                const updatedUser = await User.findByIdAndUpdate(
                    req.body.userId,
                    {
                        $push: {followings: req.params.id}
                    },
                    { returnDocument: "after"}
                );
                return res.status(200).json(updatedUser);
            } else {
                await User.findByIdAndUpdate(req.params.id, {
                    $pull: { followers: req.body.userId },
                });
                const updatedUser = await User.findByIdAndUpdate(
                    req.body.userId,
                    {
                        $pull: {followings: req.params.id}
                    },
                    { returnDocument: "after"}
                );
                return res.status(200).json(updatedUser);
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = userController;