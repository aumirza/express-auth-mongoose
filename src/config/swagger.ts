// eslint-disable-next-line @typescript-eslint/no-var-requires
import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Mongoose Auth',
            version: '1.0.0',
            description: 'Express Mongoose Auth',
        },
        servers: [
            {
                url: 'https://localhost:5000',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
}

export const specs = swaggerJsdoc(options)
