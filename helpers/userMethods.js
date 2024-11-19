const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateAccessToken() {
    const accessToken = jwt.sign(
        { id: this._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
    return accessToken
}

function generateRefreshToken() {
    const refreshToken = jwt.sign(
        { id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    )
    this.refreshTokens.push(refreshToken)
    this.save()
    return refreshToken
}

function generateActivationToken() {
    const activationToken = jwt.sign(
        { id: this._id },
        process.env.ACTIVATION_TOKEN_SECRET,
        { expiresIn: process.env.ACTIVATION_TOKEN_EXPIRES_IN })

    this.activationToken = activationToken
    this.save()
}

function generatePasswordResetToken() {
    const resetToken = jwt.sign(
        { id: this._id },
        process.env.RESET_TOKEN_SECRET,
        { expiresIn: process.env.RESET_TOKEN_EXPIRES_IN })

    this.resetToken = resetToken
    this.save()
}

function checkPassword(password) {
    return bcrypt.compareSync(password, this.password)
}

function toAuthJSON() {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        token: this.generateAccessToken(),
        refreshToken: this.generateRefreshToken()
    }
}

const userMethods = {
    generateAccessToken, generateRefreshToken,
    generateActivationToken, generatePasswordResetToken,
    checkPassword, toAuthJSON
}

module.exports = userMethods