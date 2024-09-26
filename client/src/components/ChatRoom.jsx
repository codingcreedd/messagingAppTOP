import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import chat_api from '../apis/chats'
import { Context } from './ContextProvider';
import message_api from '../apis/messages'

const ChatRoom = () => {

  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState({
    chatContent: {},
    users: [],
    messages: []
  });

  const {userId} = useContext(Context);

  const {id} = useParams();
  const navigate = useNavigate();

  const handleSendMessage = async (e) => {
      e.preventDefault();
      try {
          await message_api.post('/create', {
            description: newMessage,
            chat_id: id
          }).then(response => {
            console.log(response.data.message)
            navigate(0);
          })
      } catch(err) {
        console.log(err);
      }
  }

  useEffect(() => {
      const fetchChat = async () => {
          try {
            await chat_api.get(`/${id}/chat`, {user_id: userId}).then(response => {
                if(response.status === 200) {
                  console.log(response.data.chat)
                  setChat(chat => ({
                    messages: response.data.chat.messages,
                    users: response.data.chat.users,
                    chatContent: {
                        id: response.data.chat.id,
                        name: response.data.chat.name,
                        createdAt: response.data.chat.createdAt,
                        updatedAt: response.data.chat.updatedAt,
                        isgroupchat: response.data.chat.isgroupchat
                    }
                  }));
                }
            })
          } catch(err){
            console.log(err);
          }
      }

      fetchChat();
  }, [id])

  return (
    <div className="min-h-screen w-[75%] bg-gradient-to-br from-[#0f1923] to-[#1c2831] text-white p-4 flex flex-col">
      
      <div className="bg-gradient-to-r from-[#1a2a3a] to-[#0f1923] p-4 rounded-t-2xl flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3a7bd5] to-[#00d2ff] flex items-center justify-center text-2xl font-bold">
          {chat?.chatContent?.name?.charAt(0)}{chat?.chatContent?.name?.charAt(1)}
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">{chat?.chatContent?.name}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <span>Users:</span>
            {chat?.users && chat?.users?.slice(0, 6).map((user, index) => (
              <span key={user.id}>{user.displayName}{index >= chat?.users.length - 1 ? '' :  ','}</span>
            ))}
            {chat?.users?.length > 6 && <span>...</span>}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {chat?.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl ${
                message.userId === userId
                  ? 'bg-gradient-to-r from-[#3a7bd5] to-[#0384a1] text-white'
                  : 'bg-gradient-to-r from-[#2a3f55] to-[#1c2831] text-gray-200'
              }`}
            >
              <div className='flex flex-col'>
                {
                  message.userId !== userId && <p className='text-[0.7rem] text-sky-600'>Sent by {message.userId}</p>  
                }
                <div className='flex items-center'>
                  <p className=''>{message.description}</p>
                  <p className='ml-6 text-[0.7rem]'>{message?.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 bg-[#0f1923] border border-[#3a7bd5] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d2ff] transition-all duration-300"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] text-white rounded-full text-sm font-medium hover:from-[#00d2ff] hover:to-[#3a7bd5] transition-all duration-300 transform hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatRoom