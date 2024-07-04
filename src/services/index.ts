import axios from 'axios';

export const skrr = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});
