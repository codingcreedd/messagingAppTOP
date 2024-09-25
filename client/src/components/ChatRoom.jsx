import React, { useState } from 'react'

const ChatRoom = () => {

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {

  }

  return (
    <div className="min-h-screen w-[75%] bg-gradient-to-br from-[#0f1923] to-[#1c2831] text-white p-4 flex flex-col">
      
      <div className="bg-gradient-to-r from-[#1a2a3a] to-[#0f1923] p-4 rounded-t-2xl flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3a7bd5] to-[#00d2ff] flex items-center justify-center text-2xl font-bold">
          CR
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">Chat Room</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <span>Users:</span>
            {/* {chatUsers && chatUsers?.slice(0, 3).map(user => (
              <span key={user.id}>{user.name}</span>
            ))}
            {chatUsers?.length > 3 && <span>...</span>} */}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {/* {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl ${
                message.isCurrentUser
                  ? 'bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] text-white'
                  : 'bg-gradient-to-r from-[#2a3f55] to-[#1c2831] text-gray-200'
              }`}
            >
              {!message.isCurrentUser && (
                <div className="font-semibold text-sm mb-1">{message.sender}</div>
              )}
              <p>{message.content}</p>
            </div>
          </div>
        ))} */}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 bg-[#0f1923] border border-[#3a7bd5] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d2ff] transition-all duration-300"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] text-white rounded-full text-sm font-medium hover:from-[#00d2ff] hover:to-[#3a7bd5] transition-all duration-300 transform hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatRoom