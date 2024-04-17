import { useNavigate } from "react-router-dom";

import DashboardIcon from "../assets/icons/DashboardIcon";
import LeadProfileIcon from "../assets/icons/LeadProfileIcon";
import AnalyticsIcon from "../assets/icons/AnalyticsIcon";
import CompanyProfileIcon from "../assets/icons/CompanyProfileIcon";
import TriggerIcon from "../assets/icons/TriggerIcon";
import IntegrationIcon from "../assets/icons/IntegrationIcon";
import ConnectedWebsitesIcon from "../assets/icons/ConnectedWebsitesIcon";

import settingIcon from "../assets/images/setting.svg";
import recibaIcon from "../assets/images/reciba.svg";
import logoutIcon from "../assets/images/logout.svg";

const DashboardSidebar = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-between px-[10px] py-[52px] text-lg font-normal text-grayscale">
      <div className="flex flex-col gap-9">
        <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="relative flex justify-center rounded-lg w-10 h-10 items-center bg-sidebar">
            <DashboardIcon />
          </div>
          <p>Dashboard</p>
        </div>
        <div
          className="flex flex-col gap-[5px] items-center cursor-pointer"
          onClick={() => navigate("/lead-profile")}
        >
          <div className="relative flex justify-center rounded-lg w-10 h-10 items-center bg-sidebar">
            <LeadProfileIcon />
          </div>
          <p className="text-center leading-none">
            Lead
            <br /> Profile
          </p>
        </div>
        <div className="flex flex-col gap-[5px] items-center cursor-pointer">
          <div className="relative flex justify-center rounded-lg w-10 h-10 items-center bg-sidebar">
            <AnalyticsIcon />
          </div>
          <p>Analytics</p>
        </div>
        <div className="flex flex-col gap-[5px] items-center cursor-pointer">
          <div className="relative flex justify-center rounded-lg w-10 h-10 items-center bg-sidebar">
            <CompanyProfileIcon />
          </div>
          <p className="text-center leading-none">
            Company
            <br /> Profile
          </p>
        </div>
        <div className="flex flex-col gap-[5px] items-center cursor-pointer">
          <div className="relative flex justify-center rounded-lg w-10 h-10 items-center bg-sidebar">
            <TriggerIcon />
          </div>
          <p>Trigger</p>
        </div>
        <div className="flex flex-col gap-[5px] items-center cursor-pointer">
          <div className="relative flex justify-center rounded-lg w-10 h-10 items-center bg-sidebar">
            <IntegrationIcon />
          </div>
          <p>Integration</p>
        </div>
        <div className="flex flex-col gap-[5px] items-center cursor-pointer">
          <div className="relative flex justify-center rounded-lg w-10 h-10 items-center bg-sidebar">
            <ConnectedWebsitesIcon />
          </div>
          <p className="text-center leading-none">
            Connected
            <br /> Websites
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <svg
          className="cursor-pointer w-6 h-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1 9.21994C18.29 9.21994 17.55 7.93994 18.45 6.36994C18.97 5.45994 18.66 4.29994 17.75 3.77994L16.02 2.78994C15.23 2.31994 14.21 2.59994 13.74 3.38994L13.63 3.57994C12.73 5.14994 11.25 5.14994 10.34 3.57994L10.23 3.38994C9.78 2.59994 8.76 2.31994 7.97 2.78994L6.24 3.77994C5.33 4.29994 5.02 5.46994 5.54 6.37994C6.45 7.93994 5.71 9.21994 3.9 9.21994C2.86 9.21994 2 10.0699 2 11.1199V12.8799C2 13.9199 2.85 14.7799 3.9 14.7799C5.71 14.7799 6.45 16.0599 5.54 17.6299C5.02 18.5399 5.33 19.6999 6.24 20.2199L7.97 21.2099C8.76 21.6799 9.78 21.3999 10.25 20.6099L10.36 20.4199C11.26 18.8499 12.74 18.8499 13.65 20.4199L13.76 20.6099C14.23 21.3999 15.25 21.6799 16.04 21.2099L17.77 20.2199C18.68 19.6999 18.99 18.5299 18.47 17.6299C17.56 16.0599 18.3 14.7799 20.11 14.7799C21.15 14.7799 22.01 13.9299 22.01 12.8799V11.1199C22 10.0799 21.15 9.21994 20.1 9.21994ZM12 15.2499C10.21 15.2499 8.75 13.7899 8.75 11.9999C8.75 10.2099 10.21 8.74994 12 8.74994C13.79 8.74994 15.25 10.2099 15.25 11.9999C15.25 13.7899 13.79 15.2499 12 15.2499Z"
            fill="#173206"
          />
        </svg>
        <svg
          className="cursor-pointer w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M21.0881 12.9898L21.0676 12.9693V12.0676C21.0676 9.63935 20.125 7.36475 18.4139 5.65369C16.7029 3.94262 14.418 3 11.9898 3C9.56148 3 7.28688 3.94262 5.56557 5.65369C3.85451 7.375 2.91189 9.64959 2.91189 12.0676V12.9693L2.89139 12.9898C2.32787 13.5635 2 14.3422 2 15.1414V17.8771C2 18.6865 2.32787 19.4652 2.89139 20.0287C3.45492 20.5922 4.23361 20.9201 5.04303 20.9201C5.85246 20.9201 6.6209 20.6025 7.19467 20.0287C7.76844 19.4652 8.09631 18.6762 8.09631 17.8771V15.1414C8.09631 14.3422 7.76844 13.5635 7.19467 12.9898C6.47746 12.2725 5.41188 12.0061 4.44877 12.1803V12.0676C4.44877 10.0594 5.2377 8.16394 6.66189 6.73975C8.08607 5.31557 9.98156 4.52664 12 4.52664C14.0184 4.52664 15.9037 5.31557 17.3381 6.73975C18.7623 8.16394 19.5512 10.0594 19.5512 12.0676V12.1906C18.5779 12.0061 17.5225 12.2725 16.8053 12.9898C16.2316 13.5635 15.9139 14.3422 15.9139 15.1414V17.8771C15.9139 18.6762 16.2316 19.4652 16.8053 20.0287C16.8566 20.0799 16.918 20.1414 16.9795 20.1824C16.0984 20.8484 15.0533 21.2992 13.957 21.4631C13.5369 21.5246 13.2398 21.9139 13.3012 22.334C13.3525 22.7131 13.6803 22.9898 14.0594 22.9898H14.1721C15.791 22.7643 17.3176 22.0164 18.5164 20.8996C18.6598 20.9201 18.8135 20.9303 18.957 20.9303C19.7561 20.9303 20.5451 20.6127 21.1086 20.0389C21.6721 19.4754 22 18.6967 22 17.8873V15.1516C22 14.3525 21.6721 13.5738 21.1086 13L21.0881 12.9898Z"
            fill="#173206"
          />
        </svg>
        <svg
          className="cursor-pointer w-6 h-6"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0404 13.7527C15.8446 13.7366 15.6504 13.7988 15.5003 13.9257C15.3503 14.0526 15.2568 14.2338 15.2402 14.4295C15.1746 15.2036 15.0933 15.8769 15.0222 16.2307V16.235C14.8125 17.3168 13.7877 18.3861 12.7368 18.6212C12.6458 18.6399 12.5544 18.6579 12.4634 18.6751C12.5415 17.6702 12.5997 16.3854 12.5919 15.3946C12.6036 13.8808 12.4587 11.5501 12.3303 10.6226C12.0994 8.91475 11.0493 7.02063 9.88744 6.21573L9.88041 6.21105C9.07258 5.66531 8.20682 5.21068 7.29894 4.85548C7.137 4.79274 6.97701 4.73416 6.81897 4.67974C7.68081 4.54649 8.55179 4.4812 9.42387 4.48447C10.6111 4.48447 11.6948 4.59265 12.7368 4.80901C13.7877 5.04333 14.8125 6.11341 15.0222 7.1952V7.1995C15.0929 7.55098 15.1742 8.22427 15.2398 8.99598C15.2564 9.1921 15.3504 9.37357 15.5008 9.50046C15.6513 9.62735 15.846 9.68926 16.0421 9.67259C16.2383 9.65591 16.4197 9.56201 16.5466 9.41154C16.6735 9.26106 16.7354 9.06635 16.7187 8.87022C16.6477 8.03486 16.5602 7.32057 16.4782 6.90972C16.1544 5.24563 14.6817 3.71902 13.0524 3.35816L13.043 3.35621C11.8979 3.11876 10.7146 3.00238 9.42113 3.00003C8.12767 2.99769 6.94902 3.1172 5.80396 3.3566L5.7942 3.35855C5.06701 3.51984 4.37146 3.9135 3.79503 4.44737C3.63924 4.56484 3.50307 4.70628 3.3916 4.86642C2.88234 5.46082 2.5125 6.17199 2.36878 6.90972C2.18874 7.81225 1.98527 10.1528 2.00089 11.7149C1.9923 12.553 2.04659 13.6153 2.12704 14.5592C2.17 15.1645 2.21881 15.6918 2.26568 16.03C2.49649 17.7378 3.54665 19.6319 4.70889 20.4368L4.71553 20.4415C5.52354 20.9872 6.38942 21.4418 7.29738 21.7971C8.21671 22.154 9.06027 22.3704 9.87689 22.4586H9.88392C10.9813 22.5567 11.9788 21.6041 12.2807 20.2115C12.5361 20.1709 12.7893 20.1246 13.0403 20.0728L13.0496 20.0709C14.6793 19.71 16.1517 18.1834 16.4754 16.5193C16.5574 16.1077 16.6453 15.3918 16.7164 14.5545C16.733 14.3586 16.6711 14.1641 16.5443 14.0137C16.4175 13.8634 16.2363 13.7695 16.0404 13.7527Z"
            fill="#173206"
          />
          <path
            d="M22.0001 11.7137C22.0001 11.6891 22.0001 11.6645 21.9962 11.6399C21.9964 11.6383 21.9964 11.6368 21.9962 11.6352C21.9939 11.6121 21.9903 11.5892 21.9857 11.5665V11.5614C21.9564 11.4204 21.8864 11.291 21.7845 11.1892L19.1289 8.53119C18.9897 8.39198 18.8009 8.31376 18.6041 8.31372C18.4073 8.31368 18.2185 8.39184 18.0793 8.531C17.9401 8.67015 17.8619 8.85891 17.8618 9.05574C17.8618 9.25258 17.9399 9.44136 18.0791 9.58057L19.4721 10.9732H14.3494C14.1526 10.9732 13.9639 11.0514 13.8248 11.1906C13.6856 11.3297 13.6074 11.5185 13.6074 11.7153C13.6074 11.9121 13.6856 12.1008 13.8248 12.2399C13.9639 12.3791 14.1526 12.4573 14.3494 12.4573H19.4655L18.0736 13.8492C17.9349 13.9884 17.8572 14.177 17.8574 14.3735C17.8576 14.5701 17.9357 14.7585 18.0747 14.8975C18.2137 15.0364 18.4021 15.1146 18.5986 15.1148C18.7952 15.115 18.9837 15.0372 19.123 14.8985L21.7666 12.255C21.8624 12.1652 21.9326 12.0514 21.9696 11.9254C21.9763 11.9029 21.9818 11.8801 21.986 11.857C21.9862 11.8538 21.9862 11.8505 21.986 11.8473C21.9896 11.8273 21.9931 11.8082 21.995 11.7871C21.997 11.766 21.995 11.7567 21.995 11.7418C21.995 11.7332 21.995 11.7246 21.995 11.716L22.0001 11.7137Z"
            fill="#173206"
          />
        </svg>
      </div>
    </section>
  );
};

export default DashboardSidebar;
