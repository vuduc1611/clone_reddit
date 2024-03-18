const router = require("express").Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

//SEARCH FOR USERS
router.get(
    "/",
    middlewareController.verifyToken,
    userController.searchAllUser
);
//GET A USER
router.get(
    "/:id",
    middlewareController.verifyToken,
    userController.getUser
);
//UPDATE USER
router.put(
    "/:id",
    middlewareController.verifyTokenAndUserAuthorization,
    userController.updateUser
);
//DELETE USER
router.delete(
    "/:id",
    middlewareController.verifyTokenAndUserAuthorization,
    userController.deleteUser
);
//GET LEADER BOARD USERS
router.get(
    "/:id/leaderboard",
    middlewareController.verifyToken,
    userController.getLeaderboard
);
//FOLLOW A USER
router.put(
    "/:id/follow",
    middlewareController.verifyToken,
    userController.followUser
);


module.exports = router;
