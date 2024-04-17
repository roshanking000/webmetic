import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import { toast } from "react-toastify";
import validator from "validator";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

import Footer from "@/pages/authentication/footer";
import OrnamentIcon from "../../assets/icons/OrnamentIcon";

const Signup = () => {
  const navigate = useNavigate();

  const [loadingView, setLoadingView] = useState(false);
  const [name, setName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [meter, setMeter] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
  const eightCharsOrMore = /.{8,}/g; // eight characters or more

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(workEmail)) {
      toast.error("Please enter a valid email!");
      return;
    }

    setLoadingView(true);

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
        name: name,
        email: workEmail,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setLoadingView(false);
        if (response.data.status === "success") navigate("/verifyemail");
        else toast.error(response.data.message);
      })
      .catch((error) => {
        setLoadingView(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-white">
      <div className="hidden sm:block bg-[url('assets/images/authentication-bg.jpg')] bg-cover bg-center bg-no-repeat w-[30vw] h-[100vh] rounded-3xl">
        <p className="text-[32px] font-bold text-[#FBFDFF] text-center mt-[15vh]">
          Unverbindlich testen
          <br />
          Identifiziere jedes Unternehmen
          <br />
          Verstehe deine Besucher
        </p>
      </div>
      <div className="flex flex-col justify-center gap-16 w-full">
        <div className="relative flex flex-col bg-main justify-center w-full">
          <div className="hidden sm:block">
            <OrnamentIcon />
          </div>
          <div className="flex flex-col justify-center gap-8 sm:w-1/2 mx-auto px-4">
            <p className="text-xl sm:text-[32px] text-center font-bold text-primary-600">
              Jetzt kostenlos ausprobieren!
            </p>
            <form className="flex flex-col justify-center gap-8 px-4" onSubmit={handleCreateAccount}>
              <div className="flex flex-col gap-6 text-sm text-[#111827]">
                <div className="flex flex-col gap-[10px]">
                  <p>
                    Name <span className="text-[#E03137]">*</span>
                  </p>
                  <input
                    type="text"
                    className="border border-input rounded-[10px] block w-full px-5 py-4 focus:ring-0 focus:border-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <p>
                    E-Mail <span className="text-[#E03137]">*</span>
                  </p>
                  <input
                    type="email"
                    className="border border-input rounded-[10px] block w-full px-5 py-4 focus:ring-0 focus:border-input"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
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
                      onFocus={() => setMeter(true)}
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
                  {meter && (
                    <div>
                      <div className="password-strength-meter"></div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center ml-3">
                          <div
                            className={clsx(
                              "rounded-full p-1 fill-current",
                              passwordTracker.eightCharsOrGreater
                                ? "bg-green-200 text-green-700"
                                : "bg-red-200 text-red-700"
                            )}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {passwordTracker.eightCharsOrGreater ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              )}
                            </svg>
                          </div>
                          <span
                            className={clsx(
                              "text-sm font-medium",
                              passwordTracker.eightCharsOrGreater
                                ? "text-green-700"
                                : "text-red-700"
                            )}
                          >
                            At least 8 characters required
                          </span>
                        </div>
                        <div className="flex gap-2 items-center ml-3">
                          <div
                            className={clsx(
                              "rounded-full p-1 fill-current",
                              passwordTracker.uppercase
                                ? "bg-green-200 text-green-700"
                                : "bg-red-200 text-red-700"
                            )}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {passwordTracker.uppercase ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              )}
                            </svg>
                          </div>
                          <span
                            className={clsx(
                              "text-sm font-medium",
                              passwordTracker.uppercase
                                ? "text-green-700"
                                : "text-red-700"
                            )}
                          >
                            Password should contain with one uppercase
                          </span>
                        </div>
                        <div className="flex gap-2 items-center ml-3">
                          <div
                            className={clsx(
                              "rounded-full p-1 fill-current",
                              passwordTracker.lowercase
                                ? "bg-green-200 text-green-700"
                                : "bg-red-200 text-red-700"
                            )}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {passwordTracker.lowercase ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              )}
                            </svg>
                          </div>
                          <span
                            className={clsx(
                              "text-sm font-medium",
                              passwordTracker.lowercase
                                ? "text-green-700"
                                : "text-red-700"
                            )}
                          >
                            Password should contain with one lowercase
                          </span>
                        </div>
                        <div className="flex gap-2 items-center ml-3">
                          <div
                            className={clsx(
                              "rounded-full p-1 fill-current",
                              passwordTracker.specialChar
                                ? "bg-green-200 text-green-700"
                                : "bg-red-200 text-red-700"
                            )}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {passwordTracker.specialChar ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              )}
                            </svg>
                          </div>
                          <span
                            className={clsx(
                              "text-sm font-medium",
                              passwordTracker.specialChar
                                ? "text-green-700"
                                : "text-red-700"
                            )}
                          >
                            Password should contain with one special character
                          </span>
                        </div>
                        <div className="flex gap-2 items-center ml-3">
                          <div
                            className={clsx(
                              "rounded-full p-1 fill-current",
                              passwordTracker.number
                                ? "bg-green-200 text-green-700"
                                : "bg-red-200 text-red-700"
                            )}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {passwordTracker.number ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              )}
                            </svg>
                          </div>
                          <span
                            className={clsx(
                              "text-sm font-medium",
                              passwordTracker.number
                                ? "text-green-700"
                                : "text-red-700"
                            )}
                          >
                            Password should contain with one number
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className={clsx(
                    "flex items-center justify-center text-white focus:ring-0 font-bold text-center rounded-[10px] text-base px-6 py-5",
                    name === "" ||
                      workEmail === "" ||
                      password === "" ||
                      !passwordTracker.eightCharsOrGreater ||
                      !passwordTracker.uppercase ||
                      !passwordTracker.lowercase ||
                      !passwordTracker.specialChar ||
                      !passwordTracker.number ||
                      loadingView === true
                      ? "cursor-not-allowed bg-primary-400"
                      : "bg-primary-500"
                  )}
                  disabled={
                    name === "" ||
                    workEmail === "" ||
                    password === "" ||
                    !passwordTracker.eightCharsOrGreater ||
                    !passwordTracker.uppercase ||
                    !passwordTracker.lowercase ||
                    !passwordTracker.specialChar ||
                    !passwordTracker.number ||
                    loadingView === true
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
                  Kostenloses Konto erstellen
                </button>
                {/* <div className="flex p-[10px] justify-between items-center gap-[10px]">
                <div className="h-[1px] bg-[#CBD5E0] w-[35%]"></div>
                <p className="text-sm text-greyscale text-center">
                  Or register with
                </p>
                <div className="h-[1px] bg-[#CBD5E0] w-[35%]"></div>
              </div>
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  className="text-[#111827] bg-white hover:bg-gray-100 border border-[#CBD5E0] focus:ring-0 font-bold rounded-[10px] text-sm px-[30px] py-[21px] text-center inline-flex justify-center items-center w-full"
                  onClick={signupWithGoogle}
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
                <p className="text-sm text-[#A0AEC0]">
                  Du hast bereits ein Konto?{" "}
                  <a
                    className="text-sm text-[#3562D4]"
                    href="\signin"
                    rel="noreferrer"
                  >
                    Dann logge dich hier ein.
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
