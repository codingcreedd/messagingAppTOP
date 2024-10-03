require('dotenv').config();

const express = require('express');
const app = express();
const sessionStore = require('./prisma/db/index').sessionStore;
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

const allowedOrigins = ['http://localhost:5173', 'https://whatsuptop.netlify.app'];

//middlewares
app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

//Routes
const user = require('./routes/user');
const messages = require('./routes/messages');
const chats = require('./routes/chats');

app.use('/user', user);
app.use('/messages', messages);
app.use('/chats', chats);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up an running on server ${port}`);
})

module.exports = app;