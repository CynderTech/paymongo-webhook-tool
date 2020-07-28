import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.paymongo.com/v1'
});

export default client;
