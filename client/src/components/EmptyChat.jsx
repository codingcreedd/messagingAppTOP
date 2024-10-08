import React from 'react'

const EmptyChat = () => {
  return (
    <div className='flex max-md:hidden justify-center items-center w-[75%] bg-gradient-to-br from-[#0f1923] to-[#1c2831]'>
        <div className='flex flex-col text-white font-bold'>
            <h1 className='text-7xl'>What's Up</h1>
            <p className='text-3xl'>Click on a chat to start sending messages!</p>
        </div>
    </div>
  )
}

export default EmptyChat