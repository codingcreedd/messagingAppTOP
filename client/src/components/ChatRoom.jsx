import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import chat_api from '../apis/chats'
import { Context } from './ContextProvider';
import message_api from '../apis/messages'
import MessageActionTab from './MessageActionTab'
import Loader from './Loader';
import FriendList from './FriendList';

const ChatRoom = () => {

  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState({
    chatContent: {},
    users: [],
    messages: []
  });

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectEdit, setSelectEdit] = useState(false);
  const [updateChat, setUpdateChat] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const [displayAddFriends, setDisplayAddFriends] = useState(false);
  const [loadingChatRoom, setLoadingChatRoom] = useState(false);

  const {userId, hideChatPage, setHideChatPage, messageTab, setMessageTab} = useContext(Context);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const {id} = useParams();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await message_api.post('/create', {
        description: newMessage,
        chat_id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setLoading(false);
        setNewMessage('');
        setUpdateChat(!updateChat);
      })
    } catch (err) {
      console.log(err);
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let hourString;
    if (hours === 0) {
      hourString = '12';
    } else if (hours > 12) {
      hourString = String(hours - 12);
    } else {
      hourString = String(hours);
    }

    const ampm = hours < 12 ? 'AM' : 'PM';
    const timeString = `${hourString}:${String(minutes).padStart(2, '0')} ${ampm}`;

    return timeString;
  }

  const handleMessageOptions = (userId_, index, messageDescription, e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;
    if (userId_ === userId) {
      setSelectedIndex(index);
      setMessageTab(true);
      setEditedMessage(messageDescription);
    }
  }

  const handleMessageDelete = async (message_id) => {
    setLoading(true);
    try {
      await message_api.delete(`/${message_id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setMessageTab(false);
        setLoading(false);
        setUpdateChat(!updateChat);
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = async (message_id) => {
    setLoading(true);
    try {
      await message_api.put(`/${message_id}/update`, { description: editedMessage }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setSelectEdit(false);
        setMessageTab(false);
        setLoading(false);
        setUpdateChat(!updateChat);
      })
    } catch (err) {
      console.log(err);
    }
  }

  const fetchChat = async () => {
    setLoadingChatRoom(true);
    try {
      await chat_api.get(`/${id}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        if (response.status === 200) {
          setChat({
            messages: response.data.chat.messages,
            users: response.data.chat.users,
            chatContent: {
              id: response.data.chat.id,
              name: response.data.chat.name,
              createdAt: response.data.chat.createdAt,
              updatedAt: response.data.chat.updatedAt,
              isgroupchat: response.data.chat.isgroupchat
            }
          });
          setLoadingChatRoom(false);
        }
      })

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchChat();
  }, [id, updateChat]);

  if(loadingChatRoom) {
    return (
          <div className='flex items-center justify-center w-full h-screen bg-gradient-to-br from-[#0f1923] to-[#1c2831]'>
            <Loader description={`Loading Chat`}/>
          </div>
      )
  }

  return (
    <div className={`${!hideChatPage && 'max-md:hidden'} max-md:w-full w-[75%] bg-gradient-to-br from-[#0f1923] to-[#1c2831] text-white p-4 max-md:p-2 flex flex-col overflow-y-scroll overflow-x-hidden`}>
      {
        loadingChatRoom && <Loader description={`Loading Chat`} />
      }
      {displayAddFriends && <FriendList user_id={userId} />}

      <div className="bg-gradient-to-r overflow-y-scroll overflow-x-hidden from-[#1a2a3a] to-[#0f1923] p-4 max-md:p-2 rounded-t-2xl flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3a7bd5] to-[#00d2ff] flex items-center justify-center text-2xl max-md:text-lg font-bold">
          {chat?.chatContent?.name?.charAt(0)}{chat?.chatContent?.name?.charAt(1)}
        </div>
        <div className="flex-grow">
        {loading && <Loader description={`Sending`}/>}
          <h1 className="text-2xl max-md:text-lg font-bold">{chat?.chatContent?.name}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            {chat?.users && chat?.users?.slice(0, 3).map((user, index) => (
              <span key={user.id} className='text-sm whitespace-nowrap'>{user.displayName}{index >= chat?.users.length - 1 ? '' : ','}</span>
            ))}
            {chat?.users?.length > 3 && <span>...</span>}
          </div>
        </div>
        <i className='bx bx-arrow-back md:hidden cursor-pointer' onClick={() => {setHideChatPage(!hideChatPage)}}></i>
        {(chat?.chatContent?.isgroupchat && chat?.chatContent.name !== 'Global Chat') && (
          <button className='px-10 py-2 max-md:px-3 max-md:py-1 bg-gradient-to-r from-sky-600 to-sky-300 rounded-lg font-bold text-sm' onClick={() => setDisplayAddFriends(true)}>
            +
          </button>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {chat?.messages.map((message, index) => (
          <div
            key={message.id}
            onClick={(e) => handleMessageOptions(message.userId, index, message.description, e)}
            className={`relative flex ${message.userId === userId ? 'justify-end' : 'justify-start'} cursor-pointer max-md:text-sm`}
          >
            {(messageTab && selectedIndex === index) && (
              <div className='absolute -bottom-10 right-50'>
                <MessageActionTab onEdit={(e) => { setSelectEdit(true); e.stopPropagation(); }} onDelete={() => handleMessageDelete(message.id)} cancel={() => {setMessageTab(false)}} />
              </div>
            )}
            <div className={`max-w-[70%] p-3 rounded-2xl ${message.userId === userId ? 'bg-gradient-to-r from-[#3a7bd5] to-[#0384a1] text-white' : 'bg-gradient-to-r from-[#2a3f55] to-[#1c2831] text-gray-200'}`}>
              {selectEdit && (selectedIndex === index) ? (
                <form onSubmit={(e) => { e.preventDefault(); handleEdit(message.id); }}>
                  <input
                    value={editedMessage}
                    type='text'
                    className='text-white bg-transparent outline-none border border-white rounded-lg'
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                  <button type='submit' className='hidden'></button>
                </form>
              ) : (
                <div className='flex flex-col'>
                  {message.userId !== userId && <p className='text-[0.7rem] text-sky-600'>{message.user.displayName}</p>}
                  <div className='flex items-center'>
                    <p>{message.description}</p>
                    <p className='ml-6 text-[0.7rem]'>{formatTime(message.createdAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="mt-4 flex md:space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          required
          className="flex-grow px-4 py-2 max-md:px-2 max-md:py-1 max-md:text-sm bg-[#0f1923] border border-[#3a7bd5] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d2ff] transition-all duration-300"
        />
        <button
          type="submit"
          className="px-6 py-2 max-md:px-3 max-md:py-1 max-md:rounded-lg bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] text-white rounded-full text-sm font-medium hover:from-[#00d2ff] hover:to-[#3a7bd5] transition-all duration-300 transform hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatRoom;
