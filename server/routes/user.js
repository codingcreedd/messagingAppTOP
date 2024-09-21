const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const passport = require('passport');
const prisma = new PrismaClient();
const genPassword = require('../lib/passwordUtils').genPassword;

router.post('/signup', async (req, res) => {
    try {

        const {pw, displayName, email} = req.body;

        const createPass = genPassword(pw);
        const salt = createPass.salt;
        const hashpassword = createPass.hash;

        const user = await prisma.user.create({
            data: {
                displayName,
                email,
                hashpassword,
                salt
            }
        });

        if(user){
            res.status(201).json({
                message: 'User created successfully',
                userCreated: user
            })
        } else {
            res.status(500).json({
                message: 'could not create user',
            })
        }


    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating user'
        })
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Session --- ', req.session);
    delete req.user.hashpassword;
    delete req.user.salt;
    console.log('USER: ', req.user);

    if(!req.session.passport || !req.session.passport.user) {
        return res.status(401).json({
            message: 'Login failed'
        })
    } else {
        console.log(req.session.passport)
        return res.status(200).json({
            message: 'Login successful'
        })
    }
});

module.exports = router;