import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { IUser } from '../types/modelTypes/userModel'
import User from '../models/userModel'

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (email: string, password: string, done: CallableFunction) => {
            User.findOne({ email: email }, (err: Error, user: IUser) => {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect email' })
                }
                if (!user.checkPassword(password)) {
                    return done(null, false, { message: 'Incorrect password' })
                }
                return done(null, user)
            })
        },
    ),
)

passport.serializeUser((user: IUser, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err: Error, user: IUser) => {
        if (err) return done(err)

        process.nextTick(() => {
            done(null, user)
        })
    })
})
