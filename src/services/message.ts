import { api } from "../config/axios";
import { MessageData } from "../types/message";



export const sendMessage = async (data: MessageData) => {
    try {
        const response = await api.post(`/messages/`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};



