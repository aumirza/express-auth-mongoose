import session, { SessionOptions } from 'express-session'
import mongoDbSession, { MongoDBSessionOptions } from 'connect-mongodb-session'
import { mongoDbURI, secret } from '.'

export const sessionOptions: SessionOptions = {
    secret: secret || 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // path: '/',
        sameSite: false,
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 4, // 4 days in milliseconds
    },
}

export const mongoDbSessionOptions: MongoDBSessionOptions = {
    uri: mongoDbURI,
    collection: 'sessions',
}

const mongoDbStore = mongoDbSession(session)

const sessionStore = new mongoDbStore(mongoDbSessionOptions)
sessionStore.on('error', (error) => console.log(error))
sessionOptions.store = sessionStore

export default sessionOptions
