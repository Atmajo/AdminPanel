"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import MenuContainer from "@/components/modules/MenuContainer";
import React, { useState } from "react";
import Dashboard from "@/components/pages/Dashboard";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [menu, setMenu] = useState(true);
  
  if (!session) {
    router.push(`/login`);
  }

  return (
    <div className="flex">
      {menu && <MenuContainer page="Dashboard" />}
      <Dashboard setMenu={setMenu} menu={menu} />
    </div>
  );
};

export default page;
