import React, { useContext, useEffect, useState } from 'react'
import user_api from '../apis/user';
import chat_api from '../apis/chats'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from './ContextProvider';
import Loader from './Loader';

const FriendList = ({user_id}) => {

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addUserLoading, setAddUserLoading] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFriends = async () => {
            setLoading(true);
            try {
                await user_api.get(`/${user_id}/friends`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    setLoading(false);
                    setFriends(response.data.userFriendsInfo.friends);
                    console.log(response.data.userFriendsInfo.friends)
                });
                
            } catch(err) {
                console.log(err);
            }
        }

        fetchFriends();
    }, [])

    const addUser = async (userId) => {
        setAddUserLoading(true);
        try {
            await chat_api.put(`/${id}/add-user`, {user_id: userId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setAddUserLoading(false);
                navigate(0);
            })
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div className='flex flex-col justify-center items-center w-full h-[50%] bg-gray-500'>
        {
            loading && <Loader description={`Loading Friends`}/>
        }
        {
            addUserLoading && <Loader description={`Adding Friend`}/>
        }
        <h1 className='text-center font-bold text-3xl mb-4 text-sky-900'>Your Friends</h1>
        {
            friends.length >= 1 ? (
                <div className='flex flex-col rounded-xl shadow-2xl px-10 py-10 bg-sky-800 max-h-[300px] overflow-scroll'>
                    {
                        friends.map(friend => (
                            <div onClick={(e) => {e.preventDefault(); addUser(friend.id)}} key={friend?.id} className='border border-white px-10 py-2 rounded-xl mb-2 cursor-pointer'>
                                {friend.displayName}
                            </div>
                        ))
                    }
                </div>
            ) : (<p className='mt-10 font-bold text-sm'>You have no friends</p>)
        }
    </div>
  )
}

export default FriendList