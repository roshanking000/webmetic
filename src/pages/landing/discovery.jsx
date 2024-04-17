import Header from "./header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { LandingDashboardImage } from "../../assets/icons";

const Discovery = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full">
      <div className="bg-green_medium px-2">
        <div className="flex flex-col items-center gap-24 pt-[78px] max-w-[1200px] mx-auto">
          <Header />
          <div className="flex flex-col items-center gap-20">
            <div className="flex flex-col justify-center items-center gap-10">
              <div className="flex flex-col justify-center items-center gap-6 text-center">
                <p className="hidden sm:block text-[64px] font-black text-white max-w-4xl">
                  {t('landing.discovery.title')}
                </p>
                <p className="sm:hidden text-4xl font-black text-white max-w-xs">
                {t('landing.discovery.title')}
                </p>
                <p className="text-lg sm:text-2xl text-[#3F6129] font-normal max-w-sm sm:max-w-[800px]">
                  {t('landing.discovery.info')}
                  <br />
                </p>
              </div>
              <Link to="signup">
              <button
                type="button"
                className="inline-flex gap-[13px] items-center text-lg sm:text-2xl font-medium text-[#EFFFFB] px-7 py-3 bg-landing_color rounded-lg"
              >
                {t('landing.signup_button')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                >
                  <path
                    d="M25.834 16L7.16732 16M25.834 16L17.834 8M25.834 16L17.834 24"
                    stroke="#EFFFFB"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              </Link>
            </div>
            <div className="h-[100px] sm:h-[350px]">
              <LandingDashboardImage />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100px] sm:h-[300px] bg-white"></div>
    </section>
  );
};

export default Discovery;
