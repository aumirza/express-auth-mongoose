import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/userModel'
import { googleOAuth2 } from './index'

passport.use(
    new GoogleStrategy(
        {
            clientID: googleOAuth2.clientId,
            clientSecret: googleOAuth2.clientSecret,
            callbackURL: '',
            passReqToCallback: true,
        },
        User.upsertSocialUser,
    ),
)

passport.serializeUser(User.serialize)
passport.deserializeUser(User.deserialize)
