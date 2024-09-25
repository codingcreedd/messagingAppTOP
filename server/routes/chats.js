const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const { verify } = require('../config/verification');
const prisma = new PrismaClient();

//get all chats with more than one message for the user using the website
router.get('/', verify,  async (req, res) => {
    const {user_id} = req.body;
    try {
        const chats = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id: user_id
                    }
                },
                id: {
                    not: 1
                }
            },
            include: {
                users: true,
                messages: true
            },
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

router.post('/add', verify,  async (req, res) => {
    const { name, isGroupChat, firstMessage, user_id, contact_id } = req.body;
    
    try {
      const chat = await prisma.chat.create({
        data: {
          name,
          isgroupchat: isGroupChat,
          users: {
            connect: [
              { id: user_id },
              { id: contact_id }
            ]
          }
        }
      });
  
      const message = await prisma.message.create({
        data: {
          description: firstMessage,
          userId: user_id,
          chatId: chat.id 
        }
      });
  
      if (!chat || !message) {
        return res.status(401).json({
          status: 'Could not create chat or message'
        });
      }
  
      res.status(200).json({
        status: 'Created chat successfully',
        chat: chat,
        firstMessage: message
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'Error creating chat'
      });
    }
  });
  
module.exports = router;