import React from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      {/* LARGE SCREEN */}
      <div className="hidden bg-black py-8 md:flex " id="contact">
        <div className="w-1/2">
          <h1 className="text-white text-left text-3xl font-bold px-7">
            Connect with us
          </h1>
          <p className="text-white text-left px-7 pb-3">
            Are you seeking to provide feedback, make a recommendation, or
            require assistance? Our attentive ears are open and ready to assist
            you!
          </p>
          <h2 className="text-white text-left text-2xl font-semibold px-7">
            Our Office
          </h2>
          <p className="text-white text-left pb-3 px-7">
            Caranglaan District Dagupan City Pangasinan
          </p>
        </div>
        <div className="w-1/2">
          <h3 className="text-white text-left text-2xl font-semibold">
            Contact us
          </h3>
          <div className="flex justify-start">
            <AiOutlineMail size={20} fill="white" />
            <p className="text-white pl-1 -translate-y-[3px] ">
              randomemail@gmail.com
            </p>
          </div>
          <div className="flex justify-start">
            <AiOutlinePhone size={20} fill="white" />
            <p className="text-white"> 09078908640</p>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="bg-black pt-4 md:hidden" id="contactmb">
        <h1 className="text-white text-center text-3xl font-bold">
          Connect with us
        </h1>
        <p className="text-white text-center p-1 pb-3">
          Are you seeking to provide feedback, make a recommendation, or require
          assistance? Our attentive ears are open and ready to assist you!
        </p>
        <h2 className="text-white text-center text-2xl font-semibold ">
          Our Office
        </h2>
        <p className="text-white text-center p-1 pb-3">
          Caranglaan District Dagupan City Pangasinan
        </p>
        <h3 className="text-white text-center text-xl">Contact us</h3>
        <div className="flex justify-center">
          <AiOutlineMail size={20} fill="white" />
          <p className="text-white pl-1 -translate-y-[3px]">
            randomemail@gmail.com
          </p>
        </div>
        <div className="flex justify-center">
          <AiOutlinePhone size={20} fill="white" />
          <p className="text-white"> 09078908640</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
