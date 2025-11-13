import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API de spotty',
        description: 'Documentación de la API de Spotty',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js','./src/routes/PersonRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);