// ImageUploader.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div
      {...getRootProps()}
      className="w-28 h-28 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center me-2"
      style={{
        background: image ? `url(${image}) center/cover` : "none",
      }}
    >
      <input {...getInputProps()} />
      {!image && (
        <div className="flex flex-col justify-center items-center">
          <img src="/images/upload.png" width="30%" height="30%" />
          <p className="text-sm text-customGrayColor mt-2">Upload image</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
