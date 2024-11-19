const authController = require("../controllers/authController")
const authMiddleWare = require("../middlewares/authMiddleware")

const authRouter = require("express").Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

// authenticated routes
authRouter.use(authMiddleWare)
authRouter.post('/refresh-token', authController.refreshToken)
authRouter.post('/logout', authController.logout)

module.exports = authRouter