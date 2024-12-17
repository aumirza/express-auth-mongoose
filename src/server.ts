import app from './app'
import { createServer } from 'http'
import morgan from 'morgan'

import { PORT } from './config'
import { connectMongo } from './config/mongoose'

const logger = morgan('dev')
app.use(logger)

const server = createServer(app)

server.listen(PORT, () => {
    connectMongo()
    console.log(`Server is started on port ${PORT}`)
})
