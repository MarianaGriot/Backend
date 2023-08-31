const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const sessionRouter = require('../path/to/your/sessionRouter'); // Importa tu enrutador de sesiones aquí

const app = express();
app.use('/sessions', sessionRouter);

describe('Session Router', () => {
  it('should create a new session', (done) => {
    request(app)
      .post('/sessions')
      .send({ /* Datos de la sesión para crear */ })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        // Realiza más comprobaciones aquí según la respuesta esperada
        done();
      });
  });

  it('should get session by ID', (done) => {
    const sessionId = 1; // Cambia esto con un ID válido
    request(app)
      .get(`/sessions/${sessionId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(sessionId);
        // Realiza más comprobaciones aquí según la respuesta esperada
        done();
      });
  });

  // Agrega más pruebas aquí según las rutas y funcionalidades de tu enrutador de sesiones
});
