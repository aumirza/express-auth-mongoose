const Mongoose = require("mongoose");


// Constructing mongodb uri
const mongoDbHost = process.env.DB_HOST ?? '127.0.0.1'
const mongoDbPort = process.env.DB_PORT ?? '27017'
const mongoDbName = process.env.DB_NAME ?? 'basic-auth'

const MongoDbURI = process.env.MONGODB_URI ??
    `mongodb://${mongoDbHost}:${mongoDbPort}/${mongoDbName}`

Mongoose.connect(
    MongoDbURI,
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true
    }
)

// CONNECTION EVENTS
const db = Mongoose.connection;

// When successfully connected
db.on('connected', () => {
    console.log('Mongoose connection open to ' + MongoDbURI);
})

// If the connection throws an error
db.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
})

// When the connection is disconnected
db.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
})

module.exports = db