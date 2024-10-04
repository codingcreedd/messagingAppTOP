require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');


//middlewares
app.use(cors({
  origin: 'https://whatsuptop.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://whatsuptop.netlify.app');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore,
//     cookie: {
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production' || false
//     }
// }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// require('./config/passport')
// app.use(passport.initialize());
// app.use(passport.session());

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