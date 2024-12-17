import { Router } from 'express'
import userController from '../controllers/userController'
// import authMiddleWare from '../middlewares/authMiddleware'

const userRouter = Router()

userRouter.get('activate/:token', userController.activateUser)

// Attach the  auth middleware to the routes
// userRouter.use(authMiddleWare)

// userRouter.get('/', userController.getAllUsers)

userRouter.get('reset-password', userController.requestResetPassword)
userRouter.get('reset-password/:token', userController.resetPassword)

userRouter.get('/profile', userController.getProfile)
userRouter.get('/tokens', userController.getTokens)

module.exports = userRouter
