import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from './ContextProvider';
import Chat from './Chat';
import chats_api from '../apis/chats';
import AddChat from './AddChat';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const Chats = () => {
    const container = useRef();
    const { chats, setChats, userId } = useContext(Context);
    const [addChat, setAddChat] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            const response = await chats_api.get('/');
            setChats(response.data.chats);
        };
        fetchChats();
    }, [userId, setChats]);

    useEffect(() => {
        if (addChat) {
            gsap.fromTo(
                '.chatContainer', 
                { x: -screen.width * 2, opacity: 0, display: "hidden"}, 
                { x: 0, opacity: 1, duration: 0.5, ease: "back.inOut", display: "block" } 
            );
        }
    }, [addChat]);

    return (
        <div className='flex flex-col w-[25%] bg-[#11171f] py-10 overflow-auto' ref={container}>
            <div className={`chatContainer absolute inset-0 hidden`}>
                {addChat && <AddChat />}
            </div>

            <h1 className='text-white text-xl font-bold mb-10 mx-12'>Messages</h1>
            <div className='flex gap-8 bg-[#1e1f26] pl-5 pr-10 py-2 mx-12 rounded-lg items-center overflow-hidden'>
                <i className='bx bx-search-alt-2 text-white'></i>
                <input type="text" placeholder='Search' className='bg-transparent text-white placeholder:text-white outline-none' />
            </div>
            
            <Chat icon="bx bx-globe text-[3rem] text-white" global={true} name="Global Chat" isGroupChat={TextTrackCueList} id={1} />

            <div className='flex items-center gap-5 text-white mt-10 mx-12 cursor-pointer'>
                <div className='text-xl'><i className='bx bx-plus'></i></div>
                <p onClick={() => { setAddChat(true); navigate('/', {replace: true}) }}>Add Chat</p>
            </div>

            <div className='flex flex-col mt-10'>
                { (chats && chats.length > 0) ? (
                    chats.map(chat => (
                        <div key={chat?.id}>
                            <Chat name={chat?.name} isGroupChat={chat?.isgroupchat} id={chat?.id}/>
                            <hr className='mt-3 mb-3 mx-10'/>
                        </div>
                    ))
                ) : (
                    <div className='text-white font-bold mx-12 text-lg'>
                        You have no chats yet
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chats;
