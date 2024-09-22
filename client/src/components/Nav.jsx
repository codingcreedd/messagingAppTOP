import React, { useState } from 'react'
import { navHeaders } from '../tools/nav'

const Nav = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className='flex flex-col pb-10 bg-[#1e1f26] w-[18%] h-screen'>
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
                            onClick={() => setSelectedIndex(index)}
                        >
                            <i className={`${header.iconClass} text-xl pl-10`}></i>
                            <p className={`${selectedIndex === index ? 'text-sky-600 font-bold' : ''}`}>{header.title}</p>
                        </div>
                    ))
                }
            </div>

            

        </div>
    )
}

export default Nav
