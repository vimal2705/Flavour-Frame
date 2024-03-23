import React, { useState } from "react";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import burger from "../assets/burger.jpg";
import AppleIcon from "@mui/icons-material/Apple";

const Login = () => {
  const onSubmit = () => {
    localStorage.setItem("role_access", "user");
    toast.success("Login Success");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="max-w-md md:max-w-4xl md:h-[30rem]  space-y-8 p-6 bg-white rounded-lg shadow-lg grid md:grid-cols-2"
        onClick={onSubmit}
      >
        <div className="md:grid md:content-center">
          <img src={burger} className="text-center " />
        </div>

        <div className="md:grid md:content-center">
          <h2 className="text-3xl  text-center text-gray-900">
            <span className="font-extrabold">flavour</span>frame
          </h2>

          <div className="mt-8 space-y-6">
            <button
              type="button"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={onSubmit}
            >
              {/* <span className="sr-only"> <GoogleIcon/> Sign in with Google</span> */}
              <GoogleIcon className="mr-2" />
              Sign in with Google
            </button>

            <button
              type="button"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {/* <span className="sr-only ">Sign in with Apple</span> */}
              <AppleIcon className="mr-2" />
              Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
