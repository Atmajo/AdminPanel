"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { data: session } = useSession();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { email, password } = form;
    
    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ response });
      if (!response?.error) {
        router.push("/");
      }
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Login Successful", response);
    } catch (error: any) {
      console.error("Login Failed:", error);
    }
  };
  
  useEffect(()=>{
    if(session){
      router.push("/")
    }
  }, [session])
  
  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen mt-48 gap-10">
        <div className="border rounded-lg p-5">
          <form className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3"></div>
              <button>
                <Link href={"/register"}>Register Now</Link>
              </button>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
        <button onClick={() => signIn()}>
          <div className="flex justify-center items-center gap-2 bg-gray-500 w-[250px] px-5 py-3 rounded-xl">
            <img src="/icons/github.svg" alt="" className="w-8 h-8" />
            <h1 className="text-black font-semibold">Sign in with GitHub</h1>
          </div>
        </button>
      </div>
    </>
  );
}
