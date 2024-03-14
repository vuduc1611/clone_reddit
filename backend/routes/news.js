const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");
const newsController = require("../controllers/newsController");

// Get news from api news
router.get("/", middlewareController.verifyToken, newsController.getHotNews)

module.exports = router;