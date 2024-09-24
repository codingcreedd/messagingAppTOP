const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//get all chats with more than one message for the user using the website
router.get('/', async (req, res) => {
    const {user_id} = req.body;
    try {
        const chats = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id: user_id
                    }
                }
            },
            include: {
                users: true,
                messages: true
            },
            id: {
                not: 1
            }
        });

        if(!chats) {
            res.status(401).json({
                status: 'Could not retreive chats'
            });
        }

        res.status(200).json({
            status:'Retreived chats successfully',
            chats: chats
        });


    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'Error retreiving chats'
        })
    }
});

// router.post('/add', async (req, res) =>{
//     try {
//         const chat = await prisma.chat.create({
//             data: {
                
//             }
//         })

//         if(!chat) {
//             res.status(401).json({
//                 status: 'Could not create chat'
//             });
//         }

//         res.status(200).json({
//             status:'Created chat successfully',
//             chat: chat
//         });


//     } catch(err) {
//         console.log(err);
//         res.status(500).json({
//             status: 'Error creating chat'
//         })
//     }
// })

module.exports = router;