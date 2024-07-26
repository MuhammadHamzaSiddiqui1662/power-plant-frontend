import { api } from "../config/axios";
import { ChatData } from "../types/chat";

export const getAllChat = async (data: ChatData) => {
    try {
        const response = await api.get(`/chats/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getChatById = async (id: string) => {
    try {
        const response = await api.get(`/chats/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createChat = async (data: ChatData) => {
    try {
        const response = await api.post(`/messages/`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};