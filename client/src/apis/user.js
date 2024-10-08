import axios from 'axios'
// https://messagingapptop.onrender.com
export default axios.create({
    baseURL: 'http://localhost:3001/user',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
});