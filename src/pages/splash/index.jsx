import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { addWebsite } from "@/api/connectedWebsitesService";

import { useAuth } from "@/provider/authProvider";

import SplashSide from "@/assets/images/splash_side.svg";
import SplashIcon from "@/assets/images/splash_icon.svg";
import WarnIcon from "@/assets/images/warn_icon.svg";
import SplashCharts from "@/assets/images/splash_charts.svg";
import DashImage from "@/assets/images/dash_img.png";

const Splash = ({ websiteSubmit }) => {
  const { account } = useAuth();
  const navigate = useNavigate();

  const [loadingView, setLoadingView] = useState(false);
  const website = useRef("");

  const handleSubmit = async () => {
    if (website.current.value === "") {
      toast.error("Please enter a domain!");
      return;
    }
    if (isValidURL(website.current.value) === false) {
      toast.error("Please enter a correct domain!");
      return;
    }

    setLoadingView(true);

    const result = await addWebsite(account.email, website.current.value);
    setLoadingView(false);
    if (result.status === "success" || result.status === "warning") {
      if (result.status === "success") toast.success(result.msg);
      else toast.warn(result.msg);
      navigate("/connected-websites");
    } else toast.error(result.msg);
  };

  const isValidURL = (url) => {
    // Regular expression to match valid URLs
    const urlRegex = /^(https):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
  };

  return (
    <div className="bg-green_dark pt-14 sm:pt-18 xl:pt-[132px] relative pb-56">
      <div className="absolute right-0 bottom-0">
        <img
          src={SplashSide}
          alt="Splash side screen"
          className="max-w-[550px] md:max-w-[650px] md:h-[600px] lg:max-w-[850px] lg:h-[750px] xl:max-w-[1030px] xl:h-[945px] w-full"
        />
      </div>
      <div className="absolute right-16 sm:right-[110px] bottom-1.5">
        <img
          src={DashImage}
          alt="Dashboard screen view"
          className="max-w-[275px] md:max-w-[380px] lg:max-w-[530px] xl:max-w-[708px] w-full"
        />
      </div>
      <div className="flex justify-between pl-9 pr-9 md:pl-12 md:pr-12 lg:pl-[67px] lg:pr-[60px] flex-wrap lg:flex-nowrap">
        <div className="max-w-[604px] w-full">
          <div className="flex items-end">
            <h1 className="max-w-[220px] md:max-w-[250px] text-3xl md:text-4xl text-left text-gray_light leading-10 sm:!leading-[54px]">
              Welcome <br />
              to{" "}
              <span className="text-3xl md:text-[40px] text-green_medium">
                {" "}
                Webmetic
              </span>
            </h1>
            <img src={SplashIcon} alt="webmetic icon" className="ml-7 pb-2" />
          </div>
          <div className="mt-10 md:mt-14 lg:mt-[62px] max-w-[450px] md:max-w-[560px] xl:max-w-[604px]">
            <h2 className="text-3xl md:text-4xl text-green_medium mb-[30px] text-left">
              Add your website
            </h2>
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex flex-col gap-2">
                <div className="relative flex items-start py-2 rounded-lg bg-gray-50 border border-gray-300 w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.832 11C9.6665 12.177 9.3865 13.1908 9.0265 13.9298C8.851 14.2903 8.6595 14.5805 8.44875 14.7773C8.30525 14.9113 8.1595 15 8 15C7.8405 15 7.69475 14.9113 7.55125 14.7773C7.3405 14.5805 7.149 14.2903 6.9735 13.9298C6.6135 13.1908 6.3335 12.177 6.168 11H9.832ZM14.001 11C13.2348 12.835 11.6512 14.245 9.70625 14.7732C10.2175 13.9142 10.6245 12.585 10.8375 11H14.001ZM5.1625 11C5.3755 12.585 5.7825 13.9142 6.29375 14.7732C4.3485 14.2448 2.765 12.8348 1.999 11H5.1625ZM5.05725 7C5.01975 7.484 5 7.98575 5 8.5C5 9.01425 5.01975 9.516 5.05725 10H1.67425C1.56025 9.5185 1.5 9.01625 1.5 8.5C1.5 7.98375 1.56025 7.4815 1.67425 7H5.05725ZM9.94125 7C9.97975 7.4825 10 7.9845 10 8.5C10 9.0155 9.97975 9.5175 9.94125 10H6.05875C6.02025 9.5175 6 9.0155 6 8.5C6 7.9845 6.02025 7.4825 6.05875 7H9.94125ZM14.3258 7C14.4398 7.4815 14.5 7.98375 14.5 8.5C14.5 9.01625 14.4398 9.5185 14.3258 10H10.9427C10.9803 9.516 11 9.01425 11 8.5C11 7.98575 10.9803 7.484 10.9427 7H14.3258ZM6.29375 2.22675C5.7825 3.08575 5.3755 4.415 5.1625 6H1.999C2.76525 4.165 4.34875 2.755 6.29375 2.22675ZM8 2C8.1595 2 8.30525 2.08875 8.44875 2.22275C8.6595 2.4195 8.851 2.70975 9.0265 3.07025C9.3865 3.80925 9.6665 4.823 9.832 6H6.168C6.3335 4.823 6.6135 3.80925 6.9735 3.07025C7.149 2.70975 7.3405 2.4195 7.55125 2.22275C7.69475 2.08875 7.8405 2 8 2ZM9.70625 2.22675C11.6515 2.75525 13.235 4.16525 14.001 6H10.8375C10.6245 4.415 10.2175 3.08575 9.70625 2.22675Z"
                        fill="#64748B"
                      />
                    </svg>
                  </div>
                  <input
                    ref={website}
                    type="text"
                    className="bg-gray-50 block w-full h-5 pl-10 text-sm font-normal text-[#6B7280] border-none focus:ring-0"
                    placeholder="Write website here"
                  />
                </div>
              </div>
              <button
                className="flex items-center justify-center py-2 px-3.5 sm:py-3 sm:px-8 md:py-4 md:px-[50px] xl:px-16 text-base md:text-lg xl:text-xl font-medium text-gray_light border border-green_light rounded-2xl hover:opacity-80 transition duration-300"
                onClick={handleSubmit}
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
                Submit
              </button>
            </div>
            <div className="mb-3.5 text-left flex justify-between">
              {/* <button className="py-2 px-3.5 sm:py-3 sm:px-8 md:py-4 md:px-[50px] xl:px-16 text-base md:text-lg xl:text-xl font-medium text-gray_light border border-green_light rounded-2xl hover:opacity-80 transition duration-300" onClick={() => setShowDialog(true)}>
                Personal website
              </button>
              <button className="py-2 px-3.5 sm:py-3 sm:px-8 md:py-4 md:px-[44px] xl:px-[60px] text-base md:text-lg xl:text-xl font-medium text-gray_light border border-green_light rounded-2xl hover:opacity-80 transition duration-300 z-50">
                Company website
              </button> */}
            </div>
            <div className="flex">
              <img
                src={WarnIcon}
                alt="information icon"
                className="mr-2 sm:mr-2.5 inlie-block"
              ></img>
              <p className="text-xs sm:text-sm font-normal text-green_light whitespace-nowrap">
                You need to add at-least one website to start with Webmetic
              </p>
            </div>
          </div>
        </div>
        <div className="text-left max-w-[660px] mt-9 lg:mt-0">
          <h2 className="text-[25px] md:text-[32px] text-gray_light pb-2">
            Precision Profiling:
          </h2>
          <h2 className="text-[25px] md:text-[32px] text-gray_light">
            Transforming <span className="text-green_medium">Visitor</span> Data
            into <span className="text-green_medium">Engagement</span>
          </h2>
        </div>
      </div>
      <div className="pb-7 xl:pb-0 mt-12 md:mt-14 xl:mt-[110px] pl-[67px]">
        <img
          src={SplashCharts}
          alt="webmetic charts"
          className="max-w-[180px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[350px] xl:max-w-[400px]"
        />
      </div>
    </div>
  );
};

export default Splash;
