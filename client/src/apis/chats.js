import axios from 'axios';

export default axios.create({
    baseURL: 'https://messagingapptop.onrender.com/chats',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
})