"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    url: "",
    password: "",
  });

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));

    setForm((prev) => ({
      ...prev,
      url: previewUrl,
    }));
  };
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    
    setForm((prev) => ({
      ...prev,
      [name]: value,
      id: uuid(),
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/register", form);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex justify-center items-center mt-48">
      <div className="border rounded-lg p-5">
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="name"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="email"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-email"
                type="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="password"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Image
              </label>
            </div>
            <div className="md:w-2/3">
              <input type="file" src="" alt="" onChange={handleImageChange} />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <button>
              <Link href={"/"}>Login Now</Link>
            </button>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
