import User from '../models/userModel'

import fs from 'fs'
import { JwtPayload } from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt'
import { IUser } from '../types/modelTypes/userModel'

const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8')

// At a minimum, you must pass these options (see note after this code snippet for more)
const passportJWTOptions: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY || 'secret phrase',
    issuer: 'enter issuer here',
    audience: 'enter audience here',
    algorithms: ['RS256'],
    ignoreExpiration: false,
    passReqToCallback: false,
    jsonWebTokenOptions: {
        complete: false,
        // clockTolerance: ,
        maxAge: '2d', // 2 days
        clockTimestamp: 100,
        nonce: 'string here for OpenID',
    },
}

// The JWT payload is passed into the verify callback
passport.use(
    new JwtStrategy(passportJWTOptions, function (jwt_payload: JwtPayload, done: CallableFunction) {
        // We will assign the `sub` property on the JWT to the database ID of user
        User.findOne({ id: jwt_payload.sub }, function (err: Error, user: IUser) {
            // This flow look familiar?  It is the same as when we implemented
            // the `passport-local` strategy
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }),
)
