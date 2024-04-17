import { useState } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import validator from "validator";

import { sendResetCode } from "@/api/authentication";
import Footer from "@/pages/authentication/footer";
import OrnamentIcon from "@/assets/icons/OrnamentIcon";

const ForgotPassword = () => {
  const [loadingView, setLoadingView] = useState(false);
  const [email, setEmail] = useState("");

  const sendCode = async () => {
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    setLoadingView(true);

    const result = await sendResetCode(email);
    setLoadingView(false);
    if (result.status === "success") toast.success(result.msg);
    else toast.error(result.msg);
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-white">
      <div className="hidden sm:block bg-[url('assets/images/authentication-bg.jpg')] bg-cover bg-center bg-no-repeat w-[30vw] h-[100vh] rounded-3xl">
        <p className="text-[32px] font-bold text-[#FBFDFF] text-center mt-[15vh]">
          Unlock Insights,
          <br />
          Tailor Experiences:
          <br />
          Know Your Visitors
        </p>
      </div>
      <div className="flex flex-col justify-center gap-16 w-full">
        <div className="relative flex flex-col bg-main justify-center w-full">
          <div className="hidden sm:block">
            <OrnamentIcon />
          </div>
          <div className="flex flex-col justify-center gap-8 sm:w-1/2 mx-auto px-4">
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-2xl sm:text-[32px] font-bold text-neutral-800">
                Forgot Password
              </p>
              <p className="text-lg text-center text-[#111827] font-normal">
                You will receive a reset email if user with that email exist
              </p>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p>
                E-Mail <span className="text-[#E03137]">*</span>
              </p>
              <input
                type="email"
                className="border border-input rounded-[10px] block w-full px-5 py-4 focus:ring-0 focus:border-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className={clsx(
                "text-white bg-primary-500 focus:ring-0 font-bold text-center rounded-[10px] text-base px-6 py-5",
                email === "" || loadingView === true
                  ? "cursor-not-allowed bg-primary-400"
                  : "bg-primary-500"
              )}
              disabled={email === "" || loadingView === true ? true : false}
              onClick={sendCode}
            >
              {loadingView === true && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Send Reset Code
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;
