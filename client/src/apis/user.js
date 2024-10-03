import axios from 'axios'
// https://messagingapptop.onrender.com
export default axios.create({
    baseURL: 'https://messagingapptop.onrender.com/user',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
});