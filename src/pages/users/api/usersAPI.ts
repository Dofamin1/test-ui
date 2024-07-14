import axios from 'axios';
import config from "../../../../config";
import type { UserCreateData, UserData, UserUpdateData } from './interfaces';

const usersApi = {
  createUser: async (userData: UserCreateData): Promise<UserData> => {
    try {
      const response = await axios.post(`${config.API_URL}/user`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },

  updateUser: async (userId: number, userData: UserUpdateData): Promise<UserData>  => {
    try {
      const response = await axios.put(`${config.API_URL}/user/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },

  getUsers: async (): Promise<UserData[]> => {
    try {
      const response = await axios.get(config.API_URL + '/user');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      await axios.delete(`${config.API_URL}/user/${userId}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  deleteAllUsers: async (): Promise<void> => {
    try {
      await axios.delete(`${config.API_URL}/user`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  }
};

export default usersApi;
