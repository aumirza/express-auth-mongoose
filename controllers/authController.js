const User = require("../models/User")
const sendActivationEmail = require("../mails/accountActivation")
const createUser = require("../services/createUser")

// Route controller to register a new user
const register = async (req, res) => {
    createUser(req, res)
}

// Route controller to login a user
const login = async (req, res) => {

    // Fetch the user based on the email
    const user = await User.findByEmail(req.body.email)

    // check password and return the access token
    if (user?.checkPassword(req.body.password)) {
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
const refreshToken = async (req, res) => {

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
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const token = user.generateAccessToken()
        return res.json({ message: 'Token generated', token })

    } catch (error) {
        return res.status(400).send({ message: 'Invalid refresh token' })
    }
}


// Route controller to logout a user
const logout = (req, res) => {

    const refreshToken = req.cookies.refresh_token
    if (!refreshToken) {
        return res.status(400).send({ message: 'No refresh token' })
    }

    const user = User.findOne({ refreshTokens: refreshToken })
    if (!user) {
        return res.status(401).send({ message: 'User does not exist' })
    }
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken)
    user.save()

    res.clearCookie('refresh_token')
    res.json({ message: 'User logged out successfully' })
}

const authController = { register, login, logout, refreshToken }

module.exports = authController