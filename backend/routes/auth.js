const router = require("express").Router()
const authController = require("../controllers/authController")
const middlewareController = require("../controllers/middlewareController")

//register
router.post("/register", authController.registertUser)

//refresh token
router.post("/refresh", authController.requestRefreshToken)

// log in
router.post("/login", authController.loginUser)

// log out 
router.post("/logout", authController.logoutUser)
module.exports = router
