import React from 'react'
import { Outlet } from 'react-router-dom'
import Chats from '../components/Chats'

const ChatLayout = () => {
  return (
    <div className='flex w-[82%] max-md:w-full max-md:h-screen'>
        <Chats />
        <Outlet />
    </div>
  )
}

export default ChatLayout