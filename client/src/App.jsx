import { useContext, useState } from 'react'
import Logs from './routes/Logs';
import { Context } from './components/ContextProvider';
import { useNavigate } from 'react-router-dom';

function App() {

  const {authState} = useContext(Context);

  const navigate = useNavigate();

  if(!authState){
    navigate('/logs/login');
  }

  return (
    <div>
    
    </div>
  )
}

export default App
