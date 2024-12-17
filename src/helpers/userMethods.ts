import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import {
    accessTokenExpiresIn,
    accessTokenSecret,
    activationTokenExpiresIn,
    activationTokenSecret,
    refreshTokenExpiresIn,
    refreshTokenSecret,
    resetPasswordTokenExpiresIn,
    resetPasswordTokenSecret,
} from '../config/index'
import { IUser, IUserMethods, IUserModel, IUserStatics } from '../types/modelTypes/userModel'
import { Profile } from 'passport-google-oauth20'
import { Request } from 'express'
import { convertTimeToSeconds } from '../utils/timeConverter'

function generateActivationToken(this: IUser) {
    const token = jwt.sign({ id: this._id }, activationTokenSecret, {
        expiresIn: activationTokenExpiresIn,
    })
    this.activationToken = token
    return token
}

function generateResetPasswordToken(this: IUser) {
    const token = jwt.sign({ id: this._id }, resetPasswordTokenSecret, {
        expiresIn: resetPasswordTokenExpiresIn,
    })
    this.resetPasswordToken = token
    return token
}

async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
}

async function checkPassword(this: IUser, password: string) {
    return await bcrypt.compare(password, this.password)
}

function generateAccessToken(this: IUser) {
    return jwt.sign({ id: this._id }, accessTokenSecret, {
        expiresIn: accessTokenExpiresIn,
    })
}

function generateRefreshToken(this: IUser) {
    const token = jwt.sign({ id: this._id }, refreshTokenSecret, {
        expiresIn: refreshTokenExpiresIn,
    })

    const expiresAt = new Date(Date.now() + convertTimeToSeconds(refreshTokenExpiresIn) * 1000)
    this.refreshTokens.push({ token, expires: expiresAt })
    return token
}

async function toAuthJSON(this: IUser) {
    const accessToken = this.generateAccessToken()
    const refreshToken = this.generateRefreshToken()

    await this.save()
    return {
        _id: this._id as string,
        name: this.name,
        email: this.email,
        accessToken,
        refreshToken,
    }
}

async function verifyRefreshToken(this: IUser, refreshToken: string) {
    const token = this.refreshTokens.find((token) => token.token === refreshToken)
    if (!token) throw new Error('Invalid refresh token')

    const isExpired = new Date(token.expires) < new Date()
    if (isExpired) throw new Error('Refresh token expired')

    return true
}

async function upsertSocialUser(
    this: IUserModel,
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: CallableFunction,
) {
    try {
        let user = await this.findOne({ 'googleProvidor.id': profile.id })
        if (user) return cb(null, user)

        const newUser = await this.create({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            password: profile.id,
            googleProvidor: { id: profile.id, token: accessToken },
        })
        cb(null, newUser)
    } catch (error) {
        cb(error, null)
    }
}

function serialize(req: Request, user: IUser, done: CallableFunction) {
    return done(null, user._id)
}

async function deserialize(this: IUserModel, id: string, done: CallableFunction) {
    try {
        const user = await this.findById(id)
        return done(null, user)
    } catch (error) {
        return done(error, null)
    }
}

export const UserMethods: IUserMethods = {
    generateActivationToken,
    generateResetPasswordToken,
    generateAccessToken,
    generateRefreshToken,
    hashPassword,
    checkPassword,
    toAuthJSON,
    verifyRefreshToken,
}

export const UserStatics: IUserStatics = {
    upsertSocialUser,
    serialize,
    deserialize,
}
