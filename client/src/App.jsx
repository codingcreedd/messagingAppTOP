import { useContext, useState } from 'react'
import Logs from './routes/Logs';
import { Context } from './components/ContextProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div className='flex h-screen w-full relative max-md:flex-col'>
      <Nav />
      <Outlet />
    </div>
  )
}

export default App
