const router = require("express").Router();
const messageController = require("../controllers/messageController");
const middlewareController = require("../controllers/middlewareController");

// Create a new message
router.post(
    "/",
    middlewareController.verifyToken,
    messageController.createMessage
);

// Get message
router.get(
    "/:conversationId",
    middlewareController.verifyToken,
    messageController.getMessage
);


module.exports = router;
