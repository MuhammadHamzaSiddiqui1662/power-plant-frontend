import { api } from "../config/axios";
import { PaymentData } from "../types/payment";

export const payNow = async (data: PaymentData) => {
    try {
        const response = await api.post(`/auth/sign-up`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};




