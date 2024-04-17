import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import { toast } from "react-toastify";
import validator from "validator";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

import { useAuth } from "../../provider/authProvider";
import Footer from "@/pages/authentication/footer";
import OrnamentIcon from "../../assets/icons/OrnamentIcon";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import AppleIcon from "../../assets/icons/AppleIcon";

const Signin = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loadingView, setLoadingView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state !== null) toast.success(state);
  }, [state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    setLoadingView(true);

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/auth/signin`, {
        email: email,
        password: password,
      })
      .then(async (response) => {
        setLoadingView(false);
        if (response.data.code === 200) {
          await signIn(response.data.data[0].access_token);
          navigate("/dashboard");
        } else toast.error(response.data.message);
      })
      .catch((error) => {
        setLoadingView(false);
        console.log(error);
        toast.error(error.response.statusText);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-white">
      <div className="hidden sm:block bg-[url('assets/images/authentication-bg.jpg')] bg-cover bg-center bg-no-repeat w-[30vw] h-[100vh] rounded-3xl">
        <p className="text-[32px] font-bold text-[#FBFDFF] text-center mt-[15vh]">
          Identifiziere jedes Unternehmen
          <br />
          Verstehe deine Besucher
        </p>
      </div>
      <div className="flex flex-col justify-center gap-16 w-full pt-12 sm:pt-0">
        <div className="relative flex flex-col bg-main justify-center w-full">
          <div className="hidden sm:block">
            <OrnamentIcon />
          </div>
          <div className="flex flex-col justify-center gap-16 sm:w-1/2 mx-auto">
            <p className="text-2xl sm:text-4xl text-center font-bold text-primary-600">
              Willkommen zurück 👋
            </p>
            <div className="flex flex-col gap-8 text-sm text-[#111827] w-full px-4">
              <p className="text-xl sm:text-2xl font-bold text-center text-primary-500">
                Jetzt einfach einloggen
              </p>
              <form className="flex flex-col gap-8 text-sm text-[#111827] w-full px-4" onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
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
                  <div className="flex flex-col gap-[10px]">
                    <p>
                      Passwort <span className="text-[#E03137]">*</span>
                    </p>
                    <div className="relative">
                      <input
                        type={showPassword === false ? "password" : "text"}
                        className="border border-input rounded-[10px] block w-full px-5 py-4 focus:ring-0 focus:border-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {showPassword === false ? (
                        <EyeSlashIcon
                          className="absolute top-[30%] right-4 w-6 h-6 cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      ) : (
                        <EyeIcon
                          className="absolute top-[30%] right-4 w-6 h-6 cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {/* <div className="flex gap-2 items-center">
                    <input
                      checked={rememberMe === true ? true : false}
                      type="checkbox"
                      onChange={() => setRememberMe(!rememberMe)}
                      className="w-5 h-5 text-[#3562D4] bg-gray-100 border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-gray-300"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="text-sm text-greyscale"
                    >
                      Login merken
                    </label>
                  </div> */}
                    <p className="text-sm text-greyscale cursor-pointer">
                      <a href="/forgot-password">Forgot Password</a>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    className={clsx(
                      "flex items-center justify-center text-white focus:ring-0 font-bold text-center rounded-[10px] text-base px-6 py-5",
                      email === "" || password === "" || loadingView === true
                        ? "cursor-not-allowed bg-primary-400"
                        : "bg-primary-500"
                    )}
                    disabled={
                      email === "" || password === "" || loadingView === true
                        ? true
                        : false
                    }
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
                    Login
                  </button>
                  {/* <div className="flex p-[10px] justify-between items-center gap-[10px]">
                  <div className="h-[1px] bg-[#CBD5E0] w-[35%]"></div>
                  <p className="text-sm text-greyscale text-center">
                    Or login with
                  </p>
                  <div className="h-[1px] bg-[#CBD5E0] w-[35%]"></div>
                </div>
                <div className="flex gap-4 w-full">
                  <button
                    type="button"
                    className="text-[#111827] bg-white hover:bg-gray-100 border border-[#CBD5E0] focus:ring-0 font-bold rounded-[10px] text-sm px-[30px] py-[21px] text-center inline-flex justify-center items-center w-full"
                  >
                    <GoogleIcon />
                    Google
                  </button>
                  <button
                    type="button"
                    className="text-[#111827] bg-white hover:bg-gray-100 border border-[#CBD5E0] focus:ring-0 font-bold rounded-[10px] text-sm px-[30px] py-[21px] text-center inline-flex justify-center items-center w-full"
                  >
                    <AppleIcon />
                    Apple
                  </button>
                </div> */}
                </div>
              </form>
              <p className="text-sm text-center text-[#A0AEC0]">
                Noch kein Konto?{" "}
                <a
                  className="text-sm text-[#3562D4]"
                  href="\signup"
                  rel="noreferrer"
                >
                  Jetzt kostenloses Konto erstellen
                </a>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Signin;
