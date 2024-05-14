"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Menu = ({ title, icon, redirect }: menu_type) => {
  const router = useRouter();
  return (
    <div
      className="flex gap-1 items-center hover:bg-gray-300/20 rounded-lg cursor-pointer"
      onClick={() => {
        router.push(redirect);
      }}
    >
      <Image src={icon} alt={title} width={40} height={50} />
      <h1 className="text-sm">{title}</h1>
    </div>
  );
};

export default Menu;
