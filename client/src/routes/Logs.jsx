import React, { useContext } from 'react'
import { Context } from '../components/ContextProvider'
import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';

const Logs = () => {

    const {signUp, setSignUp} = useContext(Context);

  return (
    <div>
        {
            signUp ? (
                <SignUpForm />
            ) : (
                <LogInForm />
            )
        }
    </div>
  )
}

export default Logs