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
            await prisma.chat.update({
                where: {id: 1},
                data: {
                    users: {
                        connect: {id: user.id}
                    }
                }
            });

            res.status(201).json({
                message: 'User created successfully',
                userCreated: user,
                status: 'success'
            })
        } else {
            res.status(500).json({
                message: 'could not create user',
                status: 'failure'
            })
        }


    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating user',
            status: 'failure'
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
            message: 'Login failed',
            status: 'failure'
        })
    } else {
        console.log(req.session.passport)
        return res.status(200).json({
            message: 'Login successful',
            status: 'success'
        })
    }
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); 
        }
        res.status(200).json({
            message: 'Logged out successfully',
            status: 'success'
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

router.put('/:id/name', verify,  async (req, res) => {
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
            message: 'Updated display name successfuly',
            status: 'success'
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not update display name', status: 'failure'});
    }
});

router.put('/:id/password', verify,  async (req, res) => {
    try {
        const {password, verifyOldPassword} = req.body;
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
                message: 'Updated password successfuly',
                status: 'success'
            })
        } else {
            res.status(401).json({message: 'Password is not verified...', status: 'failure'});
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not update display name', status: 'failure'});
    }
});

//get user friends

router.get('/:user_id/friends', verify,  async (req, res) => {
    const {user_id} = req.params;
    try {
        const userFriendsInfo = await prisma.user.findUnique({
            where: {id: Number(user_id)},
            select: {
                friendOf: true,
                friends: true,
            }
        });

        

        if(userFriendsInfo) {
            res.status(200).json({
                message: 'Retreived user information successfully',
                userFriendsInfo: userFriendsInfo,
                status: 'success'
            })
        } else {
            res.status(403).json({message: 'Could not retreive user information', status: 'failure'})
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not retreive user information', status: 'failure'})
    }
})


//add a friend
router.post('/add-contact', verify,  async (req, res) => {
    try {
        const { email, currentUserId } = req.body;

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (user) {
            const [updatedUser, updatedFriend] = await Promise.all([
                prisma.user.update({
                    where: {
                        id: currentUserId
                    },
                    data: {
                        friends: {
                            connect: { id: user.id }
                        }
                    }
                }),
                prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        friendOf: {
                            connect: { id: currentUserId }
                        }
                    }
                })
            ]);

            if (updatedUser && updatedFriend) {
                res.status(201).json({
                    message: 'Contact added successfully',
                    updatedUser,
                    status: 'success'
                });
            } else {
                res.status(403).json({
                    message: 'Could not add new contact',
                    status: 'failure'
                });
            }

        } else {
            res.status(500).json({
                message: 'This user does not use Whats Down',
                status: 'failure'
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Could not update display name', status: 'failure' });
    }
});


module.exports = router;