import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { accessTokenSecret } from '../config'
import User from '../models/userModel'

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/api/auth/login')
}

// const authMiddleWare = async function (req: Request, res: Response, next: NextFunction) {
//     try {
//         // const token = req.headers['x-access-token']
//         const token = req.headers.authorization.split(' ')[1]
//         const decodedToken = jwt.verify(token, accessTokenSecret)
//         const user = await User.findById(decodedToken.id)
//         if (!user) {
//             return res.status(401).json({ message: 'You are not authenticated' })
//         }
//         req.user = user
//         next()
//     } catch (err) {
//         res.status(401).json({ message: 'You are not authenticated' })
//     }
// }
