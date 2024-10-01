import axios from 'axios';

axios.interceptors.request.use(
    function (config) {
        config.baseURL = 'http://localhost:4000/api/';
        const login = window.sessionStorage.getItem('login');
        if (login && login === 'true') {
            config.headers['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('token');
        }
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

export default axios;