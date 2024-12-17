import express from 'express'
import authRouter from './authRouter'
// const userRouter = require('./userRouter')

const router = express.Router()

router.use('/auth', authRouter)
// router.use('/user', userRouter)

export default router