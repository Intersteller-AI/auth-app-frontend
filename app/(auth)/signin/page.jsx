"use client"

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import axios from "axios"
import { useEffect } from 'react';
import toast, {} from "react-hot-toast"

const signin = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`http://localhost:8000/api/users/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export default function SignIn() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const user = Cookies.get('user');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleSubmitDetails = async (body) => {
    try {
      const { email, password } = body;

      const data = await signin({
        email,
        password
      })

      if (data) {
        toast.success("sign in successful")
        Cookies.set('user', JSON.stringify(data.user), {
          expires: 1 / 24,
        });
        if (next) {
          router.push(next);
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      reset()
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome back. We exist to make entrepreneurship easier.</h1>
          </div>
          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit(handleSubmitDetails)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input
                    className={`form-input w-full font-normal text-sm disabled:opacity-70 disabled:cursor-not-allowed ${errors["email"] ? "border-rose-500" : ""} ${errors["email"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      maxLength: {
                        value: 100,
                        message: "email should be under 100 characters"
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder="Email (Required)"
                  />
                </div>
                {errors.email?.message && (
                  <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-3">
                    <p>{errors.email?.message}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input className={`form-input w-full font-normal text-sm transition disabled:opacity-70 disabled:cursor-not-allowed ${errors["password"] ? "border-rose-500" : ""} ${errors["password"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      maxLength: {
                        value: 100,
                        message: "password should be under 100 characters"
                      },
                    })}
                    id="password"
                    type="password"
                    placeholder="Password (Required)"
                  />
                </div>
                {errors.password?.message && (
                  <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-3">
                    <p>{errors.password?.message}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-400 ml-2">Keep me signed in</span>
                    </label>
                    <Link href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Don’t you have an account? <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
