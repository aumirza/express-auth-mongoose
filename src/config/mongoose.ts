import mongoose from 'mongoose'
import { mongoDbURI } from '.'

export const connectMongo = function () {
    // const options = {
    //   useNewUrlParser: true,
    //   //   useUnifiedTopology: true,
    //   //   useCreateIndex: true,
    //   //   useFindAndModify: false,
    // };

    mongoose.connect(mongoDbURI)

    const conn = mongoose.connection

    // When successfully connected
    conn.on('connected', console.log.bind(console, 'Mongoose connection open to ', mongoDbURI))
    conn.on('open', console.log.bind(console, 'Connected to MongoDB'))
    // If the connection throws an error
    conn.on('error', console.error.bind(console, 'Mongoose connection error: '))
    // When the connection is disconnected
    conn.on('disconnected', console.log.bind(console, 'Mongoose disconnected'))
}
