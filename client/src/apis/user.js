import axios from 'axios'

export default axios.create({
    baseURL: 'https://messagingapptop.onrender.com/user',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
});