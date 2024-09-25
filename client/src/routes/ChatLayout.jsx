import React from 'react'
import { Outlet } from 'react-router-dom'
import Chats from '../components/Chats'

const ChatLayout = () => {
  return (
    <div className='flex w-[82%]'>
        <Chats />
        <Outlet />
    </div>
  )
}

export default ChatLayout