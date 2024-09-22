const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const passport = require('passport');
const { validatePassword } = require('../lib/passwordUtils');
const prisma = new PrismaClient();
const genPassword = require('../lib/passwordUtils').genPassword;
const verifyPass = require('../lib/passwordUtils').validatePassword;
const verify = require('../config/verification').verify;

router.get('/protected', verify, (req, res) => {
    try {
        delete req.user.hashpassword;
        delete req.user.salt;
        res.status(200).json({
            authenticated: true,
            user: req.user
        })
    } catch(err) {
        console.log(err);   
    }
});

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

            const globalChat = prisma.chat.findFirst({
                where: {name: 'Global Chat'}
            });

            await prisma.chat.update({
                where: {id: globalChat.id},
                data: {
                    users: {
                        connect: {id: user.id}
                    }
                }
            });

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

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); 
        }
        res.status(200).json({
            message: 'Logged out successfully'
        });

        if(req.session.passport) {
            console.log(req.session.passport);
        } else {
            console.log(req.session);
        }
    });
})

//USER PROFILE
//Update name, update password

router.put('/:id/name', async (req, res) => {
    try {
        const {displayName} = req.body.displayName;
        const {id} = req.params;

        await prisma.user.update({
            where: {id: Number(id)},
            data: {
                displayName: displayName
            }
        });

        res.status(201).json({
            message: 'Updated display name successfuly'
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not update display name'});
    }
});

router.put('/:id/password', async (req, res) => {
    try {
        const {password, verifyOldPassword} = req.body.displayName;
        const {id} = req.params;
        
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });

        const passVerified = validatePassword(verifyOldPassword, user.hashpassword, user.salt);
        

        if(passVerified){
            const newPassword = genPassword(password);
            const newHash = newPassword.hash;
            const newSalt = newPassword.salt;
            await prisma.user.update({
                where: {id: Number(id)},
                data: {
                    hashpassword: newHash,
                    salt: newSalt
                }
            });

            res.status(201).json({
                message: 'Updated password successfuly'
            })
        } else {
            res.status(401).json({message: 'Password is not verified...'});
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not update display name'});
    }
});

//Photo





module.exports = router;