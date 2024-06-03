import { api } from "../config/axios";

export const signUp = async (email: string, password: string) => {
  try {
    const response = await api.post(`/auth/sign-up`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post(`/auth/sign-in`, { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
