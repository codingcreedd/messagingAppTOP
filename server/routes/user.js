const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const genPassword = require('../lib/passwordUtils').genPassword;

router.post('signup', async (req, res) => {
    try {

        const {pw, fullName, email} = req.body;

        const createPass = genPassword(pw);
        const salt = createPass.salt;
        const hashpassword = createPass.hash;

        const user = await prisma.user.create({
            data: {
                fullName,
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
})

module.exports = router;