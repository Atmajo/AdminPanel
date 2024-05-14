import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Dashboard = ({ setMenu, menu }: { setMenu: any; menu: boolean }) => {
  const [modal, setModal] = useState(false);
  const { data: session } = useSession();
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
    </div>
  );
};

export default Dashboard;
