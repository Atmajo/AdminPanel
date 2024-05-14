"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Modal from "../modules/Modal";
import { useSession, signOut } from "next-auth/react";

const StockIn = ({ setMenu, menu }: { setMenu: any; menu: boolean }) => {
  const [row, setRow] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [clickedId, setClickedId] = useState({ id: "" });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 1160) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }, [windowWidth]);
  
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
    await axios.post("/api/stocks/addstocks", data).catch((err) => {
      console.log(err);
    });
    alert("Data Added");
  };

  const deleteCol = async () => {
    try {
      await axios.post("/api/stocks/deletestocks", clickedId).catch((err) => {
        console.log(err);
      });
      alert("Data Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRows = async () => {
      await axios
        .post("/api/stocks/getstocks")
        .then((res) => {
          setRow(res.data?.data?.rows);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchRows();
  }, []);

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

  const { data: session } = useSession();

  return (
    <div
      className={`flex flex-col text-black ${menu ? "w-[85%]" : "w-[100%]"}`}
    >
      <div className="flex justify-between py-3 md:px-12 lg:px-12 bg-white">
        <div className="flex items-center gap-5 ">
          <div>
            <button className="w-8 h-8" onClick={() => setMenu(!menu)}>
              <img src="/icons/menu.svg" alt="menu" />
            </button>
          </div>
          <input
            type="search"
            name="search"
            id=""
            placeholder="search"
            className="py-2 px-3 rounded-lg border border-black outline-none"
          />
        </div>
        <div className="flex md:gap-5 lg:gap-5 gap-2 items-center">
          <div className="w-8 h-8 rounded-full hover:bg-gray-100">
            <img src="/icons/notification.svg" alt="notification" />
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100">
            <button
              className="w-5 h-5 rounded-full hover:bg-gray-100"
              onClick={() => setModal(!modal)}
            >
              <img src="/icons/profile.svg" alt="profile" />
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <div className="relative">
          <div className="absolute z-10 top-2 right-2 w-40 text-black bg-white shadow-lg">
            <ul className="flex flex-col gap-2">
              <li className="py-2 px-3 hover:bg-gray-100">Profile</li>
              <li className="py-2 px-3 hover:bg-gray-100">Settings</li>
              <li className="py-2 px-3 hover:bg-gray-100">
                {session ? (
                  <button
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="p-2 text-white">
        <div className="flex flex-wrap gap-5 mt-8 ">
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
            className="flex items-center bg-white/30 h-9 rounded-lg p-3 outline-none shadow-lg"
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
          <button
            className="flex items-center gap-2 bg-white/30 h-9 p-3 rounded-lg shadow-lg"
            onClick={() => deleteCol()}
          >
            <Image src="/icons/delete.svg" alt="image" width={15} height={50} />
            <h1>Delete</h1>
          </button>
        </div>
        <div className="mt-8 overflow-x-scroll lg:overflow-hidden">
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
                  {row.map((item: item_type, index: number) => (
                    <>
                      {editModal && (
                        <Modal
                          key={item.id}
                          modal={editModal}
                          setModal={setEditModal}
                          id={editId}
                          item={item}
                        />
                      )}
                      <tr
                        className="border border-white rounded-lg p-2"
                        key={index}
                      >
                        <td className="text-center border border-white rounded-lg p-2">
                          <input
                            type="checkbox"
                            onClick={() => setClickedId({ id: item.id })}
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
                              setEditModal(!editModal);
                            }}
                          >
                            <Image
                              src="/icons/edit.svg"
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
