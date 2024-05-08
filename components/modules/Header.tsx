"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center mt-5 z-20 px-10">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <div className="flex items-center gap-5 list-none">
        {session ? (
          <button
            className="border rounded-lg bg-gradient-to-tr from-blue-700 to-purple-800 px-3 py-2"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
