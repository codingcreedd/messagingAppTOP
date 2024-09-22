import React, { useState } from 'react'
import { navHeaders } from '../tools/nav'

const Nav = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className='flex flex-col py-10 bg-gray-800 w-[15%] h-screen'>
            <div>
                <img src="" alt="" />
            </div>

            <div className='flex flex-col gap-5 text-white'>
                {
                    navHeaders.map((header, index) => (
                        <div 
                            key={header.index}
                            className={`flex gap-5 items-center py-3 cursor-pointer ${selectedIndex === index && 'border-r-[0.3rem]'} rounded-sm border-r-sky-600 w-full`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <i className={`${header.iconClass} text-lg pl-10`}></i>
                            <p className={`${selectedIndex === index ? 'text-sky-600 font-bold' : ''} text-lg`}>{header.title}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Nav
