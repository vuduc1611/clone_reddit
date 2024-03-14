const router = require("express").Router();
const Post = require("../models/Post");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const middlewareController = require("../controllers/middlewareController");
const upload = require("../utils/multer");

// create a post
router.post(
    "/",
    upload.single("image"),
    middlewareController.verifyToken,
    postController.createPost
);

// update a post
router.put(
    "/:id",
    middlewareController.verifyTokenAndUserAuthorization,
    postController.updatePost
);
// delete a post
router.put(
    "/:id",
    middlewareController.verifyTokenAndUserAuthorization,
    postController.deletePost
);

// get a post
router.get(
    "/fullpost/:id",
    middlewareController.verifyToken,
    postController.getAPost
);

// get all post from a user
router.get(
    "/user/:id",
    middlewareController.verifyToken,
    postController.getPostsFromOne
);

// get all post
router.get(
    "/",
    middlewareController.verifyToken,
    middlewareController.paginatedResult(Post),
    postController.getAllPosts
);

// get timeline post
router.post(
    "/timeline",
    middlewareController.verifyToken,
    postController.getFriendsPost
);
// upvote a post
router.put(
    "/:id/upvote",
    middlewareController.verifyToken,
    postController.upvotePost
);
// downvote a post
router.put(
    "/:id/downvote",
    middlewareController.verifyToken,
    postController.downvotePost
);
// add favoritePost
router.put(
    "/:id/favorite",
    middlewareController.verifyToken,
    postController.addFavoritePost
);
// get favorite posts
router.get(
    "/favorites",
    middlewareController.verifyToken,
    postController.getFavoritePosts
);

// add comment
router.post(
    "/comment/:id",
    middlewareController.verifyToken,
    commentController.addComment
);
// get all comments
router.get(
    "/comments",
    middlewareController.verifyToken,
    commentController.getAllComments
);
// get all comments in a post
router.get(
    "/comments/:id",
    middlewareController.verifyToken,
    commentController.getCommentsInPost
);
// delte a comment
router.delete(
    "/comments/:id",
    middlewareController.verifyTokenAndCommentAuthorization,
    commentController.deleteComment
);
module.exports = router;