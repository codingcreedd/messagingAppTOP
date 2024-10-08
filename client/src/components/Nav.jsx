import React, { useContext, useState } from 'react'
import { navHeaders } from '../tools/nav'
import { Link, replace, useNavigate } from 'react-router-dom';
import { Context } from './ContextProvider';

const Nav = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const {userId, hideChatPage, setHideChatPage} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        navigate('/logs/login', {replace: true});
    }

    return (
        <div className='flex max-md:justify-between md:flex-col md:pb-10 bg-[#2b2b2c] md:w-[18%] max-md:px-3 max-md:py-1 md:h-screen max-md:w-full max-md:items-center max-md:text-sm'>
            <div className='md:hidden'>
                <Link to={`/${userId}/profile`} className='px-5 rounded-xl max-md:rounded-lg text-white py-2 bg-gradient-to-r from-sky-600 to-sky-800 max-md:text-sm max-md:py-1 max-md:px-3'>Profile</Link>
            </div>

            <div className='flex md:flex-col gap-5 text-white mt-10'>
                {
                    navHeaders.map((header, index) => (
                        <div 
                            key={header.index}
                            className={`flex max-md:flex-col gap-2 md:px-10 max-md:gap-1 items-center max-md:justify-center py-3 cursor-pointer ${selectedIndex === index && 'md:border-r-[0.3rem]'} rounded-sm border-r-sky-600 md:w-full`}
                            onClick={() => {setSelectedIndex(index); if(header?.title){setHideChatPage(false)} navigate(`${header?.path}`)}}
                        >
                            <i className={`${header.iconClass} text-xl`}></i>
                            <p className={`${selectedIndex === index ? 'text-sky-600 font-bold' : ''} max-md:text-center`}>{header.title}</p>
                        </div>
                    ))
                }
            </div>


            <div className='flex max-md:flex-col items-center gap-10 max-md:gap-3 text-white md:mt-auto px-10 max-md:px-3'>
                <button onClick={logOut} className='px-5 py-2 bg-gradient-to-r from-sky-600 to-sky-800 rounded-xl max-md:rounded-lg max-md:text-sm max-md:py-1 max-md:px-3'>Logout</button>
                <Link to={`/${userId}/profile`} className='px-5 max-md:hidden rounded-xl max-md:rounded-lg text-white py-2 bg-gradient-to-r from-sky-600 to-sky-800 max-md:text-sm max-md:py-1 max-md:px-3'>Profile</Link>
            </div>

        </div>
    )
}

export default Nav
