import React, { useEffect, useState } from 'react'
import chat_api from '../apis/chats'

const ChatFriendList = ({friend_id}) => {

    const [chats, setChats] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchChats = async () => {
            await chat_api.get(`/${friend_id}/get-chats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

        fetchChats();
    }, [])

  return (
    <div className='flex flex-col justify-center items-center w-full h-[50%] bg-gray-500'>
        <h1 className='text-center font-bold text-3xl mb-4 text-sky-900'>Your Friends</h1>
        {
            friends.length >= 1 ? (
                <div className='flex flex-col rounded-xl shadow-2xl px-10 py-10 bg-sky-800 max-h-[300px] overflow-scroll'>
                    {
                        friends.map(friend => (
                            <div onClick={() => {addUser(friend.id)}} key={friend?.id} className='border border-white px-10 py-2 rounded-xl mb-2 cursor-pointer'>
                                {friend.displayName}
                            </div>
                        ))
                    }
                </div>
            ) : (<p className='mt-10 font-bold text-sm'>You have no chats with this friend, go back and add a chat</p>)
        }
    </div>
  )
}

export default ChatFriendList