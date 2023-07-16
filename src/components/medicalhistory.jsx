import React, { useState } from "react";
import Pagination from "./common/pagination";
import { AiFillEdit, AiFillDelete, AiOutlineClose } from "react-icons/ai";
import moment from "moment";

const MedicalHistory = (props) => {
  // example for date with time
  console.log(props.pageS);

  const [image, setImg] = useState();

  function displayImage(img) {
    setImg(img);
  }

  function closeImg() {
    setImg();
  }

  return (
    <div className="w-full">
      <div className="bg-white max-w-[450px] min-w-[350px] max-h-[600px]   m-auto mt-0 rounded-lg">
        <div>
          <table className="w-full">
            <thead className="text-lg tracking-wider border-b-2 border-gray-200 text-center">
              <tr>
                <th>Medical History</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {props.medicalhis.map((medical) => (
                <tr key={medical.id}>
                  <td className="border-b-2 border-gray-200">
                    {" "}
                    <div className="">
                      <div className="flex justify-center">
                        <img
                          className="w-[80px] hover:cursor-pointer"
                          src={medical.img}
                          alt=""
                          onClick={() => displayImage(medical.img)}
                        />
                        <div className="pl-3">
                          <h2 className="text-base">
                            Caption: {medical.caption}
                          </h2>
                          <h2>Date: {`${medical.date} at ${medical.time}`}</h2>
                          <div className="flex pt-1 ">
                            <AiFillEdit
                              className="mr-2 cursor-pointer"
                              size={20}
                            />
                            <AiFillDelete
                              className="mx-2 cursor-pointer"
                              size={20}
                              onClick={() => props.deleteMh(medical)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-2 pb-2">
            <Pagination
              itemsCount={props.itemsCount}
              pageS={props.pageS}
              currentPage={props.currentPage}
              pxsonpage={props.medHisonpage}
              nextbt={props.nextbtn}
              prevbt={props.prevbtn}
            />
          </div>
        </div>
      </div>
      <div
        className={
          !image
            ? "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto hidden -z-10"
            : "w-1/2 h-1/2 absolute left-0 right-0 top-0 bottom-0 m-auto z-20 flex justify-end"
        }
      >
        <img className="w-[230px] h-[230px]" src={image} alt="" />
        <AiOutlineClose
          className="-translate-x-4 cursor-pointer"
          fill="#FF2400"
          onClick={closeImg}
        />
      </div>
      <div
        className={
          !image
            ? "w-full h-full bg-slate-300 opacity-80 absolute top-0 hidden"
            : "w-full h-full bg-slate-300 opacity-80 absolute top-0 z-10"
        }
      ></div>
    </div>
  );
};

export default MedicalHistory;
