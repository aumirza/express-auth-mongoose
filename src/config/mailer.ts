import nodemailer, { TransportOptions } from 'nodemailer'
import { smtpHost, smtpPassword, smtpPort, smtpUsername } from '.'

export const mailer = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,
    auth: {
        user: smtpUsername,
        pass: smtpPassword,
    },

    // service: 'gmail',
    // auth: {
    //     type: 'OAuth2',
    //     user: process.env.MAIL_USERNAME,
    //     pass: process.env.MAIL_PASSWORD,
    //     clientId: process.env.OAUTH_CLIENTID,
    //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //     refreshToken: process.env.OAUTH_REFRESH_TOKEN
    // }
} as TransportOptions)
