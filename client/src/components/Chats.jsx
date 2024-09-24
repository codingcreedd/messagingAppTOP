import React, { useContext, useEffect, useState } from 'react'
import { Context } from './ContextProvider'
import Chat from './Chat';
import chats_api from '../apis/chats';

const Chats = () => {
    const {chats, setChats, userId} = useContext(Context);

    const [addChat, setAddChat] = useState(false);
    
    // useEffect(() => {
    //     const fetchChats = async () => {
    //         console.log(userId);
            
    //     }

    //     fetchChats();

    // }, [])

    const addChatFun = () => {

    }


  return (
    <div className='flex flex-col w-[22%] bg-[#1E2732] px-12 py-10'>
        <h1 className='text-white text-xl font-bold mb-10'>Messages</h1>
        <div className='flex gap-8 bg-[#1e1f26] pl-5 pr-10 py-2 rounded-lg items-center overflow-hidden'>
            <i className='bx bx-search-alt-2 text-white'></i>
            <input type="text" placeholder='Search' className='bg-transparent text-white placeholder:text-white outline-none' />
        </div>
        
        <Chat icon="bx bx-globe text-[3rem] text-white" global={true} />

        <div className='flex items-center gap-5 text-white mt-10 cursor-pointer'>
            <div className='text-xl'><i className='bx bx-plus' ></i></div>
            <p onClick={addChatFun}>Add Chat</p>
        </div>

        <div className='flex flex-col mt-10'>
            {
                (chats && chats.length > 0) ? (
                    chats.map(chat => (
                        <div key={chat.id}>
                            <Chat />
                        </div>
                    ))
                ) : (
                    <div className='text-white font-bold text-lg'>
                        You have no chats yet
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default Chats