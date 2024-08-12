import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = ({ message, type = 'info' }) => {
  toast[type](message);
};

export const MyToastContainer = () => (
  <ToastContainer position="top-right" autoClose={3000} />
);

export default ToastMessage;
