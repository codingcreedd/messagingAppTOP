import React, { useContext, useState } from 'react'
import { navHeaders } from '../tools/nav'
import { Link, useNavigate } from 'react-router-dom';
import user_api from '../apis/user';
import { Context } from './ContextProvider';

const Nav = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            const response = await user_api.get('/logout');
            if (response.status === 200) {
                navigate('/logs/login', {replace: true});
            } else {
                console.log('Logout failed');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col pb-10 bg-[#2b2b2c] w-[18%] h-screen'>
            <div>
                <img src="" alt="" />
                <h1 className='text-sky-600 px-10 py-10 font-bold text-xl'>WD</h1>
            </div>

            <div className='flex flex-col gap-5 text-white'>
                {
                    navHeaders.map((header, index) => (
                        <div 
                            key={header.index}
                            className={`flex gap-5 items-center py-3 cursor-pointer ${selectedIndex === index && 'border-r-[0.3rem]'} rounded-sm border-r-sky-600 w-full`}
                            onClick={() => {setSelectedIndex(index); navigate(`${header?.path}`)}}
                        >
                            <i className={`${header.iconClass} text-xl pl-10`}></i>
                            <p className={`${selectedIndex === index ? 'text-sky-600 font-bold' : ''}`}>{header.title}</p>
                        </div>
                    ))
                }
            </div>

            <div onClick={logOut}>Logout</div>

        </div>
    )
}

export default Nav
