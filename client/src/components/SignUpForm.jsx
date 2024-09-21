import React, { useContext, useState } from 'react'
import { Context } from './ContextProvider';
import { Link } from 'react-router-dom';

const SignUpForm = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp} = useContext(Context);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Sign Up</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={fullName}
                  onChange={(e) => {setFullName(e.target.value)}}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
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
                  name="password"
                  required
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSignUp}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300" onClick={() => {signUp(false)}}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      )
}

export default SignUpForm