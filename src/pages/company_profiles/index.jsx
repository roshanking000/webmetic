import { useState, useEffect, Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import { Dropdown, Modal } from "flowbite-react";
import clsx from "clsx";
import { format } from "date-fns";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { fetchCompanyProfilesData } from "@/api/company_profile";
import { fetchConnectedWebsites } from "@/api/connectedWebsitesService";

import { useAuth } from "../../provider/authProvider";
import { secondsToHMS } from "../../utils";

import InformationIcon from "../../assets/icons/InformationIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import HeartOutlineIcon from "../../assets/icons/HeartOutlineIcon";
import DownloadReport from "../../assets/icons/DownloadReport";
import GridIcon from "../../assets/icons/GridIcon";
import EnvelopeIcon from "../../assets/icons/EnvelopeIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import AngleDownOutlineIcon from "../../assets/icons/AngleDownOutlineIcon";
import UpIcon from "../../assets/icons/UpIcon";
import DownIcon from "../../assets/icons/DownIcon";

import InstaMartIcon from "../../assets/testdata/insta_mart.png";
import InstagramIcon from "../../assets/testdata/instagram.png";
import SlackIcon from "../../assets/images/slack.png";
import GrippIcon from "../../assets/images/gripp.png";
import HubspotIcon from "../../assets/images/hubspot.png";
import RecordingIcon from "../../assets/icons/RecordingIcon";
import { t } from "i18next";

const CompanyProfilesPage = () => {
  const { account } = useAuth();
  const [period] = useOutletContext();
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showHubSpotModal, setShowHubSpotModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const [showCompanyProfileData, setShowCompanyProfileData] = useState(false);
  const [companyProfilesData, setCompanyProfilesData] = useState(null);

  const [connectedWebsites, setConnectedWebsites] = useState([]);
  const [loadingView, setLoadingView] = useState(false);

  useEffect(() => {
    getConnectedWebsitesData();
  }, []);

  useEffect(() => {
    if (selectedDomain.length !== 0)
      getCompanyProfilesData(selectedDomain, period);
  }, [selectedDomain, period]);

  const getConnectedWebsitesData = async () => {
    const result = await fetchConnectedWebsites(account._id);
    console.log(result);
    if (result.status === "success") {
      setConnectedWebsites(result.connected_websites);
      setSelectedDomain([...selectedDomain, result.connected_websites[0]]);
    } else toast.error("An unexpected error occurred!");
  };

  const getCompanyProfilesData = async (domain, period) => {
    setShowCompanyProfileData(false);
    const result = await fetchCompanyProfilesData(domain, period);
    console.log(result);
    if (result.status === "success") {
      setCompanyProfilesData(result.data.data);
      setSelectedItem(result.data.data[0]);
      setShowCompanyProfileData(true);
    } else toast.error("An unexpected error occurred!");
  };

  const getDownloadReport = async () => {
    exportToCsv(companyProfilesData);
  };

  const exportToCsv = (data) => {
    // Headers for each column
    let headers = ["Company,City,Domain,Duration,Pages"];
    // Convert data to a csv
    let reportDataCsv = data.reduce((acc, reportData) => {
      const { company, city, website_url, duration, pages } = reportData;
      acc.push([company, city, website_url, duration, pages].join(","));
      return acc;
    }, []);
    downloadFile({
      data: [...headers, ...reportDataCsv].join("\n"),
      fileName: "export.csv",
      fileType: "text/csv",
    });
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  return (
    <>
      {companyProfilesData !== null ? (
        <section className="flex gap-[6px]">
          {showCompanyProfileData === false && (
            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-[200px] flex-col space-y-2 mt-[300px]">
              <div className="w-20 h-20 border-t-8 border-b-8 dark:border-white border-indigo-900 rounded-full animate-spin"></div>
              <div className="text-indigo-900 dark:text-white font-bold text-[24px]">
                {t("loading")}
              </div>
            </div>
          )}
          <CompanyProfiles
            companyProfilesData={companyProfilesData}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <div className="flex flex-col gap-6 w-3/4">
            <div className="flex p-[10px] flex-col gap-[10px] rounded-2xl border border-dashboard w-full">
              <div className="flex gap-[10px]">
                {selectedItem.logo !== null ? (
                  <img
                    alt={selectedItem.company}
                    className="w-[60px] h-[60px] rounded-full"
                    src={`${import.meta.env.VITE_IMG_URL}${selectedItem.logo}`}
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-[10px] w-[60px] h-[60px] p-[10px] bg-green_medium rounded-full">
                    <p className="text-xl font-semibold text-primary-400">
                      {selectedItem.company.charAt(0).toUpperCase()}
                    </p>
                  </div>
                )}
                <div className="flex flex-col justify-center w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-primary-500">
                      {selectedItem?.company}
                    </p>
                    <div className="flex gap-[15px]">
                      {/* <button
                        type="button"
                        className="bg-white focus:ring-0 focus:outline-none font-medium rounded-lg border border-[#E0E2E7] text-xs text-secondary-400 px-3 py-[8px] text-center inline-flex items-center"
                      >
                        <HeartOutlineIcon />
                        Save this company
                      </button> */}
                      <button
                        type="button"
                        className="bg-secondary-400 focus:ring-0 focus:outline-none font-medium rounded-lg text-xs text-neutral-50 px-3 py-[8px] text-center inline-flex items-center"
                        onClick={() => setShowModal(true)}
                      >
                        <DownloadReport />
                        {t("company_profile.downloadreport_button")}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-[5px] text-base font-normal">
                    {/* <div className="flex pr-[10px] items-center gap-[10px]">
                      <GridIcon />
                      <p className="text-neutral-400">{selectedItem.type}</p>
                    </div> */}
                    <div className="flex pl-[5px] items-center gap-[5px]">
                      <EnvelopeIcon />
                      <p className="text-secondary-400">
                        {selectedItem.mail[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex p-[10px] flex-col justify-center gap-2">
                <p className="text-sm font-medium text-secondary-500">
                  Assigned Tags
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[10px]">
                    <p className="text-xs font-semibold text-ellipsis text-neutral-50 px-[10px] py-[5px] rounded-full bg-tertiary-400">
                      Top
                    </p>
                    <p className="text-xs font-semibold text-ellipsis text-neutral-50 px-[10px] py-[5px] rounded-full bg-tertiary-400">
                      Most Visited
                    </p>
                    <p className="text-xs font-semibold text-ellipsis text-neutral-50 px-[10px] py-[5px] rounded-full bg-tertiary-400">
                      E-Commerce
                    </p>
                    <p className="text-xs font-semibold text-ellipsis text-neutral-50 px-[10px] py-[5px] rounded-full bg-tertiary-400">
                      Website
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-[10px] cursor-pointer">
                    <PlusIcon />
                    <p className="text-xl font-medium text-primary-400">
                      Add Triggers
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-secondary-500">
                  Your Integrations
                </p>
                <div className="flex items-center gap-[10px]">
                  <div className="flex px-[10px] py-2 items-center gap-[10px] rounded-full bg-slack cursor-pointer">
                    <img src={SlackIcon} />
                    <p className="text-xs font-semibold text-neutral-50">
                      Share on Slack
                    </p>
                    <AngleDownOutlineIcon />
                  </div>
                  <div className="flex px-[10px] py-2 items-center gap-[10px] rounded-full bg-gripp cursor-pointer">
                    <img src={GrippIcon} />
                    <p className="text-xs font-semibold text-neutral-50">
                      Share on Gripp
                    </p>
                    <AngleDownOutlineIcon />
                  </div>
                  <div
                    className="flex px-[10px] py-2 items-center gap-[10px] rounded-full bg-hubspot cursor-pointer"
                    onClick={() => setShowHubSpotModal(true)}
                  >
                    <img src={HubspotIcon} />
                    <p className="text-xs font-semibold text-neutral-50">
                      Connect with HubSpot
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="flex gap-[14px]">
              <CompanyInformation selectedItem={selectedItem} />
              {/* <div className="flex flex-col gap-[9px] w-1/2">
                <CompanySummary />
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-neutral-800">
                    Add your comment
                  </p>
                  <textarea
                    rows="4"
                    className="block px-4 py-3 w-full text-sm font-normal text-neutral-300 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Write text here ..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="inline-flex place-self-end px-3 py-2 items-center gap-2 rounded-lg border border-primary-400 text-xs font-normal text-primary-400 w-auto"
                >
                  Submit
                </button>
              </div> */}
            </div>
            <SessionActivity selectedItem={selectedItem} />
            {/* <VisitorProfiles selectedItem={selectedItem} />
            <ViewedPages data={ViewedPagesData} /> */}
          </div>
          <DownloadModal
            showModal={showModal}
            setShowModal={setShowModal}
            handleDownloadReport={async () => await getDownloadReport()}
          />
          <HubSpotConnectModal
            showModal={showHubSpotModal}
            setShowModal={setShowHubSpotModal}
          />
        </section>
      ) : (
        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-[200px] flex-col space-y-2 mt-[300px]">
          <div className="w-20 h-20 border-t-8 border-b-8 dark:border-white border-indigo-900 rounded-full animate-spin"></div>
          <div className="text-indigo-900 dark:text-white font-bold text-[24px]">
            {t("loading")}
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfilesPage;

const CompanyProfiles = ({
  companyProfilesData,
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div className="flex p-[10px] flex-col items-center gap-[10px] rounded-2xl border border-dashboard w-1/4">
      <div className="flex pb-[10px] flex-col gap-[10px] border-b-[1px] border-dashboard w-full">
        <div className="flex px-[10px] pb-[10px] flex-col justify-center gap-[10px]">
          <p className="text-[28px] font-semibold text-primary-600">
            {t('company_profile.title')}
          </p>
          <div className="flex items-center gap-[10px]">
            <InformationIcon color="#5082C4" />
            <p className="text-sm font-normal text-secondary-400">
              {t('company_profile.info')}
            </p>
          </div>
        </div>
        {/* <div className="flex flex-col gap-[10px]">
          <div className="relative flex items-center rounded-[10px] bg-searchbar">
            <div className="absolute inset-y-0 left-0 flex items-center pl-[14px] pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="bg-searchbar block w-full h-14 pl-[44px] text-base text-main border-none focus:ring-0 rounded-full"
              placeholder="Search"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium pr-3 text-secondary-400 rounded-lg border border-neutral-100">
              <Dropdown
                inline
                label={<span className="px-3 py-[7px]">Time</span>}
              >
                <Dropdown.Item>Last 1 hour</Dropdown.Item>
                <Dropdown.Item>Yesterday</Dropdown.Item>
                <Dropdown.Item>Today</Dropdown.Item>
                <Dropdown.Item>Last 7 days</Dropdown.Item>
                <Dropdown.Item>Last 30 days</Dropdown.Item>
                <Dropdown.Item>Last 90 days</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Custom...</Dropdown.Item>
              </Dropdown>
            </span>
            <span className="text-xs font-medium pr-3 text-secondary-400 rounded-lg border border-neutral-100">
              <Dropdown
                inline
                label={<span className="px-3 py-[7px]">Country</span>}
              >
                <Dropdown.Item>Last 1 hour</Dropdown.Item>
                <Dropdown.Item>Yesterday</Dropdown.Item>
                <Dropdown.Item>Today</Dropdown.Item>
                <Dropdown.Item>Last 7 days</Dropdown.Item>
                <Dropdown.Item>Last 30 days</Dropdown.Item>
                <Dropdown.Item>Last 90 days</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Custom...</Dropdown.Item>
              </Dropdown>
            </span>
            <span className="text-xs font-medium pr-3 text-secondary-400 rounded-lg border border-neutral-100">
              <Dropdown
                inline
                label={<span className="px-3 py-[7px]">Tags</span>}
              >
                <Dropdown.Item>Last 1 hour</Dropdown.Item>
                <Dropdown.Item>Yesterday</Dropdown.Item>
                <Dropdown.Item>Today</Dropdown.Item>
                <Dropdown.Item>Last 7 days</Dropdown.Item>
                <Dropdown.Item>Last 30 days</Dropdown.Item>
                <Dropdown.Item>Last 90 days</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Custom...</Dropdown.Item>
              </Dropdown>
            </span>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col pb-[5px] items-center gap-[10px] w-full">
        {companyProfilesData.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "flex p-[10px] items-center gap-[10px] rounded-[10px] border w-full cursor-pointer",
                selectedItem.duration === item.duration &&
                  selectedItem.company === item.company
                  ? "border-secondary-500 bg-secondary-base"
                  : "border-secondary-200"
              )}
              onClick={() => setSelectedItem(item)}
            >
              {item.logo !== null ? (
                <img
                  alt={item.company}
                  className="w-[60px] h-[60px] rounded-full"
                  src={`${import.meta.env.VITE_IMG_URL}${item.logo}`}
                />
              ) : (
                <div className="flex flex-col justify-center items-center gap-[10px] w-[60px] h-[60px] p-[10px] bg-green_medium rounded-full">
                  <p className="text-xl font-semibold text-primary-400">
                    {item.company.charAt(0).toUpperCase()}
                  </p>
                </div>
              )}
              <div className="flex flex-col justify-center gap-[5px]">
                <p
                  className={clsx(
                    "text-xl font-semibold",
                    selectedItem.duration === item.duration &&
                      selectedItem.company === item.company
                      ? "text-secondary-100"
                      : "text-neutral-900"
                  )}
                >
                  {item.company}
                </p>
                {/* <p
                  className={clsx(
                    "text-base font-normal",
                    selectedItem.name === item.name
                      ? "text-secondary-600"
                      : "text-neutral-700"
                  )}
                >
                  {item.type}
                </p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CompanyInformation = ({ selectedItem }) => {
  return (
    <div className="inline-flex flex-col rounded-2xl border border-dashboard bg-[#F9FBFF] w-1/2">
      <div className="flex p-[10px] items-center gap-[10px] border-b-[1px] border-dashboard">
        <p className="text-lg font-semibold text-ellipsis text-secondary-400">
          {t('company_profile.company_information')}
        </p>
      </div>
      <div className="flex p-[10px] flex-col gap-[10px]">
        {/* <div className="flex p-[10px] flex-col justify-center gap-[15px]">
          <p className="text-sm font-normal text-neutral-800">
            Company Founded
          </p>
          <p className="text-base font-semibold text-neutral-950">
            {selectedItem.founded}
          </p>
        </div>
        <div className="flex p-[10px] flex-col justify-center gap-[15px]">
          <p className="text-sm font-normal text-neutral-800">
            Company Management
          </p>
          <p className="text-base font-semibold text-neutral-950">
            {selectedItem.management}
          </p>
        </div> */}
        <div className="flex p-[10px] flex-col justify-center gap-[15px]">
          <div className="flex justify-between items-center">
            <p className="text-sm font-normal text-neutral-800">
              {t('company_profile.company_location')}
            </p>
            {/* <p className="text-xs font-normal text-secondary-400 text-ellipsis cursor-pointer">
              View on map
            </p> */}
          </div>
          <p className="text-base font-semibold text-neutral-950">
            {selectedItem.city}
          </p>
        </div>
        <div className="flex p-[10px] flex-col justify-center gap-[15px]">
          <p className="text-sm font-normal text-neutral-800">
            {t('company_profile.company_website')}
          </p>
          <p className="text-base font-semibold text-neutral-950">
            {selectedItem.website_url}
          </p>
        </div>
        {/* <div className="flex p-[10px] flex-col justify-center gap-[15px]">
          <p className="text-sm font-normal text-neutral-800">
            Overall Employee
          </p>
          <p className="text-base font-semibold text-neutral-950">
            {selectedItem.overall_employee}
          </p>
        </div>
        <div className="flex p-[10px] flex-col justify-center gap-[15px]">
          <p className="text-sm font-normal text-neutral-800">Company Type</p>
          <p className="text-base font-semibold text-neutral-950">
            {selectedItem.type}
          </p>
        </div>
        <div className="flex p-[10px] flex-col justify-center gap-[15px]">
          <p className="text-sm font-normal text-neutral-800">
            Company Net Worth
          </p>
          <p className="text-base font-semibold text-neutral-950">
            {selectedItem.net_worth.toLocaleString(undefined)}
          </p>
        </div> */}
      </div>
    </div>
  );
};

const CompanySummary = () => {
  return (
    <div className="flex px-[10px] pt-[10px] pb-6 flex-col gap-5 rounded-lg border border-dashboard">
      <div className="flex flex-col justify-center gap-3">
        <div className="flex items-center gap-[6px]">
          <p className="text-xl font-bold text-primary-400">Company Summary</p>
          <InformationIcon color="#699250" />
        </div>
        <div className="flex p-3 flex-col gap-3 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between content-center gap-3 self-stretch">
            <div className="flex px-[6px] py-3 flex-col justify-center items-center gap-2 text-sm font-medium text-primary-500 bg-primary-100 rounded-lg w-full">
              <div className="flex w-8 h-8 justify-center items-center rounded-full bg-primary-200">
                <p>5</p>
              </div>
              <p>Currently Live</p>
            </div>
            <div className="flex px-[6px] py-3 flex-col justify-center items-center gap-2 text-sm font-medium text-primary-500 bg-teal-50 rounded-lg w-full">
              <div className="flex w-8 h-8 justify-center items-center rounded-full bg-teal-100">
                <p>10</p>
              </div>
              <p>Last week</p>
            </div>
            <div className="flex px-[6px] py-3 flex-col justify-center items-center gap-2 text-sm font-medium bg-primary-50 rounded-lg w-full">
              <div className="flex w-8 h-8 justify-center items-center rounded-full bg-secondary-300">
                <p className="text-secondary-100">18</p>
              </div>
              <p className="text-secondary-400">Last month</p>
            </div>
          </div>
          <div className="flex pt-3 flex-col gap-3 border-t-[1px] border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-gray-500">
                Average Session Duration:
              </p>
              <p className="text-xs font-medium text-neutral-700 px-3 py-[2px] rounded-md bg-gray-100">
                15min 20s
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-gray-500">
                Average Bounce Rate:
              </p>
              <div className="flex px-3 py-[2px] justify-center items-center gap-1 rounded-md bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M10.8535 4.96967L7.58747 1.96963C7.51142 1.89964 7.42092 1.84431 7.32129 1.80688C7.12154 1.73104 6.89722 1.73104 6.69748 1.80688C6.59784 1.84431 6.50734 1.89964 6.4313 1.96963L3.16528 4.96967C3.0873 5.03885 3.0251 5.12161 2.9823 5.21311C2.93951 5.30462 2.91699 5.40304 2.91605 5.50262C2.9151 5.60221 2.93576 5.70097 2.97682 5.79314C3.01787 5.88531 3.0785 5.96905 3.15516 6.03947C3.23183 6.10989 3.32299 6.16558 3.42334 6.2033C3.52368 6.24101 3.6312 6.25998 3.73961 6.25912C3.84803 6.25825 3.95517 6.23756 4.05479 6.19826C4.1544 6.15895 4.2445 6.10181 4.31982 6.03018L6.19369 4.31041V11.5C6.19369 11.6989 6.27972 11.8897 6.43284 12.0303C6.58597 12.171 6.79365 12.25 7.0102 12.25C7.22675 12.25 7.43443 12.171 7.58755 12.0303C7.74068 11.8897 7.8267 11.6989 7.8267 11.5V4.31041L9.69894 6.03018C9.85294 6.1668 10.0592 6.24239 10.2733 6.24069C10.4874 6.23898 10.6921 6.1601 10.8435 6.02104C10.9949 5.88198 11.0808 5.69387 11.0827 5.49722C11.0845 5.30057 11.0022 5.11112 10.8535 4.96967Z"
                    fill="#03543F"
                  />
                </svg>
                <p className="text-xs font-medium text-green-800">05%</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-gray-500">
                Daily pages visit:
              </p>
              <p className="text-xs font-medium text-neutral-700 px-3 py-[2px] rounded-md bg-gray-100">
                04
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-gray-500">
                Average visitor:
              </p>
              <p className="text-xs font-medium text-neutral-700 px-3 py-[2px] rounded-md bg-gray-100">
                14
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-[10px] flex-col justify-center gap-[15px]">
        <p className="text-sm font-normal text-neutral-800">Social Media</p>
        <div className="flex items-center gap-[15px]">
          <a href="#" target="_blank" rel="noreferrer">
            <FacebookIcon />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <TwitterIcon />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

const FacebookIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_299_7394)">
        <path
          d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.993 2.92547 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94438 3.125 9.77172 3.125C10.6467 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5538C9.56 5.25 9.25 5.86672 9.25 6.5V8H11.4688L11.1141 10.3125H9.25V15.9028C13.0745 15.3027 16 11.993 16 8Z"
          fill="#1877F2"
        />
        <path
          d="M11.1141 10.3125L11.4688 8H9.25V6.5C9.25 5.86734 9.56 5.25 10.5538 5.25H11.5625V3.28125C11.5625 3.28125 10.647 3.125 9.77172 3.125C7.94438 3.125 6.75 4.2325 6.75 6.2375V8H4.71875V10.3125H6.75V15.9028C7.5783 16.0324 8.4217 16.0324 9.25 15.9028V10.3125H11.1141Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_299_7394">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const TwitterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M5.03168 14.5008C11.0694 14.5008 14.3718 9.49859 14.3718 5.16067C14.3718 5.01859 14.3718 4.87715 14.3622 4.73635C15.0047 4.27166 15.5593 3.69628 16 3.03715C15.4009 3.30275 14.7654 3.47686 14.1146 3.55363C14.7999 3.14342 15.3128 2.49815 15.5578 1.73795C14.9134 2.12036 14.2084 2.38984 13.4733 2.53475C12.9783 2.00847 12.3237 1.65998 11.6108 1.54321C10.8978 1.42644 10.1663 1.5479 9.52931 1.88879C8.89234 2.22968 8.38548 2.771 8.08716 3.42898C7.78884 4.08697 7.71569 4.82493 7.87904 5.52867C6.57393 5.4632 5.29717 5.12403 4.13164 4.53316C2.9661 3.94228 1.93784 3.11293 1.1136 2.09891C0.693819 2.82158 0.565248 3.67706 0.754066 4.49119C0.942885 5.30532 1.43489 6.01688 2.12992 6.48099C1.60749 6.46568 1.09643 6.32475 0.64 6.07011V6.11171C0.640207 6.86961 0.902567 7.60411 1.38258 8.19062C1.86259 8.77714 2.53071 9.17956 3.2736 9.32963C2.79032 9.46146 2.28325 9.48072 1.79136 9.38595C2.00121 10.0382 2.40962 10.6085 2.95949 11.0172C3.50937 11.426 4.17322 11.6527 4.85824 11.6656C4.17763 12.2006 3.39821 12.5962 2.56458 12.8296C1.73096 13.0631 0.859476 13.1299 0 13.0263C1.50122 13.9896 3.24795 14.5006 5.03168 14.4983"
        fill="#1DA1F2"
      />
    </svg>
  );
};

const LinkedinIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_299_7396)">
        <path
          d="M14.8189 0H1.18111C0.867861 0 0.567441 0.124438 0.34594 0.34594C0.124438 0.567441 0 0.867861 0 1.18111V14.8189C0 15.1321 0.124438 15.4326 0.34594 15.6541C0.567441 15.8756 0.867861 16 1.18111 16H14.8189C15.1321 16 15.4326 15.8756 15.6541 15.6541C15.8756 15.4326 16 15.1321 16 14.8189V1.18111C16 0.867861 15.8756 0.567441 15.6541 0.34594C15.4326 0.124438 15.1321 0 14.8189 0ZM4.76889 13.63H2.36333V5.98889H4.76889V13.63ZM3.56445 4.93C3.29158 4.92846 3.02528 4.84613 2.79916 4.69339C2.57304 4.54065 2.39723 4.32435 2.29392 4.07179C2.19061 3.81923 2.16443 3.54173 2.21869 3.2743C2.27294 3.00688 2.4052 2.76152 2.59877 2.56919C2.79234 2.37686 3.03854 2.24618 3.30631 2.19364C3.57408 2.1411 3.85141 2.16906 4.1033 2.27399C4.35519 2.37892 4.57036 2.55611 4.72164 2.78321C4.87293 3.01031 4.95355 3.27713 4.95333 3.55C4.95591 3.73269 4.92167 3.91403 4.85267 4.0832C4.78368 4.25238 4.68132 4.40593 4.55171 4.53471C4.42211 4.66349 4.2679 4.76486 4.09828 4.83277C3.92867 4.90068 3.74711 4.93375 3.56445 4.93ZM13.6356 13.6367H11.2311V9.46222C11.2311 8.23111 10.7078 7.85111 10.0322 7.85111C9.31889 7.85111 8.61889 8.38889 8.61889 9.49333V13.6367H6.21333V5.99445H8.52667V7.05333H8.55778C8.79 6.58333 9.60333 5.78 10.8444 5.78C12.1867 5.78 13.6367 6.57667 13.6367 8.91L13.6356 13.6367Z"
          fill="#0A66C2"
        />
      </g>
      <defs>
        <clipPath id="clip0_299_7396">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const SessionActivity = ({ selectedItem }) => {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex pb-3 flex-col rounded-lg">
      <div className="flex justify-between p-6 items-center gap-2">
        <p className="text-xl font-semibold text-neutral-700">
          {t('company_profile.session_activity')}
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="max-h-[560px] overflow-auto">
            <table className="min-w-full bg-table">
              <thead className="border-t-[1px] border-b-[1px] border-neutral-100">
                <tr className="text-xs font-semibold text-neutral-black-400">
                  <th scope="col" className="px-6 py-4 text-left w-[20%]">
                    <span className="cursor-pointer inline-flex items-center">
                      {t('company_profile.visitors')}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left w-[30%]">
                    <span className="cursor-pointer inline-flex items-center">
                      {t('company_profile.page_visited')}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left w-[15%]">
                    <span className="cursor-pointer inline-flex items-center">
                      {t('company_profile.source')}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left w-[15%]">
                    <span className="cursor-pointer inline-flex items-center">
                      {t('company_profile.session_duration')}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-end w-[20%]">
                    <span className="cursor-pointer inline-flex items-center">
                      {t('company_profile.recording')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-base text-neutral-black-700 font-medium">
                <tr className="cursor-pointer hover:bg-gray-100 h-16">
                  <td colSpan={5} className="text-start py-2">
                    <div className="w-full">
                      <Accordion open={open === 1}>
                        <AccordionHeader
                          className="py-1"
                          onClick={() => handleOpen(1)}
                        >
                          <div className="text-base text-neutral-black-700 font-medium px-6 py-2 w-[20%]">
                            <p>Visitor</p>
                          </div>
                          <div className="text-base text-neutral-black-700 font-medium px-6 py-2 w-[30%]">
                            <p>{selectedItem.user_data.length}</p>
                          </div>
                          <div className="text-base text-neutral-black-700 font-medium px-6 py-2 w-[15%]">
                            <p>Direct</p>
                          </div>
                          <div className="text-base text-neutral-black-700 font-medium px-6 py-2 w-[15%]">
                            <p>
                              {secondsToHMS(
                                selectedItem.duration === undefined
                                  ? 0
                                  : selectedItem.duration.toFixed(0)
                              )}
                            </p>
                          </div>
                          <div className="py-2 flex items-center justify-end w-[20%]">
                            <button className="flex p-2 items-center gap-1 rounded bg-[#D4EAC6]">
                              <RecordingIcon />
                              <p className="text-sm font-semibold text-[#142807]">
                                Show Recording
                              </p>
                            </button>
                          </div>
                        </AccordionHeader>
                        <AccordionBody>
                          {selectedItem.user_data.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="flex w-full items-center"
                              >
                                <div className="flex items-center gap-3 px-6 py-2 w-[20%] pl-[44px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <circle
                                      cx="4"
                                      cy="4"
                                      r="3"
                                      stroke="#333843"
                                      strokeWidth="2"
                                    />
                                  </svg>
                                  <p>
                                    {format(
                                      new Date(item.timestamp),
                                      "MM/dd/yyyy HH:mm"
                                    )}
                                  </p>
                                </div>
                                <div className="px-6 py-2 w-[30%]">
                                  <p>{item.document_location}</p>
                                </div>
                                <div className="px-6 py-2 w-[15%]">
                                  <p>-</p>
                                </div>
                                <div className="px-6 py-2 w-[15%]">
                                  <p>
                                    {secondsToHMS(
                                      item.time_spent === undefined
                                        ? 0
                                        : item.time_spent.toFixed(0)
                                    )}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </AccordionBody>
                      </Accordion>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisitorProfiles = ({ selectedItem }) => {
  return (
    <div className="flex pb-3 flex-col rounded-lg border border-dashboard">
      <div className="flex p-6 items-center gap-2">
        <p className="text-xl font-semibold text-neutral-700">
          Visitor Profiles
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="max-h-[560px] overflow-auto">
            <table className="min-w-full bg-table">
              <thead className="border-t-[1px] border-b-[1px] border-neutral-100">
                <tr className="text-xs font-semibold text-neutral-black-400">
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center">
                      Name
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      Total Visited Pages
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      Email
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      Company Position
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-neutral-black-700">
                {selectedItem.visitor_profiles.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-100 h-16 text-sm font-medium text-neutral-700"
                    >
                      <td className="text-center px-6 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex w-10 h-10 p-[10px] flex-col justify-center items-center gap-[10px] rounded-full bg-primary-200">
                            <p className="text-xl font-semibold text-primary-400">
                              {item.name.charAt(0)}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 items-start">
                            <p>{item.name}</p>
                            <p className="text-xs font-normal text-neutral-400">
                              {item.visit_time}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center px-6 py-2">
                        <p>{item.total_visited_pages}</p>
                      </td>
                      <td className="text-center px-6 py-2">
                        <p>{item.email}</p>
                      </td>
                      <td className="text-center px-6 py-2">
                        <p>{item.company_position}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewedPages = ({ data }) => {
  return (
    <div className="flex pb-3 flex-col rounded-lg border border-dashboard">
      <div className="flex p-6 justify-between items-center gap-2">
        <p className="text-xl font-semibold text-neutral-700">Viewed Pages</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium pr-3 text-secondary-400 rounded-lg border border-neutral-100">
            <Dropdown
              inline
              label={<span className="px-3 py-[10px]">Last 7 Days</span>}
            >
              <Dropdown.Item>Last 1 hour</Dropdown.Item>
              <Dropdown.Item>Yesterday</Dropdown.Item>
              <Dropdown.Item>Today</Dropdown.Item>
              <Dropdown.Item>Last 7 days</Dropdown.Item>
              <Dropdown.Item>Last 30 days</Dropdown.Item>
              <Dropdown.Item>Last 90 days</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Custom...</Dropdown.Item>
            </Dropdown>
          </span>
          <button
            type="button"
            className="flex px-3 py-[10px] justify-between items-center rounded-lg border border-secondary-300 text-xs font-medium text-secondary-400"
          >
            View Heatmap
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="max-h-[560px] overflow-auto">
            <table className="min-w-full bg-table">
              <thead className="border-t-[1px] border-b-[1px] border-neutral-100">
                <tr className="text-xs font-semibold text-neutral-black-400">
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center">
                      Page Name
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      Total Visitor
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      Session Time
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      Bounce Rate
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-neutral-black-700">
                {data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-100 h-16"
                    >
                      <td className="text-left px-6 py-2">
                        <p>{item.page_name}</p>
                      </td>
                      <td className="text-center px-6 py-2">
                        <p>{item.total_visitor}</p>
                      </td>
                      <td className="text-center px-6 py-2">
                        <div className="flex gap-2 justify-center items-center">
                          <p>{item.session_time.time}</p>
                          <div className="flex gap-[2px] items-center">
                            <p
                              className={clsx(
                                "font-semibold",
                                item.session_time.status === "down"
                                  ? "text-secondary-red-500"
                                  : "text-secondary-green-500"
                              )}
                            >
                              {item.session_time.percent}%
                            </p>
                            {item.session_time.status === "down" ? (
                              <DownIcon color="#EC3131" />
                            ) : (
                              <UpIcon color="#29CCB0" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center px-6 py-2">
                        <div className="flex justify-center items-center gap-2">
                          <p
                            className={clsx(
                              "font-semibold",
                              item.bounce_rate.status === "down"
                                ? "text-secondary-red-500"
                                : "text-secondary-green-500"
                            )}
                          >
                            {item.bounce_rate.percent}%
                          </p>
                          {item.bounce_rate.status === "down" ? (
                            <DownIcon color="#29CCB0" />
                          ) : (
                            <UpIcon color="#EC3131" />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DownloadModal = ({ showModal, setShowModal, handleDownloadReport }) => {
  return (
    <Modal onClose={() => setShowModal(false)} popup size="md" show={showModal}>
      <Modal.Body className="flex flex-col relative p-4 text-center bg-white rounded-lg shadow">
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-400 absolute top-4 right-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="flex flex-col justify-between px-6 pt-5 gap-4 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
          >
            <path
              d="M15.7504 12.25V3.72751C14.8971 3.96516 14.1183 4.41626 13.4877 5.03826L8.53866 9.98726C7.91666 10.6179 7.46556 11.3967 7.22791 12.25H15.7504Z"
              fill="#80A7E5"
            />
            <path
              d="M31.6159 3.5H19.2504V12.25C19.2504 13.1783 18.8817 14.0685 18.2253 14.7249C17.5689 15.3813 16.6787 15.75 15.7504 15.75H7.00041V35C6.98636 35.9126 7.33475 36.7935 7.9692 37.4496C8.60365 38.1057 9.47238 38.4834 10.3849 38.5H31.6159C32.5284 38.4834 33.3972 38.1057 34.0316 37.4496C34.6661 36.7935 35.0145 35.9126 35.0004 35V7C35.0145 6.08742 34.6661 5.20652 34.0316 4.55042C33.3972 3.89432 32.5284 3.51657 31.6159 3.5ZM17.5004 31.5C17.5004 31.9641 17.316 32.4093 16.9878 32.7374C16.6597 33.0656 16.2145 33.25 15.7504 33.25C15.2863 33.25 14.8412 33.0656 14.513 32.7374C14.1848 32.4093 14.0004 31.9641 14.0004 31.5V28C14.0004 27.5359 14.1848 27.0908 14.513 26.7626C14.8412 26.4344 15.2863 26.25 15.7504 26.25C16.2145 26.25 16.6597 26.4344 16.9878 26.7626C17.316 27.0908 17.5004 27.5359 17.5004 28V31.5ZM22.7504 31.5C22.7504 31.9641 22.566 32.4093 22.2378 32.7374C21.9097 33.0656 21.4645 33.25 21.0004 33.25C20.5363 33.25 20.0912 33.0656 19.763 32.7374C19.4348 32.4093 19.2504 31.9641 19.2504 31.5V21C19.2504 20.5359 19.4348 20.0908 19.763 19.7626C20.0912 19.4344 20.5363 19.25 21.0004 19.25C21.4645 19.25 21.9097 19.4344 22.2378 19.7626C22.566 20.0908 22.7504 20.5359 22.7504 21V31.5ZM28.0004 31.5C28.0004 31.9641 27.816 32.4093 27.4878 32.7374C27.1597 33.0656 26.7145 33.25 26.2504 33.25C25.7863 33.25 25.3412 33.0656 25.013 32.7374C24.6848 32.4093 24.5004 31.9641 24.5004 31.5V24.5C24.5004 24.0359 24.6848 23.5908 25.013 23.2626C25.3412 22.9344 25.7863 22.75 26.2504 22.75C26.7145 22.75 27.1597 22.9344 27.4878 23.2626C27.816 23.5908 28.0004 24.0359 28.0004 24.5V31.5Z"
              fill="#80A7E5"
            />
          </svg>
          <p className="text-base text-normal text-gray-500">
            {t('ask_download_report')}
            {/* <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-primary-400"
            >
              {website}
            </a>
            ? */}
          </p>
          <div className="flex justify-center items-center gap-4 px-6 pb-6">
            <button
              className="flex px-3 py-2 justify-center items-center rounded-lg bg-secondary-400 text-sm font-medium text-white"
              onClick={async () => {
                await handleDownloadReport();
                setShowModal(false);
              }}
            >
              {t('answer')}
            </button>
            <button
              className="flex px-3 py-2 justify-center items-center rounded-lg border border-gray-200 text-sm font-medium text-gray-800"
              onClick={() => setShowModal(false)}
            >
              {t('cancel')}
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4"></div>
      </Modal.Body>
    </Modal>
  );
};

const HubSpotConnectModal = ({ showModal, setShowModal }) => {
  return (
    <Modal onClose={() => setShowModal(false)} popup size="md" show={showModal}>
      <Modal.Body className="flex flex-col relative !px-[15px] py-4 text-center bg-white rounded-lg shadow">
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-400 absolute top-4 right-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="flex flex-col justify-between pt-5 gap-[15px] items-center">
          <p className="flex flex-col gap-4 text-xl font-semibold text-primary-600 w-full text-left">
            Connect with HubSpot
          </p>
          <div className="flex flex-col gap-4 justify-center items-center px-[9px] pb-6 w-full">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm font-medium text-neutral-600 text-left">
                Connect to a existing company
              </p>
              <div className="flex justify-between items-center w-full">
                <div className="relative flex items-center rounded-lg border border-gray-300 bg-gray-50">
                  <div className="absolute inset-y-0 left-0 flex items-center px-4 py-2 pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-[42px] text-sm font-normal text-gray-500 border-none focus:ring-0 rounded-lg border border-gray-300 bg-gray-50"
                    placeholder="Search company name"
                  />
                </div>
                <button
                  type="button"
                  className="flex justify-center px-3 py-2 items-center rounded-lg bg-secondary-400 text-white text-sm font-medium"
                >
                  Connect
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm font-medium text-neutral-600 text-left">
                Create & Connect with a new company
              </p>
              <div className="flex items-center justify-between w-full">
                <input
                  type="text"
                  className="px-4 py-2 text-sm font-normal text-gray-500 focus:ring-0 rounded-lg border border-gray-300 bg-gray-50"
                  placeholder="Search company name"
                />
                <button
                  type="button"
                  className="flex justify-center px-3 py-2 items-center rounded-lg bg-secondary-400 text-white text-sm font-medium"
                >
                  Create & Connect
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4"></div>
      </Modal.Body>
    </Modal>
  );
};
