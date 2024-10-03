import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../components/ContextProvider';
import user_api from '../apis/user'
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { authState, setAuthState, setUserId, loading, setLoading } = useContext(Context);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const verification = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

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
          navigate('/logs/login', { replace: true }); 
          setAuthState(false);
        }
      })
    }

    verification();
  }, [])

  if(loading) {
    return <Loader />
  }

  return authState ? children : navigate('/logs/login'); 
};

export default ProtectedRoute;
