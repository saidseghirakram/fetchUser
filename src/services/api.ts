import axios from 'axios';
import { User } from '../types';

const API_BASE_URL = 'https://random-data-api.com/api/users/random_user';

export const fetchRandomUser = async (): Promise<User> => {
  try {
    const response = await axios.get<User>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching random user:', error);
    throw error;
  }
};
