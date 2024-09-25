const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const { verify } = require('../config/verification');
const prisma = new PrismaClient();


router.get('/:chatid/chatMessage', verify,  async (req, res) => {
    try {
        const {chatid} = req.params;
        const messages = prisma.message.findMany({
            where: {
                chatId: Number(chatid)
            }
        });

        if(!messages){
            res.status(401).json({
                status: 'Could not get messages'
            })
        }

        res.status(200).json({
            status: 'Retreived messages successfully',
            messages: messages
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Could not get messages'
        })
    }
});

//get messages from certain text
router.get('/messages', verify,  async (req, res) => {
    try {
        const {text} = req.body.text;
        const messages = prisma.message.findMany({
            where: {
                description: {
                    contains: text
                }
            }
        });

        if(!messages){
            res.status(401).json({
                status: 'Could not get messages'
            })
        }

        res.status(200).json({
            status: 'Retreived messages successfully',
            messages: messages
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Could not get messages'
        })
    }
});

//get all messages of a certain user
router.get('/:user_id/messages', verify,  async (req, res) => {
    try {
        const {user_id} = req.params;
        const messages = prisma.message.findMany({
            where: {
                userId: Number(user_id)
            }
        });

        if(!messages){
            res.status(401).json({
                status: 'Could not get messages'
            })
        }

        res.status(200).json({
            status: 'Retreived messages successfully',
            messages: messages
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Could not get messages'
        })
    }
});

//create message
router.post('/create', verify,  async (req, res) => {
    try {
        const {description, user_id, chat_id} = req.body;

        const message = prisma.message.create({
            data: {
                description: description,
                userId: user_id,
                chatId: chat_id
            }
        });

        if(!message){
            res.status(401).json({
                status: 'Could not create message'
            })
        }

        res.status(200).json({
            status: 'Created message successfully',
            message: message
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Could not create message'
        })
    }
});

//update message
router.put('/:message_id/update', verify, async (req, res) => {
    try {
        const {message_id} = req.params;
        const {description} = req.body;

        const message = prisma.message.update({
            where: {id: Nuumber(message_id)},
            data: {
                description: description,
            }
        });

        if(!message){
            res.status(401).json({
                status: 'Could not update message'
            })
        }

        res.status(200).json({
            status: 'Updated message successfully',
            message: message
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Could not update message'
        })
    }
});

router.delete('/:message_id/delete', verify, async (req, res) => {
    try {
        const {message_id} = req.params;

        const message = prisma.message.delete({
            where: {id: Number(message_id)}
        })

        if(!message){
            res.status(401).json({
                status: 'Could not delete message'
            })
        }

        res.status(200).json({
            status: 'Deleted message successfully',
            message: message
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Could not delete message'
        })
    }
});


module.exports = router;