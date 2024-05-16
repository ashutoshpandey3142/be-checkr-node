import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            description: "Seeder Rest API",
            version: version,
            title: "Seeder Rest API"
        }
    },
    apis: [
        './src/routes/*.ts',
        './src/models/*.ts'
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
