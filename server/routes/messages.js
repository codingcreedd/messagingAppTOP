const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const { verify } = require('../config/verification');
const prisma = new PrismaClient();


router.get('/:chatid/chatMessage', verify,  async (req, res) => {
    try {
        const {chatid} = req.params;
        const messages = await prisma.message.findMany({
            where: {
                chatId: Number(chatid)
            }
        });

        if(!messages){
            res.status(401).json({
                message: 'Could not retreive messages', status: 'failure'
            })
        }

        res.status(200).json({
            message: 'Retreived messages successfully',
            messages: messages,
            status: 'success'
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Could not get messages',
            status: 'failure'
        })
    }
});

//get messages from certain text
router.get('/messages', verify,  async (req, res) => {
    try {
        const {text} = req.body.text;
        const messages = await prisma.message.findMany({
            where: {
                description: {
                    contains: text
                }
            }
        });

        if(!messages){
            res.status(401).json({
                message: 'Could not get messages',
                status: 'failure'
            })
        }

        res.status(200).json({
            message: 'Retreived messages successfully',
            messages: messages,
            status: 'success'
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Could not get messages',
            status: 'failure'
        })
    }
});

//get all messages of a certain user
router.get('/:user_id/messages', verify,  async (req, res) => {
    try {
        const {user_id} = req.params;
        const messages = await prisma.message.findMany({
            where: {
                userId: Number(user_id)
            }
        });

        if(!messages){
            res.status(401).json({
                message: 'Could not get messages',
                status: 'failure'
            })
        }

        res.status(200).json({
            message: 'Retreived messages successfully',
            messages: messages,
            status: 'success'
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Could not get messages',
            status: 'failure'
        })
    }
});

//create message
router.post('/create', verify,  async (req, res) => {
    try {
        console.log('RANNNN')
        const {description, chat_id} = req.body;
        const user_id = req.user.id;

        const message_ = await prisma.message.create({
            data: {
                description: description,
                userId: user_id,
                chatId: Number(chat_id)
            }
        });


        if(!message_){
            res.status(401).json({
                message: 'Could not create message',
                status: 'failure'
            })
        }

        res.status(200).json({
            message: 'Created message successfully',
            message_: message_,
            status: 'success'
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Could not create message',
            status: 'failure'
        })
    }
});

//update message
router.put('/:message_id/update', verify, async (req, res) => {
    try {
        console.log('raaaaaaaaaaaaaaaaaaaaaaaan')
        const {message_id} = req.params;
        const {description} = req.body;

        const message_ = await prisma.message.update({
            where: {id: Number(message_id)},
            data: {
                description: description,
            }
        });

        if(!message_){
            res.status(401).json({
                message: 'Could not update message',
                status: 'failure'
            })
        }

        res.status(200).json({
            message: 'Updated message successfully',
            message_: message_,
            status: 'success'
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Could not update message',
            status: 'failure'
        })
    }
});

router.delete('/:message_id/delete', verify, async (req, res) => {
    try {
        const {message_id} = req.params;

        const message_ = await prisma.message.delete({
            where: {id: Number(message_id)}
        })

        if(!message_){
            res.status(401).json({
                message: 'Could not delete message',
                status: 'failure'
            })
        }

        res.status(200).json({
            message: 'Deleted message successfully',
            message_: message_,
            status: 'success'
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Could not delete message',
            status: 'failure'
        })
    }
});


module.exports = router;