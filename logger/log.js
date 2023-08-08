// Reemplazar console.log() por el logger
console.log('Mensaje de consola'); // Reemplazar esto
logger.debug('Mensaje de debug');  // Con esto

// Ejemplo de uso en un endpoint
app.get('/loggerTest', (req, res) => {
  logger.info('Se accedió al endpoint /loggerTest');
  // ... tu lógica aquí ...
  res.send('Prueba de logs exitosa');
});
