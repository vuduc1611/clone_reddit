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
    userController.searchAllUser
);
//UPDATE USER
router.put(
    "/:id",
    middlewareController.verifyTokenAndUserAuthorization,
    userController.searchAllUser
);
//DELETE USER
router.delete(
    "/:id",
    middlewareController.verifyTokenAndUserAuthorization,
    userController.searchAllUser
);
//GET LEADER BOARD USERS
router.put(
    "/:id/leaderboard",
    middlewareController.verifyToken,
    userController.searchAllUser
);
//FOLLOW A USER
router.put(
    "/:id/follow",
    middlewareController.verifyToken,
    userController.searchAllUser
);


module.exports = router;
