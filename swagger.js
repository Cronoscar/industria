import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API de spotty',
        description: 'Documentación de la API de Spotty',
    },
    host: 'localhost:8000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);