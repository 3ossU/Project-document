import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Real Estate API',
            version: '1.0.0',
            description: 'API documentation for Real Estate Platform'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                Property: {
                    type: 'object',
                    required: ['id', 'name', 'price', 'location', 'type'],
                    properties: {
                        id: { type: 'integer', description: 'Property ID' },
                        name: { type: 'string', description: 'Property name' },
                        price: { type: 'number', description: 'Property price' },
                        location: { type: 'string', description: 'Property location' },
                        type: { 
                            type: 'string', 
                            enum: ['Condo', 'House', 'Land', 'Townhouse'], 
                            description: 'Property type' 
                        },
                        description: { type: 'string', description: 'Property description' },
                        image: { type: 'string', description: 'Property image URL' }
                    }
                },
                Article: {
                    type: 'object',
                    required: ['id', 'title', 'content'],
                    properties: {
                        id: { type: 'integer', description: 'Article ID' },
                        title: { type: 'string', description: 'Article title' },
                        description: { type: 'string', description: 'Short article description' },
                        image: { type: 'string', description: 'Article image URL' },
                        content: { type: 'string', description: 'Article content' },
                        createdAt: { type: 'string', nullable: true, description: 'Creation timestamp' },
                        updatedAt: { type: 'string', nullable: true, description: 'Update timestamp' }
                    }
                }
            }
        }
    },
    apis: ['./src/router/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
