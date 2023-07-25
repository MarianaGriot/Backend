const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Asegúrate de tener el modelo de usuario importado

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Configurar la estrategia local de Passport para el inicio de sesión
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Configurar la estrategia de Passport para la autenticación de GitHub
passport.use(
  new GitHubStrategy(
    {
      clientID: 'your-github-client-id',
      clientSecret: 'your-github-client-secret',
      callbackURL: 'http://your-callback-url/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Verificar si el usuario de GitHub ya existe en la base de datos
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // Si no existe, crear un nuevo usuario en la base de datos
          user = new User({
            githubId: profile.id,
            email: profile.emails[0].value,
            role: 'usuario', // Opcional, asignar el rol de usuario
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Middleware de autenticación personalizado
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Debe iniciar sesión para ver esta página' });
};

app.use('/products', ensureAuthenticated);

// Ruta para el inicio de sesión local
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Inicio de sesión exitoso' });
});

// Ruta para la autenticación de GitHub
app.get('/auth/github', passport.authenticate('github'));

// Ruta de retorno después de la autenticación de GitHub
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/products');
  }
);

// Resto del código de rutas y servidor
// ...

app.listen(3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});
