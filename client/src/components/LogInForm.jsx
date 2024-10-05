import React, { useContext, useState } from 'react'
import { Context } from './ContextProvider'
import {Link, useNavigate} from 'react-router-dom'
import user_api from '../apis/user'
import Loader from './Loader'
import PopUpMessage from './PopUpMessage'

const LogInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setSignUp, setAuthState} = useContext(Context);

    const [loading, setLoading] = useState(false);
    const [popup, setPopUp] = useState({
      render: false,
      message: '',
      status: ''
    });

    const navigate = useNavigate();

    const logIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await user_api.post('/login', {
                email,
                pw: password
            }).then(response => {
                setPopUp({render: true, message: response.data.message, status: response.data.status});
                if(response.data.message === 'Login successful'){
                    localStorage.setItem("token", response.data.token);
                    setTimeout(() => {
                      setLoading(false);
                      setPopUp({render: false, ...popup})
                      setAuthState(true);
                      navigate('/', {replace: true});
                    }, 300)
                } else {
                  setLoading(false);
                  setAuthState(false);
                }
            })
        } catch(err) {
            // console.log(err);
            setLoading(false);
            setPopUp({render: true, message: 'Failed to Login', status: 'failure'});
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          {
            loading && <Loader description={`Logging In`}/>
          }

          {
            popup.render && <PopUpMessage status={popup.status} message={popup.message}/>
          }
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Log In</h2>
            <form className="space-y-6" onSubmit={logIn}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="pw"
                  required
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Log In
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/logs/signup" className="font-medium text-blue-400 hover:text-blue-300" onClick={() => {setSignUp(true)}}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )
}

export default LogInForm