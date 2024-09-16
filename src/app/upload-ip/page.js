"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Alert, Grid } from "@mui/material";
import "./style.css";
import {
  useGetIpQuery,
  useCreateIpMutation,
  useUpdateIpMutation,
} from "../../services/ip/ip";
import { IpStatus } from "../../types/ip";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonContained from "../../components/ButtonContained/ButtonContained";
import ToastMessage from "../componants/Toast";

const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const CategorySelect = dynamic(() => import("../componants/CategorySelect"));
const Uploader = dynamic(() => import("../componants/UploadImage"));
const BackgroundSection = dynamic(() =>
  import("../componants/BackgroundUploaderSection")
);

const initialData = {
  name: "",
  description: "",
  abstract: "",
  price: "",
  status: IpStatus.Draft,
  categories: [],
  publishedDate: "",
  patentNumber: "",
  trademark: "",
  copyright: "",
  mainImg: "",
  images: [],
  sections: [{ title: "", content: "" }],
};

export default function UploadIP() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const { data: ip, refetch } = useGetIpQuery(id);
  const [uploadIp, { isLoading: isUploading, error: createError }] =
    useCreateIpMutation();
  const [updateIp, { isLoading: isUpdating, error: updateError }] =
    useUpdateIpMutation();
  const [data, setData] = useState(initialData);
  const [isPatented, setIsPatented] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [files, setFiles] = useState({});

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setData((prev) => ({
      ...prev,
      categories: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleFileUpload = (file, index) => {
    setErrorMessage("");
    setFiles((prevFiles) => ({
      ...prevFiles,
      [`file${index}`]: file,
    }));
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => {
      const newFiles = { ...prevFiles };
      delete newFiles[`file${index}`];
      return newFiles;
    });

    setUploaders((prevUploaders) =>
      prevUploaders.filter((uploader, idx) => idx !== index)
    );
  };

  const handleBackgroundUpload = (file) => {
    setErrorMessage("");
    setFiles((prevFiles) => ({
      ...prevFiles,
      backgroundImage: file,
    }));
  };
  console.log("files", files);

  const [uploaders, setUploaders] = useState([
    {
      key: 0,
      component: <Uploader key={0} index={0} onFileUpload={handleFileUpload} />,
    },
  ]);

  const handleAddUploader = () => {
    setErrorMessage("");
    setUploaders((prevUploaders) => {
      const newIndex = prevUploaders.length;
      return [
        ...prevUploaders,
        {
          key: newIndex,
          component: (
            <Uploader
              key={newIndex}
              index={newIndex}
              onFileUpload={handleFileUpload}
            />
          ),
        },
      ];
    });
  };

  const handleInputChange = (event) => {
    setErrorMessage("");
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSectionChange = (index, event) => {
    setErrorMessage("");
    const { name, value } = event.target;
    const newSections = data.sections.slice();
    newSections[index][name] = value;
    setData((prevData) => ({
      ...prevData,
      sections: newSections,
    }));
  };

  const addSection = () => {
    setErrorMessage("");
    setData((prevData) => ({
      ...prevData,
      sections: [...prevData.sections, { title: "", content: "" }],
    }));
  };

  const handleCancel = () => {
    setErrorMessage("");
    setData({ ...initialData, ...ip });
  };

  const handleSaveSubmit = async () => {
    if (isPatented) {
      if (!data.patentNumber)
        return setErrorMessage("Patent Number is required feild.");
      if (!data.publishedDate)
        return setErrorMessage("Patent published date is required feild.");
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    Object.keys(files).forEach((key) => {
      formData.append(key, files[key]);
    });

    try {
      const { data, error } = ip
        ? await updateIp(formData)
        : await uploadIp(formData);

      if (error) {
        console.log("error", error);
        setErrorMessage("Incomplete Data");
        ToastMessage({
          message: "Failed to upload IP: Incomplete Data",
          type: "error",
        });
        return;
      }

      setErrorMessage("");
      if (ip) {
        ToastMessage({
          message: "IP has been uploaded successfully!",
          type: "success",
        });
        refetch();
      } else {
        router.replace(`/upload-ip?id=${data._id}`);
        ToastMessage({
          message: "IP has been uploaded successfully!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      setErrorMessage(
        error.shortMessage || error.message || "Error in updating IP!"
      );
      ToastMessage({ message: "Error in updating IP!", type: "error" });
    }
  };

  const handlePublish = async () => {
    if (ip) {
      router.push(`/payment?type=publish&id=${ip._id}`);
    } else {
      ToastMessage({ message: "First save the IP!", type: "error" });
    }
  };

  const handlePatent = async () => {
    if (ip) {
      router.push(`/payment?type=patent&id=${ip._id}`);
    } else {
      ToastMessage({ message: "First save the IP!", type: "error" });
    }
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...ip,
      publishedDate: ip?.publishedDate
        ? ((date) =>
            `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date
              .getDate()
              .toString()
              .padStart(2, "0")}`)(new Date(ip?.publishedDate))
        : "",
    }));
    setIsPatented(ip?.patentNumber ? true : false);
  }, [ip]);

  return (
    <>
      <Navbar navClass="navbar-white" />
      <BackgroundSection onBackgroundUpload={handleBackgroundUpload} />
      <section>
        <Grid className="container" container>
          <Grid item xs={12}>
            <p className="mt-16 mb-8 heading font-bold leading-none">
              Upload IP data
            </p>
          </Grid>
          <Grid container columnSpacing={5}>
            <Grid item xs={12}>
              {errorMessage && (
                <Alert variant="outlined" severity="error" className="mb-4">
                  {errorMessage}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label
                      className="font-medium text-customDarkBlue"
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="form-input mt-1"
                      placeholder="Enter name here"
                      value={data.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label
                      className="font-medium text-customDarkBlue"
                      htmlFor="price"
                    >
                      Price ($):
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      required
                      className="form-input mt-1"
                      placeholder="Enter price here"
                      value={data.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div className="mb-4">
                    <label
                      className="font-medium text-customDarkBlue"
                      htmlFor="description"
                    >
                      Description:
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      className="form-input h-32"
                      required
                      placeholder="Enter your description here"
                      value={data.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label className="font-medium text-customDarkBlue block mb-2">
                      Do you have a Patent number:
                    </label>
                    <div className="flex h-8 mt-0.5">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="option1"
                          name="hasPatent"
                          className="form-radio text-customGreen"
                          checked={isPatented}
                          onChange={() => setIsPatented(true)}
                        />
                        <label
                          htmlFor="option1"
                          className="flex ml-2 text-customDarkBlue font-medium"
                        >
                          Yes
                        </label>
                      </div>
                      <div
                        className="flex
                 items-center ms-14"
                      >
                        <input
                          type="radio"
                          id="option2"
                          name="hasPatent"
                          className="form-radio text-customGreen"
                          checked={!isPatented}
                          onChange={() => setIsPatented(false)}
                        />
                        <label
                          htmlFor="option2"
                          className="flex ml-2 text-customDarkBlue font-medium"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </Grid>
                {isPatented && (
                  <>
                    <Grid item xs={12}>
                      <div className="mb-4">
                        <label
                          className="font-medium text-customDarkBlue"
                          htmlFor="patentNumber"
                        >
                          Patent number:
                        </label>
                        <input
                          id="patentNumber"
                          name="patentNumber"
                          type="text"
                          className="form-input mt-1"
                          placeholder="Enter patent number here"
                          value={data.patentNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="mb-4">
                        <label
                          className="font-medium text-customDarkBlue"
                          htmlFor="publishedDate"
                        >
                          Published date:
                        </label>
                        <input
                          id="publishedDate"
                          name="publishedDate"
                          type="date"
                          className="form-input mt-1"
                          placeholder="Enter date here"
                          value={data.publishedDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label className="font-medium text-customDarkBlue block mb-2">
                      Category:
                    </label>
                    <CategorySelect
                      categories={data.categories}
                      onChange={handleCategoryChange}
                      fullWidth={true}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div className="mb-4">
                <label
                  className="font-medium text-customDarkBlue"
                  htmlFor="abstract"
                >
                  Abstract:
                </label>
                <textarea
                  name="abstract"
                  id="abstract"
                  required
                  className="form-input h-32"
                  placeholder="Enter your abstract here"
                  value={data.abstract}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12}>
              <label
                className="font-medium text-customDarkBlue"
                htmlFor="images"
              >
                Upload images:
              </label>
              <div className="flex items-center my-4">
                <div className="flex flex-wrap">
                  {uploaders?.map((uploader, index) => (
                    <div key={index} className="relative mr-4">
                      {uploader.component}
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600 shadow-lg"
                        style={{ fontSize: "24px", lineHeight: "1" }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  onClick={handleAddUploader}
                  className="w-28 h-28 border-2 border-solid border-gray-300 rounded cursor-pointer flex items-center justify-center mr-2.5"
                >
                  <p className="text-customGrayColor">+</p>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container>
            {data.sections.map((section, index) => (
              <Grid item xs={12} key={index}>
                <input
                  id={`title-${index}`}
                  name="title"
                  type="text"
                  className="form-input my-2 heading-sect"
                  placeholder="Enter section title"
                  value={section.title}
                  onChange={(event) => handleSectionChange(index, event)}
                />
                <textarea
                  name="content"
                  id={`content-${index}`}
                  className="form-input desc-sect"
                  placeholder="Enter section content"
                  rows={10}
                  value={section.content}
                  onChange={(event) => handleSectionChange(index, event)}
                ></textarea>
              </Grid>
            ))}
            <Grid item xs={12}>
              <div
                className="text-2xl text-start section-outlined text-customDarkBlue rounded-md py-3 px-4 w-full text-[32px] me-5 mb-24 cursor-pointer"
                onClick={addSection}
              >
                <span className="font-bold">+</span> Add section
              </div>
            </Grid>
          </Grid>

          <Grid xs={12} sm={6}>
            <div className="flex">
              <button
                type="submit"
                onClick={handleCancel}
                className="my-3 text-2xl btn btn-outlined text-customDarkBlue rounded-md py-6 w-40 text-[32px] me-5"
              >
                Cancel
              </button>
              <ButtonContained
                onClick={handleSaveSubmit}
                isLoading={isUploading || isUpdating}
                disabled={isUploading || isUpdating}
                className="my-3 text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 text-[32px]"
              >
                Save
              </ButtonContained>
            </div>
          </Grid>
          <Grid xs={12} sm={6}>
            <div className="flex justify-end">
              <button
                onClick={isPatented ? handlePublish : handlePatent}
                className={`my-3 text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-60 text-[32px]`}
              >
                {isPatented ? "Apply to Publish" : "Apply Patent"}
              </button>
            </div>
          </Grid>
        </Grid>
      </section>
      <Footer />
    </>
  );
}
