"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Modal from "../modules/Modal";

const StockIn = () => {
  const [row, setRow] = useState([]);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [clickedId, setClickedId] = useState({
    id: "",
  });
  const [data, setData] = useState({
    name: "",
    code: "",
    start: "",
    expiry: "",
    quantity: "",
    mfgcost: "",
    price: "",
  });

  const handleSubmit = async () => {
    axios
      .post("http://localhost:3030/api/addStocks", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCol = async () => {
    try {
      await axios
        .delete("http://localhost:3030/api/deleteStocks", {
          params: { id: clickedId },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRows = async () => {
      await axios
        .get("http://localhost:3030/api/getStocks")
        .then((res) => {
          setRow(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchRows();
  }, [row]);

  const columns = [
    {
      name: "All",
    },
    {
      name: "Name",
    },
    {
      name: "Code",
    },
    {
      name: "Start",
    },
    {
      name: "Expiry",
    },
    {
      name: "Quantity",
    },
    {
      name: "Mfg. Cost",
    },
    {
      name: "Price",
    },
    {
      name: "Edit",
    },
  ];

  return (
    <div className="">
      <h1 className="text-5xl font-semibold">Stock In</h1>
      <div className="flex flex-col gap-8">
        <div className="grid grid-flow-col gap-5 mt-8 ">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            color="white"
            className="bg-white/30 h-9 rounded-lg p-3 outline-none shadow-lg"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
          <input
            type="text"
            name="code"
            placeholder="Item Code"
            className="bg-white/30 h-9 rounded-lg p-3 outline-none shadow-lg"
            onChange={(e) => setData({ ...data, code: e.target.value })}
            required
          />
          <button
            className="flex w-24 items-center bg-white/30 h-9 rounded-lg p-3 outline-none shadow-lg"
            onClick={() => {
              handleSubmit();
            }}
          >
            Add Item
          </button>
          <div className="flex items-center gap-2">
            <label>Start Date:</label>
            <input
              type="date"
              name="start"
              placeholder="Date"
              className="bg-white/30 h-9 rounded-lg p-3 outline-none shadow-lg select-none"
              onChange={(e) => setData({ ...data, start: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>End Date:</label>
            <input
              type="date"
              name="expiry"
              placeholder="Date"
              className="bg-white/30 h-9 rounded-lg p-3 outline-none shadow-lg select-none"
              onChange={(e) => setData({ ...data, expiry: e.target.value })}
            />
          </div>
          <button className="flex items-center gap-2 bg-white/30 h-9 p-3 rounded-lg shadow-lg">
            <Image src="/download.png" alt="img" width={15} height={50} />
            <h1>Download</h1>
          </button>
          <button
            className="flex items-center gap-2 bg-white/30 h-9 p-3 rounded-lg shadow-lg"
            onClick={() => deleteCol()}
          >
            <Image src="/delete.png" alt="img" width={15} height={50} />
            <h1>Delete</h1>
          </button>
        </div>
        <div className="">
          <table className="border border-white rounded-lg p-2 w-full">
            {row.length == 0 && (
              <thead>
                <tr className="border border-white rounded-lg p-2">
                  <th className="border border-white rounded-lg p-2">
                    No Data
                  </th>
                </tr>
              </thead>
            )}
            {row.length > 0 && (
              <>
                <thead>
                  <tr className="border border-white rounded-lg p-2">
                    {columns.map((col, index) => (
                      <th className="border border-white p-2" key={index}>
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {row.map((item, index) => (
                    <>
                      {modal && <Modal modal={modal} setModal={setModal} id={editId} item={item} />}
                      <tr
                        className="border border-white rounded-lg p-2"
                        key={index}
                      >
                        <td className="text-center border border-white rounded-lg p-2">
                          <input
                            type="checkbox"
                            onClick={() => setClickedId(item.id)}
                          />
                        </td>
                        <td className="text-center border border-white rounded-lg p-2">
                          {item.name}
                        </td>
                        <td className="text-center border border-white rounded-lg p-2">
                          {item.code}
                        </td>
                        <td className="text-center border border-white rounded-lg p-2">
                          {item.start}
                        </td>
                        <td className="text-center border border-white rounded-lg p-2">
                          {item.expiry}
                        </td>
                        <td className="text-center border border-white rounded-lg p-2">
                          {item.quantity}
                        </td>
                        <td className="text-center border border-white rounded-lg p-2">
                          {item.mfgcost}
                        </td>
                        <td className="text-center border border-white rounded-lg p-2">
                          {item.price}
                        </td>
                        <td className="text-center border border-white rounded-lg p-2">
                          <button
                            onClick={() => {
                              setEditId(item.id);
                              setModal(!modal);
                            }}
                          >
                            <Image
                              src="/edit.png"
                              width={20}
                              height={50}
                              alt="edit"
                            />
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockIn;
