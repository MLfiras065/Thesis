"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [upd, setUpd] = useState<boolean>(false);
  const route = useRouter();

  const Add = () => {
    axios
      .post(`http://localhost:4000/api/product/.getAll`, {
        category: category,
        name: name,
        price: price,
        description: description,
        image: image,
      })
      .then((res) => {
        setData(res.data);
        route.push("/Product");
      })

      .catch((err: string) => console.log(err));
  };
  const handeAdd = () => {
    Add();
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
   

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "product");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzonlv8oi/image/upload",

        formData
      );

      console.log("Image uploaded successfully:", response.data);
      setImage(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20 mb-20">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">
        Account settings
      </h1>

      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-white dark:text-gray-200" htmlFor="username">
            name
          </label>
          <input
            id="username"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-white dark:text-gray-200" htmlFor="price">
            Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="text-white dark:text-gray-200" htmlFor="textarea">
            description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="textarea"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          ></textarea>
        </div>

        <div>
          <label className="text-white dark:text-gray-200" htmlFor="city">
            category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            id="city"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option>gaming</option>
            <option>smartphone</option>
            <option>clothes</option>
            <option>sport</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    // value={image}
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1 text-white">or drag and drop</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          onClick={() => {
            handeAdd(), console.log("checked");
          }}
        >
          add
        </button>
      </div>
    </section>
  );
};

export default AddProduct;
