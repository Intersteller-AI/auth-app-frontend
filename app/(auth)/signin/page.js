"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";


export default function SignIn() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmitDetails = async () => {
    try {
    } catch (error) {
      if(error?.response){
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="h1">Welcome back</h1>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-500 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email (Required)
                </label>
                <input
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  value={userForm.email}
                  className={`form-input w-full font-normal text-sm disabled:opacity-70 disabled:cursor-not-allowed`}
                  id="email"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-500 text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password (Required)
                </label>
                <input
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
                  value={userForm.password}
                  className={`form-input w-full font-normal text-sm transition disabled:opacity-70 disabled:cursor-not-allowed`}
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                <button
                  onClick={handleSubmitDetails}
                  className="text-white bg-purple-600 hover:bg-purple-700 w-full py-2 rounded-md"
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="text-gray-400 text-center mt-6">
              Don’t you have an account?{" "}
              <Link
                href="/signup"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
