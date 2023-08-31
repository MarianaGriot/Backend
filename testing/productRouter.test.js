const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const productRouter = require('../path/to/your/productRouter'); // Importa tu enrutador de productos aquí

const app = express();
app.use('/products', productRouter);

describe('Product Router', () => {
  it('should return a list of products', (done) => {
    request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return a single product', (done) => {
    const productId = 1; // Cambia esto con un ID válido
    request(app)
      .get(`/products/${productId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(productId);
        done();
      });
  });

  // Agrega más pruebas aquí según las rutas y funcionalidades de tu enrutador de productos
  
});


// Puedes ejecutar tus pruebas utilizando el comando de Mocha:
// npx mocha test/productRouter.test.js