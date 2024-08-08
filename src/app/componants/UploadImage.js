// ImageUploader.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({
  onFileUpload,
  index,
  isImageUploader = true,
  pdfOnly = false,
}) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      // to add image dimensions restriction
      // https://stackoverflow.com/questions/59761934/restrict-image-dimension-in-react-dropzone

      reader.onload = () => {
        setFile(reader.result);
        onFileUpload(file, index);
      };

      reader.readAsDataURL(file);
    },
    [onFileUpload, index]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: pdfOnly ? { "application/pdf": [".pdf"] } : "image/*",
  });

  return (
    <div
      {...getRootProps()}
      className={`  ${
        !isImageUploader
          ? "w-16 h-16"
          : "w-28 h-28 border-2 border-gray-300 rounded me-2"
      } cursor-pointer flex items-center justify-center`}
      style={{
        background: file
          ? `url(${!pdfOnly ? file : "/images/pdfLogo.png"}) center/cover`
          : "none",
      }}
    >
      <input {...getInputProps()} />
      {!file && (
        <div className="flex flex-col justify-center items-center">
          {isImageUploader ? (
            <img src="/images/upload.png" width="30%" height="30%" />
          ) : (
            ""
          )}

          <p
            className={`${
              isImageUploader ? "text-sm" : "text-xl"
            } text-customGrayColor mt-2`}
          >
            {isImageUploader ? `Upload ${pdfOnly ? "PDF" : "image"}` : "+"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
