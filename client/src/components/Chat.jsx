import React, { useState } from 'react'

const Chat = ({icon, global}) => {

  return (
    <div onClick={() => {setClick(true)}} className={`flex gap-5 items-center px-10 py-2 ${global && 'mt-10 bg-[#2e3e52] rounded-xl'} cursor-pointer`}>
        <div>
            {
                icon ? (
                    <i className={icon}></i>
                ) : (
                    <div className='w-[2rem] h-[2rem] rounded-full bg-white'></div>
                )
            }
        </div>

        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <h1 className='text-white text-sm font-bold'>Global Chat</h1>
                <p className='text-[0.6rem] text-gray-400'>1 min ago</p>
            </div>
            <p className='text-[0.7rem] font-bold text-sky-600 whitespace-nowrap'>Last message sent to the group</p>
        </div>

    </div>
  )
}

export default Chat