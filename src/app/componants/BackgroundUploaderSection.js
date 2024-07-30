"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function BackgroundSection({ onBackgroundUpload }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
      onBackgroundUpload(file); // Pass the file to the parent component
    }
  }, [acceptedFiles]);

  return (
    <section
      {...getRootProps({
        className:
          "relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover",
      })}
      style={{
        backgroundColor: "rebeccapurple",
        height: "100%",
        width: "100%",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 bg-customGrayColor opacity-80"></div>
      <div className="container">
        <div className="grid grid-cols-1 text-center mt-10">
          <div className="flex justify-center">
            <img src="/images/img-upload.png" />
          </div>
          <p className="text-white pt-3">Upload Image</p>
        </div>
      </div>
    </section>
  );
}
