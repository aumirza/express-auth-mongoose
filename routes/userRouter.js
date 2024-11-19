const userRouter = require('express').Router()
const userController = require('../controllers/userController')
const authMiddleWare = require('../middlewares/authMiddleware')


userRouter.get('activate/:token', userController.activateUser)

// Attach the  auth middleware to the routes
userRouter.use(authMiddleWare)

// userRouter.get('/', userController.getAllUsers)

userRouter.get('reset-password', userController.requestResetPassword)
userRouter.get('reset-password/:token', userController.resetPassword)

userRouter.get('/profile', userController.getProfile)
userRouter.get('/tokens', userController.getTokens)

module.exports = userRouter
