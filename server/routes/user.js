const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const passport = require('passport');
const { validatePassword } = require('../lib/passwordUtils');
const generateToken = require('../lib/jwtUtils');
const prisma = new PrismaClient();
const genPassword = require('../lib/passwordUtils').genPassword;
const verifyPass = require('../lib/passwordUtils').validatePassword;
const verify = require('../config/verification').verify;

router.get('/protected', verify, (req, res) => {
    try {
        console.log(req.user)
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

router.post('/login', async (req, res) => {
    const {email, pw} = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    });
    

    if(!existingUser) {
        return res.status(403).json({message: 'User not found', status: 'failed'})
    }

    const isValid = verifyPass(pw, existingUser.hashpassword, existingUser.salt);
    if(!isValid) {
        return res.status(401).json({message: 'Password Incorrect', status: 'failed'});
    }

    const token = generateToken(existingUser);
    res.status(201).json({
        message: 'Login successful',
        status: 'success',
        authenticated: true,
        token: token
    })

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

//get user information
router.get('/:id/user-info', verify, async (req, res) => {
    try {
        const {id} = req.params;
        if(Number(id) === req.user.id) {
            const user = await prisma.user.findUnique({
                where: {id: Number(id)},
                select: {
                    id: true,
                    displayName: true,
                    email: true,
                    createdAt: true
                }
            });
    
            if(!user) {
                res.status(500).json({message: 'Could not retreive user', status: 'failure'});
            }
    
            res.status(200).json({
                message: 'Retreived user information successfully',
                status: 'success',
                user: user
            })
        } else {
            res.status(403).json({
                message: 'Wrong User',
                status: 'failure'
            })
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not retreive user information', status: 'failure'})
    }
})

//change profile display name
router.put('/:id/name', verify,  async (req, res) => {
    try {
        const {displayName} = req.body;
        const {id} = req.params;

        if(Number(id) === req.user.id) {
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
        } else {
            res.status(403).json({
                message: 'Wrong user',
                status: 'failure'
            })
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not update display name', status: 'failure'});
    }
});

router.put('/:id/password', verify,  async (req, res) => {
    try {
        const {password, verifyOldPassword} = req.body;
        const {id} = req.params;
        
        if(Number(id) === req.user.id) {
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
    
                res.status(200).json({
                    message: 'Updated password successfuly',
                    status: 'success'
                })
            } else {
                res.status(401).json({message: 'Password is not verified...', status: 'failure'});
            }
        } else {
            res.status(403).json({message: 'Wrong User', status: 'failure'})
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not update password', status: 'failure'});
    }
});

//get user friends

router.get('/:user_id/friends', verify,  async (req, res) => {
    const {user_id} = req.params;
    try {
        if(Number(user_id) === req.user.id) {
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
        } else {
            res.status(403).json({message: 'Wrong User', status: 'failure'})
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not retreive user information', status: 'failure'})
    }
})


//add a friend
router.post('/add-contact', verify,  async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (user) {
            const [updatedUser, updatedFriend] = await Promise.all([
                prisma.user.update({
                    where: {
                        id: req.user.id
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
                            connect: { id: req.user.id }
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