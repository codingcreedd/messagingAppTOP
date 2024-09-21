const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validatePassword = require('../lib/passwordUtils').validatePassword;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

const customFields = {
    usernameField: 'email',
    passwordField: 'pw',
}

const verifyCallback = async (email, password, done) => {
    try {
        console.log('authenticating...');
        const user = await prisma.user.findUnique({
            where: { email }
        });


        if (!user) {
            return done(null, false, { message: 'Incorrect email' });
        }

        const isValid = validatePassword(password, user.hashpassword, user.salt);

        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }

    } catch (err) {
        console.log(err);
        return done(err);
    }
}


const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });

        if (user) {
            done(null, user);
        } else {
            done(null, false, { message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        done(err);
    }
});


