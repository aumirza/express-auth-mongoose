import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import swaggerUi from 'swagger-ui-express'
import router from './routes/'
import { errorHandler } from './middlewares/errorHandler'
import { corsOptions, secret } from './config'
import './config/passportLocalStrategy'
import { specs } from './config/swagger'
import sessionOptions from './config/mongoSession'

// Dot env config
dotenv.config()

// Init app
const app = express()

// middlewares
app.use(logger('dev')) // Log requests to console
app.use(express.json()) // Parse JSON from the request body
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(cookieParser(secret)) // Parse cookies
app.use(cors(corsOptions)) // Enable CORS
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionOptions.cookie ? (sessionOptions.cookie.secure = true) : null // serve secure cookies
    // app.use('/', express.static(path.join(__dirname, '../../frontend')))
}

// Attaching routers
app.use('/api/v1/', router)
app.use('/', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(errorHandler)

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//     // Set static folder
//     app.use(express.static("client/build"));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

export default app
