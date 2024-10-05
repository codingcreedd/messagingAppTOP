import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../components/ContextProvider'
import user_api from '../apis/user'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

export default function Friends() {

    const {friends, setFriends, userId, friendOf, setFriendOf} = useContext(Context);
    const [newFriendEmail, setNewFriendEmail] = useState('');

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [messageFriend, setMessageFriend] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            await user_api.get(`/${userId}/friends`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(response => {
                if(response.data.userFriendsInfo){
                    setFriends(response.data.userFriendsInfo.friends);
                    setFriendOf(response.data.userFriendsInfo.friendsOf)
                } 
            })
        }

        fetchUserInfo();

    }, [])

    const handleAddFriend = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await user_api.post('/add-contact', {
                email: newFriendEmail,
                currentUserId: userId
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
        <div className="min-h-screen w-[82%] bg-gradient-to-br from-[#0f1923] to-[#1c2831] text-white p-8">
          {
            loading && <Loader />
          }
          <div className="mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">
              Your Friends
            </h1>
    
            <form onSubmit={handleAddFriend} className="mb-12 bg-gradient-to-r from-[#1a2a3a] to-[#0f1923] p-6 rounded-2xl shadow-lg max-w-[50%] mx-auto">
              <div className="flex items-center space-x-4">
                <input
                  type="email"
                  value={newFriendEmail}
                  onChange={(e) => setNewFriendEmail(e.target.value)}
                  placeholder="Enter contact's email"
                  className="flex-grow px-4 py-2 bg-[#0f1923] border border-[#3a7bd5] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d2ff] transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] text-white rounded-full text-sm font-medium hover:from-[#00d2ff] hover:to-[#3a7bd5] transition-all duration-300 transform hover:scale-105"
                >
                  Add Contact
                </button>
              </div>
            </form>
    
            {/* Friends List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-gradient-to-br from-[#1a2a3a] to-[#0f1923] rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#3a7bd5] to-[#00d2ff]">
                      {friend.profilePicture ? (
                        <img
                          src={friend.profilePicture}
                          alt={`${friend.name}'s profile`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                          {friend.displayName.charAt(0)}
                        </div>
                      )}
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${friend.isFriend ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{friend.displayName}</h2>
                      <p className="text-sm text-gray-300">{friend.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${friend.isFriend ? 'text-green-400' : 'text-gray-400'}`}>
                      {friendOf?.includes(friend.email) ? 'Friends' : 'Contact'}
                    </span>
                    <button onClick={() => {setMessageFriend(true)}} className="px-4 py-2 bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] text-white rounded-full text-sm font-medium hover:from-[#00d2ff] hover:to-[#3a7bd5] transition-all duration-300">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
}