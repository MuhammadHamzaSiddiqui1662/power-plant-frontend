"use client";
import { CircularProgress } from "@mui/material";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading: boolean;
}

const ButtonContained = forwardRef<HTMLButtonElement, Props>(
  ({ isLoading, children, className, ...props }: Props, ref) => {
    return (
      <button
        ref={ref}
        className={`text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 text-[32px] ${className}`}
        {...props}
      >
        {isLoading ? <CircularProgress color="inherit" size={24} /> : children}
      </button>
    );
  }
);

export default ButtonContained;
