const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const { verify } = require('../config/verification');
const prisma = new PrismaClient();

//get all chats with more than one message for the user using the website
router.get('/', verify,  async (req, res) => {
    const user_id = req.user.id;
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
            }
        });

        if(!chats) {
            res.status(401).json({
                message: 'Could not retreive chats',
                status: 'failure'
            });
        }

        res.status(200).json({
            message:'Retreived chats successfully',
            chats: chats,
            status: 'success'
        });


    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error retreiving chats',
            status: 'failure'
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
          message: 'Could not create chat or message',
          status: 'failure'
        });
      }
  
      res.status(200).json({
        message: 'Created chat successfully',
        chat: chat,
        firstMessage: message,
        status: 'success'
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error creating chat',
        status: 'failure'
      });
    }
  });

//get specific chat by id
router.get('/:id/chat', verify, async (req, res) => {
    const {id} = req.params;
    const user_id = req.user.id;
    try {
        const chat = await prisma.chat.findUnique({
            where: {id: Number(id)},
            include: {
                users: true,
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });



        if(!chat) {
            res.status(403).json({status: 'Error retreiving chat'});
        } else {
            console.log(user_id)
            console.log(chat.users)
            let userExists = false;
            for(let i = 0; i < chat.users.length; i++){
                if(chat.users[i].id === user_id){
                    userExists = true;
                    break;
                }
            }

            if(userExists === true) {
                res.status(200).json({
                    message: 'Retreived chat successfully',
                    chat: chat,
                    status: 'success'
                });
            } else {
                res.status(401).json({
                    message: 'You are not authorized to access this chat',
                    status: 'failure'
                })
            }
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not get chat', status: 'failure'});
    }
})

  
module.exports = router;