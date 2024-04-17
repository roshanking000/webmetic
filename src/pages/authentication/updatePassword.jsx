import { useState, useRef } from "react";
import clsx from "clsx";

import OrnamentIcon from "../../assets/icons/OrnamentIcon";
import TickCircleIcon from "../../assets/icons/TickCircleIcon";
import CloseCircleIcon from "../../assets/icons/CloseCircleIcon";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const confirmNewPassword = useRef("");

  const isUpperCase = (string) => {
    return string.toUpperCase() === string;
  }

  const isLowerCase = (string) => {
    return string.toLowerCase() === string;
  }

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
              <p className="text-[32px] font-bold text-primary-600">Update your password</p>
              <p className="text-lg text-center text-primary-500">Set your new password with minimum 8 characters with a combination of letters and numbers</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-[10px] text-sm">
                  <p className="text-[#111827]">New Password <span className="text-[#E03137]">*</span></p>
                  <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="border border-input rounded-[10px] block w-full px-5 py-4 focus:ring-0 focus:border-input" required />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex gap-1">
                    {newPassword.length >= 8 ? (
                      <div className="flex items-center gap-2 w-1/2">
                        <TickCircleIcon />
                        <p className="text-[#3562D4]">8 characters</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-1/2">
                        <CloseCircleIcon />
                        <p className="text-[#E03137]">8 characters</p>
                      </div>
                    )}
                    {newPassword.match(/\d+/g) !== null ? (
                      <div className="flex items-center gap-2 w-1/2">
                        <TickCircleIcon />
                        <p className="text-[#3562D4]">Number (0-9)</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-1/2">
                        <CloseCircleIcon />
                        <p className="text-[#E03137]">Number (0-9)</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {isLowerCase(newPassword) === false ? (
                      <div className="flex items-center gap-2 w-1/2">
                        <TickCircleIcon />
                        <p className="text-[#3562D4]">Uppercase letter (A-Z)</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-1/2">
                        <CloseCircleIcon />
                        <p className="text-[#E03137]">Uppercase letter (A-Z)</p>
                      </div>
                    )}
                    {isUpperCase(newPassword) === false ? (
                      <div className="flex items-center gap-2 w-1/2">
                        <TickCircleIcon />
                        <p className="text-[#3562D4]">Lowercase letter (a-z)</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-1/2">
                        <CloseCircleIcon />
                        <p className="text-[#E03137]">Lowercase letter (a-z)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[10px] text-sm">
                <p className="text-overview-value">Confirmation New Password <span className="text-[#E03137]">*</span></p>
                <input ref={confirmNewPassword} type="password" placeholder="Re-type your new password" className="border border-input rounded-[10px] block w-full px-5 py-4 focus:ring-0 focus:border-input" required />
              </div>
            </div>
            <button type="button" className={clsx("text-white focus:ring-0 font-bold text-center rounded-[10px] text-base px-6 py-5", newPassword.length >= 8 && newPassword.match(/\d+/g) !== null && isLowerCase(newPassword) === false && isUpperCase(newPassword) === false ? "bg-primary-500" : "cursor-not-allowed bg-primary-400")} disabled={ newPassword.length >= 8 && newPassword.match(/\d+/g) !== null && isLowerCase(newPassword) === false && isUpperCase(newPassword) === false ? false : true }>Submit</button>
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

export default UpdatePassword;