import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../components/ContextProvider';
import user_api from '../apis/user'

const ProtectedRoute = ({ children }) => {
  const { authState, setAuthState, setUserId } = useContext(Context);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const verification = async () => {
      await user_api.get('/protected').then(response => {
        console.log('Authenticated: ' + response.data.authenticated)
        if(response.data.authenticated){
          setAuthState(true);
          setUserId(response.data.user.id);
        } else {
          navigate('/logs/login', { replace: true }); 
          setAuthState(false);
        }
      })
    }

    verification();
  }, [])

  return authState ? children : navigate('/logs/login'); 
};

export default ProtectedRoute;
