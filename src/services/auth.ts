import { api } from "../config/axios";

export const signUp = async (email: string, password: string) => {
  try {
    const response = await api.post(`/signup`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post(`/signin`, { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
