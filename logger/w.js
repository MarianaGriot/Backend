const winston = require('winston');

// Configuración de los loggers
const developmentLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()]
});

const productionLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ]
});

// Función para obtener el logger según el entorno
function getLogger() {
  if (process.env.NODE_ENV === 'production') {
    return productionLogger;
  }
  return developmentLogger;
}

// Ejemplo de uso del logger
const logger = getLogger();
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
logger.fatal('Fatal message');
