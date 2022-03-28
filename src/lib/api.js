import axios from 'axios';

export const api = axios.create({
  //baseURL: 'localhost:3000',
  baseURL: 'http://13.124.218.201:3000',
  headers: {
    "Content-type": "application/json"
  },
});
