const User = require("../models/User");
const Post = require("../models/Post");
const {cloudinary} = require("../utils/cloudinary")

const postController = {
    // CREATE A POST
    createPost: async (req, res) => {
        try {
            const user = await User.findById(req.body.userId);
            if(req.body.imageurl) {
                const result = await cloudinary.uploader.upload(req.body.imageUrl, {
                    upload_preset: "post_image",
                });
                const makePost = {
                    ...req.body,
                    imageUrl: result.secure_url,
                    cloudinaryId: result.public_id,
                    username: user.username,
                    avaUrl: user.profilePicture,
                    theme: user.theme,
                };
                const newPost = new Post(makePost);
                const savedPost = await newPost.save();
                return res.status(200).json(savedPost);
            } else {
                const makePost = {
                    ...req.body,
                    username: user.username,
                    avaUrl: user.profilePicture,
                    theme: user.theme,
                };
                const newPost = new Post(makePost);
                const savedPost = await newPost.save();
                return res.status(200).json(savedPost);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // UPDATE POST
    updatePost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id.trim());
            if(post.userId === req.body.userId) {
                await post.updateOne({$set: req.body});
                res.status(200).json("Post has been updated");
            } else {
                res.status(403).json("You can only update your ppost");
            }
        }catch(err) {
            res.status(500).json(err);
        }
    },
    // DELETE POST
    deletePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            await Post.findByIdAndDelete(req.params.id);
            if(post.cloudinaryId) {
                await cloudinary.uploader.destroy(post.cloudinaryId);
            }
            res.status(200).json("Delete post successfully")
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET A POST
    getAPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET POST FROM 1 USER
    getPostsFromOne: async (req, res) => {
        try {
            const posts = await Post.find({userId: req.params.id});
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET ALL POST
    getAllPosts: async (req, res) => {
        try {
            res.status(200).json(res.paginatedResults);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    // GET ALL POST FROM USERS FOLLOWING
    getFriendsPost: async (req, res) => {
        try {
            const currentUser = await User.findById(req.body.userId);
            const userPost = await Post.find({userId: req.body.userId});
            const friendPost = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({userId: friendId});
                })
            );
            res.status(200).json(userPost.concat(...friendPost));
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // UPVOTE A POST
    upvotePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id.trim());
            if(
                !post.upvotes.includes(req.body.userId) &&
                post.downvotes.includes(req.body.userId)
            ) {
                await post.updateOne({$push: {upvotes: req.body.userId}});
                await post.updateOne({$pull: {downvotes:  req.body.userId}});
                await User.findOneAndUpdate(
                    {_id: post.userId},
                    {$inc: { karmas: 10 }}
                );
                return res.status(200).json("Post is upvoted");
            } else if(
                !post.upvotes.includes(req.body.userId) &&
                !post.downvotes.includes(req.body.userId)
            ){
                await post.updateOne({$push: {upvotes: req.body.userId}});
                await User.findOneAndUpdate(
                    {_id: post.userId},
                    {$inc: { karmas: 10 }}
                );
                return res.status(200).json("Post is upvoted");
            } else if( post.upvotes.includes(req.body.userId)) {
                await post.updateOne({$pull : {upvotes: req.body.userId}});
                await User.findOneAndUpdate(
                    {_id: post.userId},
                    {$inc: {karmas: -10}}
                );
                return res.status(200).json("This post has been unvoted");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // DOWNVOTE A POST
    downvotePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id.trim());
            if(
                !post.downvotes.includes(req.body.userId) &&
                post.upvotes.includes(req.body.userId)
            ) {
                await post.updateOne({$push: {downvotes: req.body.userId}});
                await post.updateOne({$pull: {upvotes:  req.body.userId}});
                await User.findOneAndUpdate(
                    {_id: post.userId},
                    {$inc: { karmas: -10 }}
                );
                return res.status(200).json("Post is downvoted");
            } else if(
                !post.upvotes.includes(req.body.userId) &&
                !post.downvotes.includes(req.body.userId)
            ){
                await post.updateOne({$push: {downvotes: req.body.userId}});
                await User.findOneAndUpdate(
                    {_id: post.userId},
                    {$inc: { karmas: -10 }}
                );
                return res.status(200).json("Post is downvoted");
            } else if( post.upvotes.includes(req.body.userId)) {
                await post.updateOne({$pull : {upvotes: req.body.userId}});
                await User.findOneAndUpdate(
                    {_id: post.userId},
                    {$inc: {karmas: 10}}
                );
                return res.status(200).json("This post has been undownvoted");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // ADD POST TO FAVORITE
    addFavoritePost: async (req, res) => {
        try {
            const user = await User.findById(req.body.userId);
            // if post is not in favorite yet
            if(!user.favorites.includes(req.params.id)) {
                await User.findByIdAndUpdate(
                    {_id: req.body.userId},
                    {
                        $push: { favorites: req.params.id },
                    },
                    { returnDocument: "after" }
                );
                return res.status(200).json('added to favorites');
            } else {
                await User.findByIdAndRemove(
                    {_id: req.body.userId},
                    {
                        $pull: {favorites: req.params.id },
                    }
                );
                return res.status(200).json('removed from favorites');

            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET LIST POST IN FAVORITE
    getFavoritePosts: async (req, res) => {
        try {
            const currentUser = await User.findById(req.body.userId);
            const favoritePost = await Promise.all(
                currentUser.favorites.map((id) => {
                    return Post.findByIdid;
                })
            )
            res.status(200).json(favoritePost);
        } catch (error) {
            res.status(200).json(error);
        }
    }

}

module.exports = postController;