import { Router } from 'express'
import passport from 'passport'
import authController from '../controllers/authController'
import { checkAuthenticated } from '../middlewares/authMiddleware'

const authRouter = Router()

/**
 * @swagger
 * /api/auth/login:
 *  get:
 *    summary: Login
 *    description: Login
 *    tags:
 *      - Auth
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Login
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Server error
 */
authRouter.get('/login', authController.login)

authRouter.post('/register', authController.register)

// authRouter.post('/loginSuccess', authController.loginSuccess)
authRouter.post('/loginFailure', authController.loginFailure)

authRouter.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/api/auth/loginFailure',
        // successRedirect: '/api/auth/loginSuccess',
    }),
    authController.loginSuccess,
)

authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
authRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        successReturnToOrRedirect: '/api/auth/loginSuccess',
        failureRedirect: '/api/auth/loginFailure',
    }),
)

authRouter.get('/facebook', passport.authenticate('facebook'))
authRouter.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/api/auth/loginFailure',
    }),
    authController.loginSuccess,
)

// authenticated routes
authRouter.use(checkAuthenticated)
// authRouter.post("/refresh-token", authController.refreshToken);
// authRouter.post("/logout", authController.logout);

export default authRouter
