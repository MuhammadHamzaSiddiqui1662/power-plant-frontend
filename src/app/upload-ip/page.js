"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import "./style.css";
import { useDropzone } from "react-dropzone";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const Uploader = dynamic(() => import("../componants/UploadImage"));
const BackgroundSection = dynamic(() =>
  import("../componants/BackgroundUploaderSection")
);

export default function UploadIP() {
  const [sections, setSections] = useState([{ name: "", description: "" }]);
  const handleAddUploader = () => {
    setUploaders((prevUploaders) => [
      ...prevUploaders,
      <Uploader
        key={prevUploaders.length}
        onAddNewUploader={handleAddUploader}
      />,
    ]);
  };
  const [uploaders, setUploaders] = useState([
    <Uploader key={0} onAddNewUploader={handleAddUploader} />,
  ]);

  // Handle input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newSections = sections.slice();
    newSections[index][name] = value;
    setSections(newSections);
  };

  // Add new section
  const addSection = () => {
    setSections([...sections, { name: "", description: "" }]);
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
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Grid container>
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label
                      className="font-medium text-customDarkBlue"
                      htmlFor="Name"
                    >
                      Name:
                    </label>
                    <input
                      id="Name"
                      name="name"
                      type="text"
                      className="form-input mt-1"
                      placeholder="Enter name here"
                      // value={data.email}
                      // onChange={handleDataChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label
                      className="font-medium text-customDarkBlue"
                      htmlFor="PatentNumber"
                    >
                      Patent number:
                    </label>
                    <input
                      id="PatentNumber"
                      name="PatentNumber"
                      type="text"
                      className="form-input mt-1"
                      placeholder="Enter patent number here"
                      // value={data.email}
                      // onChange={handleDataChange}
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
                      // value={data.email}
                      // onChange={handleDataChange}
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
                      // value={data.email}
                      // onChange={handleDataChange}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label className="font-medium text-customDarkBlue block mb-2">
                      Do you have a Patent number:
                    </label>
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="option1"
                          name="options"
                          className="form-radio text-customGreen"
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
                          name="options"
                          className="form-radio text-text-customGreen"
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
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label className="font-medium text-customDarkBlue block mb-2">
                      Category:
                    </label>
                    <select class="dropdown">
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
                      htmlFor="publishedDate"
                    >
                      Abstarct:
                    </label>
                    <textarea
                      name="abstract"
                      id="abstract"
                      className="form-input h-28"
                      placeholder="Enter your abstract here"
                    ></textarea>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12}>
              <label
                className="font-medium text-customDarkBlue "
                htmlFor="Name"
              >
                Upload images:
              </label>
              <div className="flex items-center my-4">
                <div className="flex flex-wrap">{uploaders}</div>{" "}
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
            {sections.map((section, index) => (
              <Grid item xs={12} key={index}>
                <input
                  id={`Name-${index}`}
                  name="name"
                  type="text"
                  className="form-input my-2 heading-sect"
                  placeholder="Enter section name"
                  value={section.name}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <textarea
                  name="description"
                  id={`description-${index}`}
                  className="form-input desc-sect"
                  placeholder=""
                  rows={10}
                  value={section.description}
                  onChange={(event) => handleInputChange(index, event)}
                ></textarea>
              </Grid>
            ))}
            <Grid item xs={12}>
              <div
                type="submit"
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
          {/* </Grid> */}
          {/* </Grid> */}
        </Grid>
        {/* <Grid item xs={12}> */}
      </section>
      <Footer />
    </>
  );
}
