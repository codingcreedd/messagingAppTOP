import axios from 'axios';

export default axios.create({
    baseURL: '/messages',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
});