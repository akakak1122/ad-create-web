import axios from 'axios';

export const api = () => {
  return axios.create({
    baseURL: 'http://13.124.218.201/api',
    headers: {
      "Content-type": "application/json",
      "access_token": localStorage.getItem('token'),
    },
  });
}
