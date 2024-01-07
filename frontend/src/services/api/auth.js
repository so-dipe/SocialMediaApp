import axios from 'axios';
import { BaseUrl } from '../../config';

export const signup = async (username, password) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/v1/auth/signup`, { username, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
export const login = async (username, password) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/v1/auth/login`, { username, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };