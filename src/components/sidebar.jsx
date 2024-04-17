import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { useAuth } from "../provider/authProvider";

import dashboardIcon from "../assets/images/dashboard.svg";
import leadProfileIcon from "../assets/images/lead_profile.svg";
import analyticsIcon from "../assets/images/analytics.svg";
import companyProfileIcon from "../assets/images/company_profile.svg";
import triggerIcon from "../assets/images/trigger.svg";
import integrationIcon from "../assets/images/integration.svg";
import settingIcon from "../assets/images/setting.svg";
import recibaIcon from "../assets/images/reciba.svg";
import logoutIcon from "../assets/images/logout.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { signOut } = useAuth();
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(pathname);

  return (
    <section className="hidden sm:flex flex-col fixed h-full items-center justify-between gap-12 px-[10px] w-[120px] py-[52px] text-lg font-normal text-sidebar">
      <div className="flex flex-col gap-9">
        <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => {
            setCurrentPage("/dashboard");
            navigate("/dashboard");
          }}
        >
          <div
            className={clsx(
              "relative flex justify-center rounded-lg w-10 h-10 items-center hover:bg-sidebar-item",
              currentPage === "/dashboard" ? "bg-sidebar-item" : "bg-white"
            )}
          >
            <img alt="dashboard" className="absolute" src={dashboardIcon} />
          </div>
          <p className="max-w-[95px] text-center break-words">{t('sidebar.dashboard')}</p>
        </div>
        <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => {
            setCurrentPage("/lead-profile");
            navigate("/lead-profile");
          }}
        >
          <div
            className={clsx(
              "relative flex justify-center rounded-lg w-10 h-10 items-center hover:bg-sidebar-item",
              currentPage === "/lead-profile" ? "bg-sidebar-item" : "bg-white"
            )}
          >
            <img
              alt="lead profile"
              className="absolute"
              src={leadProfileIcon}
            />
          </div>
          <p className="max-w-[95px] text-center break-words">
            {t('sidebar.leadprofile')}
          </p>
        </div>
        <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => {
            setCurrentPage("/analytics");
            navigate("/analytics");
          }}
        >
          <div
            className={clsx(
              "relative flex justify-center rounded-lg w-10 h-10 items-center hover:bg-sidebar-item",
              currentPage === "/analytics" ? "bg-sidebar-item" : "bg-white"
            )}
          >
            <img alt="analytics" className="absolute" src={analyticsIcon} />
          </div>
          <p className="max-w-[95px] text-center break-words">{t('sidebar.analytics')}</p>
        </div>
        <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => {
            setCurrentPage("/company-profiles");
            navigate("/company-profiles");
          }}
        >
          <div
            className={clsx(
              "relative flex justify-center rounded-lg w-10 h-10 items-center hover:bg-sidebar-item",
              currentPage === "/company-profiles"
                ? "bg-sidebar-item"
                : "bg-white"
            )}
          >
            <img
              alt="company profile"
              className="absolute"
              src={companyProfileIcon}
            />
          </div>
          <p className="max-w-[95px] text-center break-words">
            {t('sidebar.companyprofile')}
          </p>
        </div>
        {/* <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => {
            if (connectedWebsites.length === 0) {
              toast.warn(
                "You need to add at-least one website to start with Webmetic!"
              );
              return;
            }

            setCurrentPage("/trigger");
            // navigate("/trigger");
          }}
        >
          <div
            className={clsx(
              "relative flex justify-center rounded-lg w-10 h-10 items-center hover:bg-sidebar-item",
              currentPage === "/trigger" ? "bg-sidebar-item" : "bg-white"
            )}
          >
            <img alt="trigger" className="absolute" src={triggerIcon} />
          </div>
          <p>Trigger</p>
        </div>
        <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => {
            if (connectedWebsites.length === 0) {
              toast.warn(
                "You need to add at-least one website to start with Webmetic!"
              );
              return;
            }

            setCurrentPage("/integration");
          }}
        >
          <div
            className={clsx(
              "relative flex justify-center rounded-lg w-10 h-10 items-center hover:bg-sidebar-item",
              currentPage === "/integration" ? "bg-sidebar-item" : "bg-white"
            )}
          >
            <img alt="integration" className="absolute" src={integrationIcon} />
          </div>
          <p>Integration</p>
        </div> */}
        <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => {
            setCurrentPage("/connected-websites");
            navigate("/connected-websites");
          }}
        >
          <div
            className={clsx(
              "relative flex justify-center rounded-lg w-10 h-10 items-center hover:bg-sidebar-item",
              currentPage === "/connected-websites"
                ? "bg-sidebar-item"
                : "bg-white"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M20.834 3.125H8.33398C7.18503 3.125 6.25065 4.05937 6.25065 5.20833V5.72917H16.6673C18.6777 5.72917 20.3132 7.36458 20.3132 9.375V17.7083H20.834C21.9829 17.7083 22.9173 16.774 22.9173 15.625V5.20833C22.9173 4.05937 21.9829 3.125 20.834 3.125Z"
                fill="#173206"
              />
              <path
                d="M16.6673 7.29167H4.16732C3.01836 7.29167 2.08398 8.22604 2.08398 9.375V19.7917C2.08398 20.9406 3.01836 21.875 4.16732 21.875H16.6673C17.8163 21.875 18.7507 20.9406 18.7507 19.7917V9.375C18.7507 8.22604 17.8163 7.29167 16.6673 7.29167ZM4.16732 19.7917V13.5417H16.6684L16.6694 19.7917H4.16732Z"
                fill="#173206"
              />
            </svg>
          </div>
          <p className="max-w-[95px] text-center break-words">
            {t('sidebar.connectedwebsites')}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <img
          alt="setting"
          className="w-6 h-6 cursor-pointer"
          src={settingIcon}
          onClick={() => navigate("/settings")}
        />
        <img
          alt="reciba"
          className="w-6 h-6 cursor-pointer"
          src={recibaIcon}
          onClick={() => navigate("/help-center")}
        />
        <img
          alt="logout"
          className="w-6 h-6 cursor-pointer"
          src={logoutIcon}
          onClick={async () => {
            await signOut();
          }}
        />
      </div>
    </section>
  );
};

export default Sidebar;
