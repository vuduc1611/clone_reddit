const Post = require("../models/Post");
const User = require("../models/User");
const Commentt = require("../models/Comment");

const commentController = {
    // add a comment
    addComment: async (req, res) => {
        try {
            const user = await User.findById(req.body.ownerId);
            await Post.findByIdAndUpdate(
               { _id: req.params.id },
               {$inc: {comments: 1}}
            );
            const makedComment = {
                ...req.body,
                postId: req.params.id,
                username: user.username,
                avaUrl: user.avaUrl,
                theme: user.theme
            };
            const newComment = new Comment(makedComment);
            const savedComment = newComment.save();
            res.status(200).json(savedComment);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET ALL COMMENT
    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.find();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // GET COMMENTS IN A POST
    getCommentsInPost: async (req, res) => {
        try {
            const comments = await Comment.find({postId: req.params.id});
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // DELETE COMMENT
    deleteComment: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            await Comment.findByIdAndDelete(req.params.id);
            await Post.findOneAndUpdate(
                { _id: comment.postId },
                { $inc: {comments: -1 }}
            );
            res.status(200).json("Delete comment succesfully")
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = commentController;