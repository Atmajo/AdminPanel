"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import MenuContainer from "@/components/modules/MenuContainer";
import React, { useState } from "react";
import StockIn from "@/components/pages/StockIn";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [menu, setMenu] = useState(true);

  if (!session) {
    router.push("/");
  }

  return (
    <div className="flex">
      {menu && <MenuContainer page="Stock In" />}
      <StockIn setMenu={setMenu} menu={menu} />
    </div>
  );
};

export default page;
