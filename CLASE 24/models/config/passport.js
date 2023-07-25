// config/passport.js
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = 'tu_secreto_supersecreto'; // Puedes cambiar esto por un valor seguro y guardarlo en una variable de entorno
const User = require('../models/user');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Buscar el usuario por el id almacenado en el token JWT
      const user = await User.findById(payload.sub);

      // Si no se encuentra el usuario, indicamos que no se ha encontrado
      if (!user) {
        return done(null, false);
      }

      // Si el usuario existe, retornamos el usuario
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
