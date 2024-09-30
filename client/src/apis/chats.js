import axios from 'axios';

export default axios.create({
    baseURL: '/chats',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
})