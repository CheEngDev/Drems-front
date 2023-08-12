import React, { useState, useContext } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import loginwavesbg from "../assets/loginwavesbg.png";
import coloredshapes from "../assets/coloredshapes.png";
import * as userService from "../services/userService";
import authService from "../services/authService";
import { AiOutlineUser } from "react-icons/ai";
import { BiClinic } from "react-icons/bi";
import Joi from "joi";

const Register = (props) => {
  // User
  const user = authService.getCurrentUser();
  const location = useLocation();
  // Data in input fields
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    clinicName: "",
    address: "",
    number: "",
  });
  // Errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  // Handle Input Changes
  function handleChange(e) {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // Submit Register
  async function handleRegiserUser(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) {
      setTimeout(() => setErrors({}), 2000);
      return;
    }

    try {
      const user = userData;
      for (let key in user) {
        if (!user[key]) {
          delete user[key];
        }
      }
      const response = await userService.register(user);
      authService.loginWithJwt(response.headers["x-auth-token"]);
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

  // Schema and validate function
  const schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).max(50).required(),
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    role: Joi.string().valid("Head Dentist").required(),
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
          {/* LARGE SCREEN */}
          <div
            className="hidden w-full h-screen md:flex bg-bottom bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${loginwavesbg})` }}
          >
            <div
              className="w-1/2 flex justify-center items-center"
              style={{ backgroundImage: `url(${coloredshapes})` }}
            >
              <div className="w-full h-[330px]">
                <h2 className="text-center text-white text-4xl font-bold tracking-wider">
                  Welcome Back?
                </h2>
                <p className="text-center text-white p-6 text-lg font-medium tracking-widest">
                  Login to your account and keep track of records
                </p>
                <div className="w-[250px] m-auto">
                  <a
                    href="/login"
                    className="text-center px-24 rounded-full py-2 bg-white text-lg font-semibold "
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </div>
            <div className="w-3/4 flex justify-center items-center">
              <div className="max-w-[450px] h-[520px] w-full px-6 py-2 m-3 shadow-2xl">
                <div>
                  <h2 className="text-center text-3xl font-bold tracking-wider">
                    Create Account
                  </h2>
                </div>
                <form onSubmit={handleRegiserUser}>
                  <div className="flex pt-2">
                    <AiOutlineUser className="translate-y-1" size={20} />
                    <h2 className="w-full text-lg font-semibold">
                      Login Details
                    </h2>
                  </div>

                  <div className="w-full pb-1">
                    <input
                      className="border-2 w-full p-1 outline-none"
                      type="email"
                      placeholder="Email"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                        {errors.username}
                      </div>
                    )}
                  </div>
                  <div className="w-full py-1">
                    <input
                      className="border-2 w-full p-1 outline-none"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="w-full py-1">
                    <input
                      className="border-2 w-full p-1 outline-none"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="w-full py-1">
                    <input
                      className="border-2 w-full p-1 outline-none"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                  <div className="py-1">
                    <select
                      className="w-full border-2 p-1 outline-none"
                      list="role"
                      name="role"
                      placeholder="Role"
                      value={userData.role}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      <option value="Head Dentist">Head Dentist</option>
                    </select>
                    {errors.role && (
                      <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                        {errors.role}
                      </div>
                    )}
                  </div>
                  <div className="flex pt-3">
                    <BiClinic className="translate-y-1" size={20} />
                    <h2 className="w-full text-lg font-semibold">
                      Clinic Details
                    </h2>
                  </div>
                  <div className="w-full pb-1">
                    <input
                      className="border-2 w-full p-1 outline-none"
                      type="text"
                      placeholder="Clinic Name"
                      name="clinicName"
                      value={userData.clinicName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full py-1">
                    <input
                      className="border-2 w-full p-1 outline-none"
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full py-1">
                    <input
                      className="border-2 w-full p-1 outline-none "
                      type="number"
                      placeholder="Number"
                      name="number"
                      value={userData.number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-center pt-2">
                    <button className="w-[250px] m-auto bg-[#0e2a47] text-white text-lg py-1 rounded-full font-semibold">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* MOBILES */}
          <div
            className="flex w-full h-screen bg-bottom bg-no-repeat bg-cover justify-center items-center md:hidden "
            style={{ backgroundImage: `url(${loginwavesbg})` }}
          >
            <div className="max-w-[450px] h-[520px] w-full px-6 py-2 m-3 shadow-2xl">
              <div>
                <h2 className="text-center text-3xl font-bold tracking-wider  ">
                  Create Account
                </h2>
              </div>
              <form onSubmit={handleRegiserUser}>
                <div className="flex pt-2">
                  <AiOutlineUser className="translate-y-1" size={20} />
                  <h2 className="w-full text-lg font-semibold">
                    Login Details
                  </h2>
                </div>

                <div className="w-full pb-1">
                  <input
                    className="border-2 w-full p-1"
                    type="email"
                    placeholder="Username"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                      {errors.username}
                    </div>
                  )}
                </div>

                <div className="w-full py-1">
                  <input
                    className="border-2 w-full p-1"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="w-full py-1">
                  <input
                    className="border-2 w-full p-1 outline-none"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div className="w-full py-1">
                  <input
                    className="border-2 w-full p-1 outline-none"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                      {errors.lastName}
                    </div>
                  )}
                </div>
                <div className="py-1">
                  <select
                    className="w-full border-2 p-1 outline-none"
                    list="role"
                    name="role"
                    placeholder="Role"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="Head Dentist">Head Dentist</option>
                  </select>
                  {errors.role && (
                    <div className="text-red-600 text-sm border-2 w-[401px] absolute -translate-y-1 bg-white">
                      {errors.role}
                    </div>
                  )}
                </div>
                <div className="flex pt-3">
                  <BiClinic className="translate-y-1" size={20} />
                  <h2 className="w-full text-lg font-semibold">
                    Clinic Details
                  </h2>
                </div>
                <div className="w-full pb-1">
                  <input
                    className="border-2 w-full p-1"
                    type="text"
                    placeholder="Clinic Name"
                    name="clinicName"
                    value={userData.clinicName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full py-1">
                  <input
                    className="border-2 w-full p-1"
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full py-1">
                  <input
                    className="border-2 w-full p-1"
                    type="number"
                    placeholder="Number"
                    name="number"
                    value={userData.number}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center pt-2">
                  <button className="w-[250px] m-auto bg-[#0e2a47] text-white text-lg py-1 rounded-full font-semibold">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/dashboard" replace />
      )}
    </div>
  );
};
export default Register;
