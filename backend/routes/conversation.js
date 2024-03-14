const router = require("express").Router();
const conversationController = require("../controllers/conversationController");
const middlewareController = require("../controllers/middlewareController");

// create conversation
router.post(
    "/",
    middlewareController.verifyToken,
    conversationController.createConversation
);

//GET A CONVERSATION FROM A USER
router.get(
    "/:userId",
    middlewareController.verifyToken,
    conversationController.getConversation
);

// GET AVAILABLE CONVERSATIONS BETWEEN USERS
router.get(
    "/find/:first/:second",
    middlewareController.verifyToken,
    conversationController.getAvailableConversation
);

module.exports = router;