import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Chat = ({icon, global, name, isGroupChat, id}) => {

    const navigate = useNavigate();

  return (
    <Link to={`/${id}/chat`} className={`mx-3 flex gap-5 items-center px-10 py-2 ${global && 'mt-10 bg-[#17304e] rounded-xl'} cursor-pointer`}>
        <div>
            {
                icon ? (
                    <i className={icon}></i>
                ) : (
                    <div className='w-[2rem] h-[2rem] rounded-full bg-white'>{}</div>
                )
            }
        </div>

        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <h1 className='text-white text-sm font-bold'>{name}</h1>
                <p className='text-[0.6rem] text-gray-400'>
                    {
                        isGroupChat ? 'Group Chat' : 'Chat'
                    }
                </p>
            </div>
            <p className='text-[0.7rem] font-bold text-sky-600 whitespace-nowrap'>Last message sent to the group</p>
        </div>

    </Link>
  )
}

export default Chat