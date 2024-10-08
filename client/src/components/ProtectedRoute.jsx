import { useContext, useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../components/ContextProvider';
import user_api from '../apis/user'
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { authState, setAuthState, setUserId } = useContext(Context);

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const verification = async () => {
      setLoading(true);

      await user_api.get('/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log('Authenticated: ' + response.data.authenticated)
        setLoading(false);
        if(response.data.authenticated){
          setAuthState(true);
          setUserId(response.data.user.id);
        } else {
          setAuthState(false);
        }
      })
    }

    verification();
  }, [])

  if(loading) {
    return <Loader description={`This could take some time (free tier)...`}/>
  }

  return authState ? children : navigate('/logs/login', {replace: true}); 
};

export default ProtectedRoute;
