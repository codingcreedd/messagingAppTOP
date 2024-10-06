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
    <div className='flex flex-col justify-center items-center w-full h-[50%] bg-gray-500 absolute -bottom-24 rounded-xl min-h-[250px] py-10 z-index'>
        {
            loading && <Loader description={`Loading chats`} />
        }
        <div className='flex flex-col items-center gap-10'>
            <button className='px-10 py-2 bg-gradient-to-r from-sky-600 to-sky-800 font-bold text-white text-sm'
            onClick={onClick_}>Cancel</button>
            <h1 className='text-center font-bold text-3xl mb-4 text-sky-900'>Chats with this friends</h1>
        </div>
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