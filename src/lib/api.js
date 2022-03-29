import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.SERVER_URL || 'localhost:3000',
  headers: {
    "Content-type": "application/json"
  },
});
