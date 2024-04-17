import { useState, useRef } from "react";
import clsx from "clsx";

import OTPInputGroup from "../../components/otp_input";

import OrnamentIcon from "../../assets/icons/OrnamentIcon";

const OTPVerification = () => {

  return (
    <div className="w-full min-h-screen flex flex-row bg-white">
      <div className="bg-[url('assets/images/authentication-bg.jpg')] bg-cover bg-center bg-no-repeat w-[30vw] h-[100vh] rounded-3xl">
        <p className="text-[32px] font-bold text-[#FBFDFF] text-center mt-[15vh]">Unlock Insights,<br />Tailor Experiences:<br />Know Your Visitors</p>
      </div>
      <div className="flex flex-col justify-center gap-16 w-full">
        <div className="relative flex flex-col bg-main justify-center w-full">
          <OrnamentIcon />
          <div className="flex flex-col justify-center gap-8 w-1/2 mx-auto">
            <p className="text-[40px] text-center font-extrabold text-primary-300">Webmetic</p>
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-[32px] font-bold text-neutral-800">OTP Verification</p>
              <p className="text-lg text-center text-[#111827] font-normal">
                We have sent a verification code to email address<br/>
                <span className="font-semibold">nawaf@gmail.com.</span>
                <span className="text-[#0C6BAF]">Wrong Email?</span>
              </p>
            </div>
            <OTPInputGroup />
            <button type="button" className="text-white bg-primary-500 focus:ring-0 font-bold text-center rounded-[10px] text-base px-6 py-5">Submit</button>
          </div>
        </div>
        <div className="text-center inline-flex justify-center items-center gap-[10px] text-sm">
          <p className="text-[#A0AEC0]">©Webmetic 2023 . All rights reserved.</p>
          <p className="text-[#111827]">Terms & Conditions</p>
          <p className="text-[#111827]">Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification;