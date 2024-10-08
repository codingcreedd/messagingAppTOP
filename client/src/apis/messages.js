import axios from 'axios';

export default axios.create({
    baseURL: 'https://messagingapptop.onrender.com/messages',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
});