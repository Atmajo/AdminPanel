"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Content from "@/components/modules/Content";
import MenuContainer from "@/components/modules/MenuContainer";
import React from "react";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  if(!session){
    router.push("/");
  }

  return (
    <div className="flex my-5 mx-10 gap-20">
      <MenuContainer />
      <Content page={"Dashboard"} />
    </div>
  );
};

export default page;
