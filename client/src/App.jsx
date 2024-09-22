import { useContext, useState } from 'react'
import Logs from './routes/Logs';
import { Context } from './components/ContextProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';

function App() {

  const {authState} = useContext(Context);

  const navigate = useNavigate();

  if(!authState){
    navigate('/logs/login');
  }

  return (
    <div className='flex'>
      <Nav />
      <Outlet />
    </div>
  )
}

export default App
