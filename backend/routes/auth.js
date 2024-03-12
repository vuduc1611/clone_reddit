const router = require("express").Router()
const authController = require("../controllers/authController")
const middlewareController = require("../controllers/middlewareController")

//register
router.post("/register", authController.registertUser)

//refresh token

// log in

// log out 

module.exports = router
