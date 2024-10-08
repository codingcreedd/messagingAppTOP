import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/messages',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
});