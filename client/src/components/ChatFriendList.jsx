import React, { useEffect, useState } from 'react'
import chat_api from '../apis/chats'
import Chat from './Chat'
import Loader from './Loader';

const ChatFriendList = ({friend_id, onClick_}) => {

    const [chats, setChats] = useState(false);

    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            await chat_api.get(`/${friend_id}/get-chats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setLoading(false);
                setChats(response.data.chats);
            })
        }

        fetchChats();
    }, [])

    return (
        <div className="absolute -bottom-full left-0 w-full min-h-[250px] bg-gradient-to-b from-sky-700 to-sky-900 rounded-t-xl shadow-lg transition-all duration-300 ease-in-out z-10">
          <div className="flex flex-col items-center justify-between h-full p-6 space-y-6">
            <button
              className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-colors duration-200 shadow-md"
              onClick={onClick_}
            >
              Cancel
            </button>
    
            <h1 className="text-2xl font-bold text-sky-100">Chats with this friend</h1>
    
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader className="w-6 h-6 text-sky-300 animate-spin" description={`Loading Chats`}/>
                <span className="text-sky-300">Loading chats</span>
              </div>
            ) : chats?.length >= 1 ? (
              <div className="w-full max-h-[300px] overflow-y-auto bg-sky-800 rounded-xl shadow-inner p-4 space-y-2">
                {chats.map((chat) => (
                  <Chat key={chat.id} global={false} isGroupChat={false} name={chat.name} id={chat.id} />
                ))}
              </div>
            ) : (
              <p className="text-sky-300 font-medium text-center">
                You have no chats with this friend, go back and add a chat
              </p>
            )}
          </div>
        </div>
    )
}

export default ChatFriendList