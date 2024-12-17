import { NextFunction, Request, Response } from 'express'
import { createUser } from '../services/userCreationService'
import User from '../models/userModel'
import { IUser } from '../types/modelTypes/userModel'

class AuthController {
    async register(req: Request, res: Response) {
        try {
            await createUser(req, res)
        } catch (error) {
            res.status(400).json({ message: 'Error registering user' })
        }
    }
    async login(req: Request, res: Response) {
        // Fetch the user based on the email
        const user = await User.find().byEmail(req.body.email)

        // check password and return the access token
        if (user && (await user.checkPassword(req.body.password))) {
            const token = user.generateAccessToken()
            res.json({ message: 'User logged in successfully', token })
        } else {
            res.status(400).json({ message: 'Invalid email or password.' })
        }

        // For separate errors of invalid email and invalid password
        // if (!user) {
        //     return res.status(400).send({ message: 'The email address is not registered.' })
        // }
        // if (user.checkPassword(req.body.password)) {}
    }

    // Route controller to refresh the access token
    async refreshToken(req: Request, res: Response) {
        // const refreshToken = req.body.refresh_token
        const refreshToken = req.cookies.refresh_token

        // if no refresh tokens found in cookies
        if (!refreshToken) {
            return res.status(400).send({ message: 'No refresh token' })
        }

        // Fetches the user based on the refresh token
        const user = await User.findOne({ refreshTokens: refreshToken })

        // if no user found return error
        if (!user) {
            return res.status(401).send({ message: 'User does not exist' })
        }

        // verify the refresh token and return the new access token
        try {
            await user.verifyRefreshToken(refreshToken)
            const token = user.generateAccessToken()
            return res.json({ message: 'Token generated', token })
        } catch (error) {
            return res.status(400).send({ message: 'Invalid refresh token' })
        }
    }

    // Route controller to logout a user
    async logout(req: Request, res: Response) {
        const refreshToken = req.cookies.refresh_token
        if (!refreshToken) {
            return res.status(400).send({ message: 'No refresh token' })
        }

        const user = await User.findOne({ refreshTokens: refreshToken })
        if (!user) {
            return res.status(401).send({ message: 'User does not exist' })
        }
        user.refreshTokens = user.refreshTokens.filter(({ token }) => token !== refreshToken)
        user.save()

        res.clearCookie('refresh_token')
        res.json({ message: 'User logged out successfully' })
    }

    async loginSuccess(req: Request, res: Response, next: NextFunction) {
        req.logIn(req.user as IUser, (err) => {
            if (err) {
                return next(err)
            }
            return res.json({ message: 'success', user: req.user?.toJSON() })
        })
    }

    async loginFailure(err: Error, req: Request, res: Response) {
        res.status(500).json(err.message)
    }
}

export default new AuthController()
