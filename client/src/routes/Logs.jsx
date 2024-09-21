import React, { useContext } from 'react'
import { Context } from '../components/ContextProvider'
import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';
import { useParams } from 'react-router-dom';

const Logs = () => {

    const {signUp, setSignUp} = useContext(Context);
    
    const {logType} = useParams();

  return (
    <div>
        {
            signUp && logType === 'signup' ? (
                <SignUpForm />
            ) : (
                <LogInForm />
            )
        }
    </div>
  )
}

export default Logs