import React, { useContext, useEffect, useState } from 'react'
import chat_api from '../apis/chats'
import user_api from '../apis/user'
import { Context } from './ContextProvider'
import { useNavigate } from 'react-router-dom'

export default function AddChat() {
  const [name, setName] = useState('')
  const [isGroupChat, setIsGroupChat] = useState(false)
  const [selectedContacts, setSelectedContacts] = useState([])
  const [firstMessage, setFirstMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState('Select Contact');
  const [selectedContactId, setSelectedContactId] = useState(0);

  const navigate = useNavigate();
  const {friends, setFriends, userId} = useContext(Context);

  useEffect(() => {
    const fetchUserInfo = async () => {
        await user_api.get(`/${userId}/friends`)
        .then(response => {
            if(response.data.userFriendsInfo){
                setFriends(response.data.userFriendsInfo.friends);
            } 
        })
    }

    fetchUserInfo();

}, [])

  const addChat = async (e) => {
    e.preventDefault()
    try {
        await chat_api.post('/add', {
            name,
            isGroupChat,
            firstMessage,
            user_id: userId,
            contact_id: selectedContactId
        }).then(response  => {
            navigate(0);
        })
    } catch(err) {
        console.log(err);
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#11171f] text-white p-4">
      <form onSubmit={addChat} className="w-full max-w-md bg-[#1c2531] p-8 rounded-2xl shadow-2xl space-y-6 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">New Chat</h2>
        
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 text-white"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isGroupChat"
            checked={isGroupChat}
            onChange={(e) => setIsGroupChat(e.target.checked)}
            className="w-5 h-5 rounded text-white bg-[#2a3441] border-white focus:ring-white focus:ring-offset-0 focus:ring-2 transition-all duration-300"
          />
          <label htmlFor="isGroupChat" className="text-sm font-medium">Group Chat</label>
        </div>

        <div className="space-y-2">
          <label htmlFor="contacts" className="block text-sm font-medium text-white">Select Contact</label>
          <select
            id="contacts"
            name='contacts'
            value={selectedContact}
            onChange={(e) => {setSelectedContact(e.target.value)}}
            className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 text-white"
          >
            <option disabled>Select Contact</option>
            {
                friends.map(friend => (
                    <option key={friend.id} value={friend.displayName} onClick={() => {setSelectedContact(friend.displayName);
                    setSelectedContactId(friend.id) }}>
                        {friend.displayName}
                    </option>
                ))
            }
            
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="firstMessage" className="block text-sm font-medium text-white">First Message</label>
          <textarea
            id="firstMessage"
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 resize-none h-24 text-white"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-white text-[#11171f] rounded-md font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1c2531] transition-all duration-300 transform hover:scale-105"
        >
          Start Chat
        </button>
      </form>
    </div>
  )
}