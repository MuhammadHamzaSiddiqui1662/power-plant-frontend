"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import "./style.css";

const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const Uploader = dynamic(() => import("../componants/UploadImage"));
const BackgroundSection = dynamic(() =>
  import("../componants/BackgroundUploaderSection")
);

export default function UploadIP() {
  const [data, setData] = useState({
    name: "",
    description: "",
    abstract: "",
    price: "",
    status: "",
    category: "",
    publishedDate: "",
    patentNumber: "",
    trademark: "",
    copyright: "",
    mainImg: "",
    images: [],
    sections: [{ title: "", content: "" }],
  });
  console.log("data", data);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (file, index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = file;
      return newFiles;
    });
  };

  const [uploaders, setUploaders] = useState([
    {
      key: 0,
      component: <Uploader key={0} index={0} onFileUpload={handleFileUpload} />,
    },
  ]);

  const handleAddUploader = () => {
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
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSectionChange = (index, event) => {
    const { name, value } = event.target;
    const newSections = data.sections.slice();
    newSections[index][name] = value;
    setData((prevData) => ({
      ...prevData,
      sections: newSections,
    }));
  };

  const addSection = () => {
    setData((prevData) => ({
      ...prevData,
      sections: [...prevData.sections, { title: "", content: "" }],
    }));
  };

  return (
    <>
      <Navbar navClass="navbar-white" />
      <BackgroundSection />
      <section>
        <Grid className="container" container>
          <Grid item xs={12}>
            <p className="mt-16 mb-8 heading font-bold leading-none">
              Upload IP data
            </p>
          </Grid>
          <Grid container columnSpacing={5}>
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
                      type="text"
                      className="form-input mt-1"
                      placeholder="Enter date here"
                      value={data.publishedDate}
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
                      Price:
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      className="form-input mt-1"
                      placeholder="Enter price here"
                      value={data.price}
                      onChange={handleInputChange}
                    />
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
                          value="yes"
                          onChange={handleInputChange}
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
                          value="no"
                          onChange={handleInputChange}
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
                {/* <Grid item xs={12}></Grid> */}
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label className="font-medium text-customDarkBlue block mb-2">
                      Category:
                    </label>
                    <select
                      className="dropdown"
                      name="category"
                      value={data.category}
                      onChange={handleInputChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
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
                      placeholder="Enter your description here"
                      value={data.description}
                      onChange={handleInputChange}
                    ></textarea>
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
                className="font-medium text-customDarkBlue "
                htmlFor="images"
              >
                Upload images:
              </label>
              <div className="flex items-center my-4">
                <div className="flex flex-wrap">
                  {uploaders?.map((uploader) => uploader.component)}
                </div>
                <div
                  onClick={handleAddUploader}
                  className="w-28 h-28 border-2 border-solid border-gray-300 rounded cursor-pointer flex items-center justify-center mr-2.5"
                >
                  <p className=" text-customGrayColor">+</p>
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
          {/* <Grid container> */}
          <Grid xs={12} sm={6}>
            <div className="flex">
              <button
                type="submit"
                className="my-3 text-2xl btn btn-outlined text-customDarkBlue rounded-md py-6 w-40 text-[32px] me-5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="my-3 text-2xl btn btn-outlined text-customDarkBlue rounded-md py-6 w-40 text-[32px] "
              >
                Save
              </button>
            </div>
          </Grid>
          <Grid xs={12} sm={6}>
            {" "}
            <div className="flex justify-end">
              <button
                type="submit"
                className="my-3 text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 text-[32px]"
              >
                Publish
              </button>
            </div>
          </Grid>
        </Grid>
      </section>
      <Footer />
    </>
  );
}
