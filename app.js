const express = require('express')
const createError = require('http-errors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

// Dot env config
dotenv.config()

// Init app
const app = express()

// middlewares
app.use(logger('dev')) // Log requests to console
app.use(express.json()) // Parse JSON from the request body
app.use(express.urlencoded()) // Parse URL-encoded bodies
app.use(cookieParser()) // Parse cookies
app.use(cors()) // Enable CORS

// Attaching routers
app.use('/api/v1/', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
});

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

module.exports = app