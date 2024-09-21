import {Children, createContext, useState} from 'react'

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [signUp, setSignUp] = useState(false);

    const states = {

    }

  return (
    <Context.Provider>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider