"use client";
import React, { useState } from "react";
import axios from "axios";

const Modal = ({ modal, setModal, id, item }: modal_type) => {
  const [data, setData] = useState({
    id: id,
    name: item.name,
    code: item.code,
    start: "",
    expiry: "",
    quantity: "",
    mfgcost: "",
    price: "",
  });
  
  const handleUpdate = async () => {
    try {
      await axios
        .put("http://localhost:3030/api/updateStocks", data)
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    item.id === id && (
      <div className="absolute z-50 translate-x-[25%] w-[1000px] h-[400px] p-5 bg-gray-200 rounded-lg text-black shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Edit</h1>
          <button onClick={() => setModal(!modal)}>Close</button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-around">
            <div className="flex flex-col gap-3">
              <label>Name</label>
              <input type="text" defaultValue={item.name} />
            </div>
            <div className="flex flex-col gap-3">
              <label>Code</label>
              <input type="text" defaultValue={item.code} />
            </div>
          </div>
          <div className="flex justify-around">
            <div className="flex flex-col gap-3">
              <label>Start</label>
              <input
                type="date"
                name="start"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Expiry</label>
              <input
                type="date"
                name="expiry"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-around">
            <div className="flex flex-col gap-3">
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Mfg Cost</label>
              <input
                type="text"
                name="mfgcost"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-around">
            <div className="flex flex-col gap-3">
              <label>Price</label>
              <input
                type="text"
                name="price"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 text-white p-2 rounded-lg mt-5"
              onClick={() => {
                alert("Updated");
                handleUpdate();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
