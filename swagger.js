const swaggerJsDoc = require('swagger.js');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();

const swaggerOptions = {
  swaggerDefinition: require('./swaggerDef'),
  apis: ['app.js'], // Puedes reemplazar 'app.js' con el nombre de tus archivos de ruta/documentos/productos/carritos
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
