import axios from 'axios'

export default axios.create({
    baseURL: '/user',
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
});