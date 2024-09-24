import {createContext, useEffect, useLayoutEffect, useState} from 'react'
import user_api from '../apis/user'

export const Context = createContext(null);

const ContextProvider = ({children}) => {
    const [authState, setAuthState] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(0);

    const states = {
        authState, setAuthState,
        signUp, setSignUp,
        chats, setChats,
        userId, setUserId
    }

  return (
    <Context.Provider value={states}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider