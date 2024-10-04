import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import user_api from '../apis/user'
import { Context } from '../components/ContextProvider';
import Loader from '../components/Loader';
import PopUpMessage from '../components/PopUpMessage';

const Profile = () => {

    const {user_id} = useParams();
    const [userInfo, setUserInfo] = useState({});
    const {loading, setLoading, popup, setPopUp, token} = useContext(Context);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newDisplayName, setNewDisplayName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
           setLoading(true);
           try {
                await user_api.get(`/${user_id}/user-info`, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }).then(response => {
                    setLoading(false);
                    setUserInfo(response.data.user);
                })
           } catch(err) {
                console.log(err);
           }
        }

        fetchUser();
    }, []) //put user_id if changing the url didnt run the fetch function

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if(newPassword === confirmPassword) {
            setLoading(true);
            try {
                await user_api.put(`/${user_id}/password`, {
                    password: newPassword,
                    verifyOldPassword: oldPassword
                }, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }).then(response => {
                    setLoading(false);
                    setPopUp({render: true, message: response.data.message, status: response.data});

                    setTimeout(() => {
                        setPopUp({render: false, message: '', status: ''});
                        navigate(0);
                    }, 1500);

                })
            } catch(err) {
                console.log(err);
            }
        // } else if (newPassword === oldPassword) {
        //     setPopUp({render: true, message: 'Old password must be different than new password', status: 'failure'});
        //     setTimeout(() => {
        //         setPopUp({render: false, message: '', status: ''});
        //     }, 1500);
        } else {
            setPopUp({render: true, message: 'Passwords differ!', status: 'failure'});
            setTimeout(() => {
                setPopUp({render: false, message: '', status: ''});
            }, 1500);
        }
    }

    const handleNameChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await user_api.put(`/${user_id}/name`, {
                displayName: newDisplayName
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then(response => {
                setLoading(false);
                navigate(0);
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f1923] to-[#1c2831] text-white p-8">
            {
                loading && <Loader />
            }

            {
                popup.render && <PopUpMessage message={popup.message} status={popup.status} />
            }

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <header className="text-center">
              <div className='flex items-center gap-3 justify-center'>
                    <Link to={`/`} className='px-10 py-2 bg-gradient-to-r from-sky-600 to-sky-800 rounded-xl'>BACK</Link>
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff]">
                        Profile Settings
                    </h1>
              </div>
              <p className="text-gray-400">
                View your account information and change your password
              </p>
            </header>
    
            {/* User Information */}
            <section className="bg-gradient-to-r from-[#1a2a3a] to-[#0f1923] p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">Display Name</p>
                  <p className="text-lg">{userInfo.displayName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Email</p>
                  <p className="text-lg">{userInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Join Date</p>
                  <p className="text-lg">{userInfo.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">User ID</p>
                  <p className="text-lg">{userInfo.id}</p>
                </div>
              </div>
            </section>

            {/*Display Name Change Form*/}
            <section className="bg-gradient-to-r from-[#1a2a3a] to-[#0f1923] p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Change Display Name</h2>
              <form onSubmit={handleNameChange} className="space-y-4">
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    New Display Name
                  </label>
                  <input
                    type="text"
                    id="newdisplayname"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-[#3a7bd5] focus:outline-none focus:ring-2 focus:ring-[#00d2ff] transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] text-white rounded-md font-semibold hover:from-[#00d2ff] hover:to-[#3a7bd5] focus:outline-none focus:ring-2 focus:ring-[#00d2ff] focus:ring-offset-2 focus:ring-offset-[#1c2831] transition-all duration-300"
                >
                  Change Display Name
                </button>
              </form>
            </section>

    
            {/* Password Change Form */}
            <section className="bg-gradient-to-r from-[#1a2a3a] to-[#0f1923] p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-[#3a7bd5] focus:outline-none focus:ring-2 focus:ring-[#00d2ff] transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-[#3a7bd5] focus:outline-none focus:ring-2 focus:ring-[#00d2ff] transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-[#3a7bd5] focus:outline-none focus:ring-2 focus:ring-[#00d2ff] transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] text-white rounded-md font-semibold hover:from-[#00d2ff] hover:to-[#3a7bd5] focus:outline-none focus:ring-2 focus:ring-[#00d2ff] focus:ring-offset-2 focus:ring-offset-[#1c2831] transition-all duration-300"
                >
                  Change Password
                </button>
              </form>
            </section>
          </div>
        </div>
    )
}

export default Profile

