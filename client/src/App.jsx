import { useContext, useState } from 'react'
import { Context } from './components/ContextProvider'
import Logs from './routes/Logs';

function App() {

  const {authState} = useContext(Context);

  if(!authState){
    return <Logs />
  }

  return (
    <div>
    
    </div>
  )
}

export default App
