import React from 'react'
import { Outlet } from 'react-router-dom';

const ChatRoomOutlet = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default ChatRoomOutlet;