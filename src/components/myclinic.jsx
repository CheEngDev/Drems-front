import React, { useState, useEffect, useContext } from "react";
import Procedures from "./procedures";
import Insurances from "./insurances";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import Input from "./common/input";
import UserContext from "../context/userContext";
import assocDentContext from "../context/assocDentContext";
import Joi from "joi";

const MyClinic = () => {
  // Context
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const assocDentcontext = useContext(assocDentContext);
  // Pop ups
  const [editInfo, setEditInfo] = useState(false);
  const [editMyDets, setEditMyDets] = useState(false);
  const [editAssocDets, setEditAssocDets] = useState(false);
  const [addAssoc, setaddAssoc] = useState(false);

  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    role: "",
    clinicName: "",
    address: "",
    number: "",
    picUrl: "",
    username: "",
  });
  const [assocData, setAssocData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    dentist: "",
    date: "",
  });
  const [addAssocData, setaddAssocData] = useState({
    firstName: "",
    lastName: "",
  });
  // User Error
  const [userErrors, setuserError] = useState({});
  // Edit/Delete Assoc Errors
  const [assocErrors, setAssocErros] = useState({});
  // Add Assoc Error
  const [addAssocErrors, setAddErrors] = useState({});

  // Edit Popups for My Details
  function handleEditPopup() {
    setEditInfo(!editInfo);
    setEditMyDets(true);
    setEditAssocDets(false);
    setaddAssoc(false);
    setUserData({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      clinicName: user.clinicName,
      address: user.address,
      number: user.number,
      picUrl: user.picUrl,
      username: user.username,
    });
    setAssocData({
      _id: "",
      firstName: "",
      lastName: "",
      date: "",
      dentist: "",
    });
    setaddAssocData({
      firstName: "",
      lastName: "",
    });
  }

  function closeEditPopup() {
    setEditInfo(!editInfo);

    setEditAssocDets(false);
    setaddAssoc(false);
    setUserData({});
    setAssocData({
      _id: "",
      firstName: "",
      lastName: "",
      date: "",
      dentist: "",
    });
    setaddAssocData({});
  }

  function handleChangeMyDetails(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleEditUser(e) {
    e.preventDefault();
    const errors = validate();
    setuserError(errors || {});

    if (errors) return;

    userContext.editUser(userData);
    console.log(userData);
    setEditInfo(!editInfo);
  }

  // Edit pop up for Assoc
  function handleChangeEditAssoc(e) {
    const id = e.currentTarget.value;
    const selectedAssoc = assocDentcontext.associate.filter(
      (a) => a._id === id
    );
    if (!selectedAssoc[0]) {
      setAssocData({
        _id: "",
        firstName: "",
        lastName: "",
        date: "",
        dentist: "",
      });
    } else {
      setAssocData(selectedAssoc[0]);
    }
  }

  function handleChangeEditAssocField(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setAssocData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleeditAssoc(e) {
    e.preventDefault();
    const errors = validateAssoc();
    setAssocErros(errors || {});
    if (errors) return;
    assocDentcontext.editAssociate(assocData);
    setEditInfo(!editInfo);
  }

  // Delete an Assoc
  function handleDeleteAssoc(e) {
    e.preventDefault();
    const errors = validateAssoc();
    setAssocErros(errors || {});
    if (errors) return;

    assocDentcontext.deleteAssociate(assocData);
    setAssocData({
      _id: "",
      firstName: "",
      lastName: "",
      dentist: "",
      date: "",
    });
  }

  // Add pop up for Assoc

  function handleChangeAddAssoc(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setaddAssocData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleAddAssoc(e) {
    e.preventDefault();
    const errors = validateAddAssoc();
    setAddErrors(errors || {});
    if (errors) return;

    assocDentcontext.addAssociate(addAssocData);
    setEditInfo(!editInfo);
  }

  // Edit My Details/Assoc Details/Add new Assoc
  function handleEditMyDetsPopup() {
    setEditMyDets(true);
    setEditAssocDets(false);
    setaddAssoc(false);
    setAssocData({
      _id: "",
      firstName: "",
      lastName: "",
      date: "",
      dentist: "",
    });
  }
  function handleEditAssocPopup() {
    setEditAssocDets(true);
    setEditMyDets(false);
    setaddAssoc(false);
  }
  function handleAddNewAssoc() {
    setaddAssoc(true);
    setEditAssocDets(false);
    setEditMyDets(false);
    setAssocData({
      _id: "",
      firstName: "",
      lastName: "",
      date: "",
      dentist: "",
    });
  }

  // Schemas and validation
  // My details
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    role: Joi.string().valid("Head Dentist").required(),
    clinicName: Joi.string().min(3).max(20).required(),
    address: Joi.string().min(3).max(50).required(),
    number: Joi.string().min(11).max(11).required(),
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
  // Edit Assoc Dets
  const schemaEditAssoc = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
  }).options({ stripUnknown: true });

  function validateAssoc() {
    const result = schemaEditAssoc.validate(assocData, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  function validateAddAssoc() {
    const result = schemaEditAssoc.validate(addAssocData, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }

  // Mobile selection
  const [selectedInfo, setSelectedInfo] = useState("clinic");

  function handleSelectedInfo(info) {
    setSelectedInfo(info);
  }

  return (
    <div className="w-full flex">
      {/* Mobile */}
      <div className="w-full bg-slate-100 h-full md:hidden">
        <div className=" bg-[#1993c6] text-gray-100 h-[230px] mx-2 mt-14 rounded-2xl ">
          <div className="flex justify-end mx-2 translate-y-1">
            <AiOutlineEdit
              className="cursor-pointer"
              size={20}
              fill="white"
              onClick={handleEditPopup}
            />
          </div>
          <div className="flex justify-evenly">
            <div
              className="cursor-pointer hover:text-lg hover:font-medium"
              onClick={() => handleSelectedInfo("clinic")}
            >
              Clinic Info
            </div>
            <div
              className="cursor-pointer hover:text-lg hover:font-medium"
              onClick={() => handleSelectedInfo("dentist")}
            >
              Dentist Info
            </div>
            <div
              className="cursor-pointer hover:text-lg hover:font-medium"
              onClick={() => handleSelectedInfo("assoc")}
            >
              Associates
            </div>
          </div>
          <div className="border-b-2"></div>
          {selectedInfo === "clinic" ? (
            <div className="text-center">
              {" "}
              <h1 className="font-bold underline tracking-widest">
                Clinic Information{" "}
              </h1>
              <div className="pb-3 font-semibold text-sm">
                <p>
                  Clinic Name{" "}
                  <span className="block font-normal text-base">
                    {user.clinicName}
                  </span>
                </p>
                <p>
                  Contact Number
                  <span className="block font-normal text-base">
                    {!user.number ? "N/A" : user.number}
                  </span>
                </p>
                <p>
                  Address{" "}
                  <span className="block  font-normal text-base">
                    {!user.address ? "N/A" : user.address}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {selectedInfo === "dentist" ? (
            <div className="text-center">
              <h1 className="font-bold underline tracking-widest">
                Dentist Information
              </h1>
              <div className=" pb-3 font-semibold text-sm">
                <p>
                  Full Name
                  <span className="block  font-normal text-base">
                    {user.lastName}, {user.firstName}
                  </span>
                </p>

                <p>
                  Email Address{" "}
                  <span className="block font-normal text-base">
                    {user.username}
                  </span>
                </p>
                <p>
                  Preceptorships
                  <ol className=" font-normal  text-base flex justify-center">
                    <div className="px-2">
                      <li>Orthodontics</li>
                      <li>Endodontics</li>
                    </div>
                    <div className="px-2">
                      <li className="mr-9">Periodontics</li>
                      <li>Esthetic Dentistry</li>
                    </div>
                  </ol>
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {selectedInfo === "assoc" ? (
            <div className="text-center">
              <h1 className=" font-bold underline tracking-widest">
                Associate Dentists
              </h1>
              {assocDentcontext.associate.map((assoc) => (
                <div>
                  {assoc._id === assoc.dentist ? (
                    <div></div>
                  ) : (
                    <div className="pl-2 pb- font-semibold text-sm">
                      <p>
                        Fullname{" "}
                        <span className="block pl-3 font-normal text-base">
                          Dr. {assoc.lastName}, {assoc.firstName}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/* Procedures */}
        <Procedures />
        <Insurances />
        {/* Edit Pop up */}
        <div
          className={
            !editInfo
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-[90%] h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
          }
        >
          <div className=" bg-white h-[430px] w-full m-auto  rounded-xl">
            <div className="flex justify-end m-1 ">
              <AiOutlineClose
                className=" cursor-pointer"
                fill="#FF2400"
                onClick={closeEditPopup}
                size={20}
              />
            </div>
            <div className="flex justify-evenly pb-1 text-sm">
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl text-white cursor-pointer"
                onClick={handleEditMyDetsPopup}
              >
                My Info
              </div>
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl  text-white cursor-pointer"
                onClick={handleEditAssocPopup}
              >
                Associate
              </div>
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl  text-white cursor-pointer"
                onClick={handleAddNewAssoc}
              >
                <BsPersonAdd size={20} />
              </div>
            </div>
            {editMyDets ? (
              <form action="">
                <Input
                  value={userData.firstName}
                  onChange={handleChangeMyDetails}
                  error={userErrors.firstName}
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                <Input
                  value={userData.lastName}
                  onChange={handleChangeMyDetails}
                  error={userErrors.lastName}
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
                  <label className="px-1" htmlFor="sex">
                    Role
                  </label>
                  <select
                    value={userData.role}
                    onChange={handleChangeMyDetails}
                    id="role"
                    name="role"
                    className="border-2 outline-none rounded-xl w-full pl-1"
                  >
                    <option value="Head Dentist">Head Dentist</option>
                  </select>
                </div>
                <Input
                  value={userData.clinicName}
                  onChange={handleChangeMyDetails}
                  error={userErrors.clinicName}
                  name="clinicName"
                  label="Clinic Name"
                  type="text"
                />
                <Input
                  value={userData.address}
                  onChange={handleChangeMyDetails}
                  error={userErrors.address}
                  name="address"
                  label="Address"
                  type="text"
                />
                <Input
                  value={userData.number}
                  onChange={handleChangeMyDetails}
                  error={userErrors.number}
                  name="number"
                  label="Number"
                  type="text"
                />
                <div className="flex justify-center w-full pt-4">
                  <button
                    className=" max-w-[160px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white hover:bg-blue-500 transition-all duration-200"
                    onClick={handleEditUser}
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div></div>
            )}
            {editAssocDets ? (
              <form action="">
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pt-14">
                  <label className="px-1 text-sm" htmlFor="sex">
                    Associate Dentist
                  </label>
                  <select
                    onChange={handleChangeEditAssoc}
                    id="assoc"
                    name="assoc"
                    className="border-2 outline-none rounded-xl w-full pl-1"
                  >
                    <option value=""></option>
                    {assocDentcontext.associate.map((assoc) => (
                      <option
                        value={assoc._id}
                      >{`${assoc.lastName}, ${assoc.firstName}`}</option>
                    ))}
                  </select>
                </div>
                <Input
                  value={assocData.firstName}
                  onChange={handleChangeEditAssocField}
                  error={assocErrors.firstName}
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                <Input
                  value={assocData.lastName}
                  onChange={handleChangeEditAssocField}
                  error={assocErrors.lastName}
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
                <div className="flex justify-center w-full pt-5">
                  <button
                    className=" max-w-[180px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white  hover:bg-blue-500 transition-all duration-200 mx-1"
                    onClick={handleeditAssoc}
                  >
                    Save
                  </button>
                  <button
                    className=" max-w-[180px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white  hover:bg-blue-500 transition-all duration-200 mx-1"
                    onClick={handleDeleteAssoc}
                  >
                    Delete
                  </button>
                </div>
              </form>
            ) : (
              <div></div>
            )}
            {addAssoc ? (
              <form action="" className="pt-14">
                <Input
                  value={addAssocData.firstName}
                  onChange={handleChangeAddAssoc}
                  error={addAssocErrors.firstName}
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                <Input
                  value={addAssocData.lastName}
                  onChange={handleChangeAddAssoc}
                  error={addAssocErrors.lastName}
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
                <div className="flex justify-center w-full pt-5">
                  <button
                    className=" max-w-[170px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white  hover:bg-blue-500 transition-all duration-200"
                    onClick={handleAddAssoc}
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      {/* Large Screen */}
      <div className="w-full hidden md:flex">
        {/* Clinic Info */}
        <div className="text-gray-100 bg-[#1993c6] max-w-[270px] min-w-[240px] pb-12 h-full pt-2 px-4 ">
          <AiOutlineEdit
            className="ml-48 -translate-y-1 hover:cursor-pointer"
            size={20}
            fill="white"
            onClick={handleEditPopup}
          />
          <h1 className="font-bold underline tracking-widest">
            Clinic Information{" "}
          </h1>
          <div className="pl-2 pb-3 font-semibold text-sm">
            <p>
              Clinic Name{" "}
              <span className="block pl-3 font-normal text-base">
                {user.clinicName}
              </span>
            </p>
            <p>
              Contact Number
              <span className="block pl-3 font-normal text-base">
                {!user.number ? "N/A" : user.number}
              </span>
            </p>
            <p>
              Address{" "}
              <span className="block pl-3 font-normal text-base">
                {!user.address ? "N/A" : user.address}
              </span>
            </p>
          </div>
          <h1 className="font-bold underline tracking-widest">
            Dentist Information
          </h1>
          <div className="pl-2 pb-3 font-semibold text-sm">
            <p>
              Full Name
              <span className="block pl-3 font-normal text-base">
                {user.lastName}, {user.firstName}
              </span>
            </p>

            <p>
              Email Address{" "}
              <span className="block pl-3 font-normal text-base">
                {user.username}
              </span>
            </p>
            <p>
              Preceptorships
              <ol className="list-disc font-normal pl-6 text-base">
                <li>Orthodontics</li>
                <li>Endodontics</li>
                <li>Periodontics</li>
                <li>Esthetic Dentistry</li>
              </ol>
            </p>
          </div>
          <h1 className=" font-bold underline tracking-widest">
            Associate Dentists
          </h1>
          {assocDentcontext.associate.map((assoc) => (
            <div>
              {assoc._id === assoc.dentist ? (
                <div></div>
              ) : (
                <div className="pl-2 pb- font-semibold text-sm">
                  <p>
                    Fullname{" "}
                    <span className="block pl-3 font-normal text-base">
                      Dr. {assoc.lastName}, {assoc.firstName}
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Procedure and Insurance List */}
        <div className="w-full bg-slate-100">
          <Procedures />
          <Insurances />
        </div>
        {/* Edit Pop up */}
        <div
          className={
            !editInfo
              ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
              : "w-1/2 h-[70%] absolute left-0 right-0 top-0 bottom-0 m-auto z-20 "
          }
        >
          <div className=" bg-white h-[430px] w-full m-auto  rounded-xl">
            <div className="flex justify-end m-1 ">
              <AiOutlineClose
                className=" cursor-pointer"
                fill="#FF2400"
                onClick={closeEditPopup}
                size={20}
              />
            </div>
            <div className="flex justify-evenly pb-1">
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl text-white cursor-pointer"
                onClick={handleEditMyDetsPopup}
              >
                Edit My Info
              </div>
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl  text-white cursor-pointer"
                onClick={handleEditAssocPopup}
              >
                Edit Associate
              </div>
              <div
                className="bg-[#1993c6] px-3 py-1 rounded-xl  text-white cursor-pointer"
                onClick={handleAddNewAssoc}
              >
                Add Associate
              </div>
            </div>
            {editMyDets ? (
              <form action="">
                <Input
                  value={userData.firstName}
                  onChange={handleChangeMyDetails}
                  error={userErrors.firstName}
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                <Input
                  value={userData.lastName}
                  onChange={handleChangeMyDetails}
                  error={userErrors.lastName}
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9">
                  <label className="px-1" htmlFor="sex">
                    Role
                  </label>
                  <select
                    value={userData.role}
                    onChange={handleChangeMyDetails}
                    id="role"
                    name="role"
                    className="border-2 outline-none rounded-xl w-full pl-1"
                  >
                    <option value="Head Dentist">Head Dentist</option>
                  </select>
                </div>
                <Input
                  value={userData.clinicName}
                  onChange={handleChangeMyDetails}
                  error={userErrors.clinicName}
                  name="clinicName"
                  label="Clinic Name"
                  type="text"
                />
                <Input
                  value={userData.address}
                  onChange={handleChangeMyDetails}
                  error={userErrors.address}
                  name="address"
                  label="Address"
                  type="text"
                />
                <Input
                  value={userData.number}
                  onChange={handleChangeMyDetails}
                  error={userErrors.number}
                  name="number"
                  label="Number"
                  type="text"
                />
                <div className="flex justify-center w-full pt-4">
                  <button
                    className=" max-w-[200px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white text-lg hover:bg-blue-500 transition-all duration-200"
                    onClick={handleEditUser}
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div></div>
            )}
            {editAssocDets ? (
              <form action="">
                <div className=" m-auto max-w-[380px] min-w-[200px] px-9 pt-14">
                  <label className="px-1 text-sm" htmlFor="sex">
                    Associate Dentist
                  </label>
                  <select
                    onChange={handleChangeEditAssoc}
                    id="assoc"
                    name="assoc"
                    className="border-2 outline-none rounded-xl w-full pl-1"
                  >
                    {assocDentcontext.associate.map((assoc) => (
                      <option
                        value={assoc._id === assoc.dentist ? "" : assoc._id}
                      >
                        {assoc._id === assoc.dentist
                          ? ""
                          : `${assoc.lastName}, ${assoc.firstName}`}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  value={assocData.firstName}
                  onChange={handleChangeEditAssocField}
                  error={assocErrors.firstName}
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                <Input
                  value={assocData.lastName}
                  onChange={handleChangeEditAssocField}
                  error={assocErrors.lastName}
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
                <div className="flex justify-center w-full pt-5">
                  <button
                    className=" max-w-[180px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white text-lg hover:bg-blue-500 transition-all duration-200 mx-2"
                    onClick={handleeditAssoc}
                  >
                    Save
                  </button>
                  <button
                    className=" max-w-[180px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white text-lg hover:bg-blue-500 transition-all duration-200 mx-2"
                    onClick={handleDeleteAssoc}
                  >
                    Delete
                  </button>
                </div>
              </form>
            ) : (
              <div></div>
            )}
            {addAssoc ? (
              <form action="" className="pt-14">
                <Input
                  value={addAssocData.firstName}
                  onChange={handleChangeAddAssoc}
                  error={addAssocErrors.firstName}
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                <Input
                  value={addAssocData.lastName}
                  onChange={handleChangeAddAssoc}
                  error={addAssocErrors.lastName}
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
                <div className="flex justify-center w-full pt-5">
                  <button
                    className=" max-w-[200px] w-full py-1 bg-blue-900 rounded-full font-bold tracking-wider text-white text-lg hover:bg-blue-500 transition-all duration-200"
                    onClick={handleAddAssoc}
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClinic;
