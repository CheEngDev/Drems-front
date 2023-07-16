import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import loginimg from "../assets/loginimg.png";
import loginwavesbg from "../assets/loginwavesbg.png";
import coloredshapes from "../assets/coloredshapes.png";
import authService from "../services/authService";
import Joi from "joi";

const Login = () => {
  // User
  const user = authService.getCurrentUser();
  // Data
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  // Errors
  const [errors, setErrors] = useState({});
  // Changing input fields
  function handleChange(e) {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function login(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    console.log(errors);
    if (errors) {
      setTimeout(() => setErrors({}), 2000);
      return;
    }

    try {
      await authService.login(userData);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {};
        errors.username = ex.response.data;
        setErrors(errors || {});
        if (errors) {
          setTimeout(() => setErrors({}), 2000);
        }
      }
    }
  }

  const schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).max(50).required(),
  }).options({ stripUnknown: true });

  function validate() {
    const result = schema.validate(userData, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  return (
    <div>
      {!user ? (
        <div>
          {" "}
          {/* Small Screens */}
          <div
            className="flex w-full h-screen bg-bottom bg-no-repeat bg-cover md:hidden"
            style={{ backgroundImage: `url(${loginwavesbg})` }}
          >
            <div className="w-full h-[400px] m-auto">
              <img
                className="max-w-[370px] h-[370px] w-full m-auto"
                src={loginimg}
                alt=""
              />
              <div className="max-w-[300px] m-auto -translate-y-72">
                <h2 className="text-center text-2xl font-bold">
                  Login to Your Account
                </h2>
                <form onSubmit={login}>
                  <div className="">
                    <input
                      className="border-2 w-full rounded-full my-2 p-1 shadow-xl"
                      type="email"
                      placeholder="Email"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <div className="text-red-600 text-sm border-2 w-[290px] absolute -translate-y-4 bg-white">
                        {errors.username}
                      </div>
                    )}
                    <input
                      className="border-2 w-full rounded-full my-2 p-1 shadow-xl"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="text-red-600 text-sm border-2 w-[290px] absolute -translate-y-4 bg-white">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="w-[230px] m-auto">
                    <button className="text-center text-white font-semibold w-full bg-slate-700 my-3 p-2 rounded-full hover:bg-slate-600">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Large Screens */}
          <div
            className="hidden w-full h-screen md:flex bg-bottom bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${loginwavesbg})` }}
          >
            <div className="w-3/4 flex justify-center items-center">
              <div className="w-[430px] h-[300px] px-2">
                <h2 className="text-center text-4xl font-bold pb-5">
                  Loging to Your Account
                </h2>
                <form onSubmit={login}>
                  <div className="w-[330px] m-auto pt-2">
                    <input
                      className="border-2 p-2 w-full rounded-full shadow-lg outline-none"
                      type="email"
                      placeholder="Email"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <div className="text-red-600 text-sm border-2 w-[300px] absolute -translate-y-1 translate-x-3 bg-white">
                        {errors.username}
                      </div>
                    )}
                  </div>
                  <div className="w-[330px] m-auto py-3">
                    <input
                      className="border-2 p-2 w-full rounded-full shadow-lg outline-none"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="text-red-600 text-sm border-2 w-[300px] absolute -translate-y-1 translate-x-3 bg-white">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="w-[240px] m-auto pt-3">
                    <button className="bg-[#002D62] w-full rounded-full p-2 text-white font-semibold text-lg hover:bg-[#0066b2]">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="h-full w-1/2 flex justify-center items-center "
              style={{ backgroundImage: `url(${coloredshapes})` }}
            >
              <div className="w-full h-[330px]">
                <h2 className="text-center text-white text-4xl font-bold tracking-wider">
                  New Here?
                </h2>
                <p className="text-center text-white p-6 text-lg font-medium tracking-widest">
                  Sign up and discover a great amount of new opportunities!
                </p>
                <div className="w-[250px] m-auto pt-2">
                  <div className="w-[260px] m-auto">
                    <a
                      href="/register"
                      className="text-center px-24 rounded-full py-2 bg-white text-lg font-semibold "
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/dashboard" replace />
      )}
    </div>
  );
};

export default Login;
