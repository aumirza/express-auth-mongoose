import path from 'path'
import dotenv from 'dotenv'

const dotenvConfig = {
    path: path.resolve(__dirname, '../../.env'),
}
dotenv.config(dotenvConfig)

import { normalizePort } from '../utils/normalizePort'
import { CorsOptions } from 'cors'

export const PORT = normalizePort(process.env.PORT || 5000)

const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost'
const MONGODB_PORT = process.env.MONGODB_PORT || 27017
const MONGODB_NAME = process.env.MONGODB_NAME || 'auth'
const MONGODB_USER = process.env.MONGODB_USER || 'user'
const MONGODB_PASS = process.env.MONGODB_PASS || 'pass'

export const mongoDbURI =
    process.env.MONGODB_URI ||
    `mongodb://${MONGODB_USER}:${encodeURIComponent(MONGODB_PASS)}@${MONGODB_HOST}${
        MONGODB_PORT ? ':' + MONGODB_PORT : ''
    }/${MONGODB_NAME}?directConnection=true&tls=true`

export const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}

export const secret = process.env.SECRET || 'some secret'

export const jwtSecret = process.env.JWT_SECRET || secret
export const activationTokenSecret = process.env.ACTIVATION_TOKEN_SECRET || secret
export const resetPasswordTokenSecret = process.env.RESET_PASSWORD_TOKEN_SECRET || secret
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || secret
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || secret

export const activationTokenExpiresIn = process.env.ACTIVATION_TOKEN_EXPIRES_IN || '1d'
export const resetPasswordTokenExpiresIn = process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN || '1d'
export const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || '1d'
export const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || '3d'

export const smtpHost = process.env.SMTP_HOST
export const smtpPort = process.env.SMTP_PORT || 465
export const smtpUsername = process.env.MAIL_USERNAME
export const smtpPassword = process.env.MAIL_PASSWORD

export const googleOAuth2 = {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
}
