"use client";

import Content from "@/components/modules/Content";
import MenuContainer from "@/components/modules/MenuContainer";
import React, { useState } from "react";

const page = () => {
  return (
    <div className="flex my-10 mx-10 gap-10">
      <MenuContainer />
      <Content page={"Stock Out"} />
    </div>
  );
};

export default page;
