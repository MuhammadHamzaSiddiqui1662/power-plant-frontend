import { api } from "../config/axios";
import { SignUpData } from "../types/auth";

export const signUp = async (data: SignUpData) => {
  try {
    const response = await api.post(`/auth/sign-up`, data);
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
