import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = ({ message, type = "info", autoCloseAfter = 3000 }) => {
  toast[type](message, { autoClose: autoCloseAfter });
};

export const MyToastContainer = () => (
  <ToastContainer position="top-right" autoClose={3000} />
);

export default ToastMessage;
