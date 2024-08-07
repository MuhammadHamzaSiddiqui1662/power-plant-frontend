"use client";
import { CircularProgress } from "@mui/material";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading: boolean;
}

export default function ButtonContained({
  isLoading,
  children,
  ...props
}: Props) {
  return (
    <button
      className="text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 text-[32px]"
      {...props}
    >
      {isLoading ? <CircularProgress color="inherit" size={24} /> : children}
    </button>
  );
}
