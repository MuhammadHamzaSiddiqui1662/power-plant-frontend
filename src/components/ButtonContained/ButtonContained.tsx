"use client";
import { CircularProgress } from "@mui/material";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading: boolean;
  size: "medium" | "small";
}

const ButtonContained = forwardRef<HTMLButtonElement, Props>(
  (
    { isLoading, children, className, size = "medium", ...props }: Props,
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`text-${
          size === "small" ? "lg" : "2xl"
        } btn bg-customGreen hover:bg-customGreen text-white rounded-md py-${
          size === "small" ? "4" : "6"
        } w-40 text-[${size === "small" ? "18" : "24"}px] ${className}`}
        {...props}
      >
        {isLoading ? <CircularProgress color="inherit" size={24} /> : children}
      </button>
    );
  }
);

export default ButtonContained;
