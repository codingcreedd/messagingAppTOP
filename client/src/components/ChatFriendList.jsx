import React, { useEffect, useState } from 'react'
import chat_api from '../apis/chats'
import Chat from './Chat'

const ChatFriendList = ({friend_id}) => {

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
    <div className='flex flex-col justify-center items-center w-full h-[50%] bg-gray-500 absolute -bottom-10'>

        <h1 className='text-center font-bold text-3xl mb-4 text-sky-900'>Your Friends</h1>
        {
            chats?.length >= 1 ? (
                <div className='flex flex-col rounded-xl shadow-2xl px-10 py-10 bg-sky-800 max-h-[300px] overflow-scroll'>
                    {
                        chats.map(chat => (
                            <Chat global={false} isGroupChat={false} name={chat?.name} id={chat?.id} />
                        ))
                    }
                </div>
            ) : (<p className='mt-10 font-bold text-sm'>You have no chats with this friend, go back and add a chat</p>)
        }
    </div>
  )
}

export default ChatFriendList