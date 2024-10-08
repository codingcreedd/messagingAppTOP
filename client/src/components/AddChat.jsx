import React, { useContext, useEffect, useState } from 'react';
import chat_api from '../apis/chats';
import user_api from '../apis/user';
import { Context } from './ContextProvider';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import PopUpMessage from './PopUpMessage';

export default function AddChat({ onClick_ }) {
  const [name, setName] = useState('');
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [firstMessage, setFirstMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState('Select Contact');
  const [selectedContactId, setSelectedContactId] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const { friends, setFriends, userId } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [popup, setPopUp] = useState({
    render: false,
    message: '',
    status: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log('Your token: ' + token);
      await user_api
        .get(`/${userId}/friends`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.userFriendsInfo) {
            setFriends(response.data.userFriendsInfo.friends);
          }
        });
    };

    fetchUserInfo();
  }, []);

  const addChat = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await chat_api
        .post(
          '/add',
          {
            name,
            isGroupChat,
            firstMessage,
            contact_id: selectedContactId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          setPopUp({
            render: true,
            message: response.data.message,
            status: response.data.status,
          });

          setTimeout(() => {
            setPopUp({ render: false, message: '', status: '' });
            navigate(0);
          }, 300);
        });
    } catch (err) {
      setLoading(false);
      setPopUp({ render: true, message: 'Could not add chat', status: 'failure' });
    }
  };

  const handleSelectContact = (friend) => {
    setSelectedContact(friend.displayName);
    setSelectedContactId(friend.id);
    setShowDropdown(false);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#11171f] text-white p-4">
      {loading && <Loader description="Adding Chat" />}

      {popup.render && <PopUpMessage status={popup.status} message={popup.message} />}

      <form onSubmit={addChat} className="w-full max-w-md bg-[#1c2531] p-8 rounded-2xl shadow-2xl space-y-6 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">New Chat</h2>

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 text-white"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isGroupChat"
            checked={isGroupChat}
            onChange={(e) => setIsGroupChat(e.target.checked)}
            className="w-5 h-5 rounded text-white bg-[#2a3441] border-white focus:ring-white focus:ring-offset-0 focus:ring-2 transition-all duration-300"
          />
          <label htmlFor="isGroupChat" className="text-sm font-medium">Group Chat</label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Select Contact</label>
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full px-4 py-2 bg-[#2a3441] rounded-md border border-white cursor-pointer"
            >
              {selectedContact}
            </div>

            {showDropdown && (
              <div className="absolute w-full mt-2 bg-[#2a3441] rounded-md shadow-lg">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    onClick={() => handleSelectContact(friend)}
                    className="px-4 py-2 hover:bg-[#3a4b5a] cursor-pointer"
                  >
                    {friend.displayName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="firstMessage" className="block text-sm font-medium text-white">First Message</label>
          <textarea
            id="firstMessage"
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2a3441] border border-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 resize-none h-24 text-white"
            required
          ></textarea>
        </div>

        <div className='flex items-center w-full'>
          <button onClick={onClick_} className='w-[45%] py-3 px-4 bg-red-600 text-white rounded-md font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1c2531] transition-all duration-300 transform hover:scale-105'>
            Cancel
          </button>
          <button
            type="submit"
            className="w-[45%] py-3 px-4 ml-auto bg-white text-[#11171f] rounded-md font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1c2531] transition-all duration-300 transform hover:scale-105"
          >
            Start Chat
          </button>
        </div>
      </form>
    </div>
  );
}
