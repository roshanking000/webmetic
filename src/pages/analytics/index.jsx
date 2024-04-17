import { useState, useEffect, Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import clsx from "clsx";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

import { fetchConnectedWebsites } from "@/api/connectedWebsitesService";
import { fetchAnalyticsData, fetchReportData } from "@/api/analytics";

import { useAuth } from "@/provider/authProvider";
import AddWebsiteModal from "@/components/modals/add_website_modal";
import { secondsToHMS } from "@/utils";

import InformationIcon from "@/assets/icons/InformationIcon";
import DownloadReport from "@/assets/icons/DownloadReport";
import WebsiteIcon from "@/assets/icons/WebsiteIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import EllipseIcon from "@/assets/icons/EllipseIcon";
import UpIcon from "@/assets/icons/UpIcon";
import DownIcon from "@/assets/icons/DownIcon";
import { t } from "i18next";

const AnalyticsPage = () => {
  const { account } = useAuth();
  const [period] = useOutletContext();
  const { t } = useTranslation();

  const [connectedWebsites, setConnectedWebsites] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const [liveUserCount, setLiveUserCount] = useState(null);
  const [showData, setShowData] = useState(false);
  const [engagedSessionData, setEngagedSessionData] = useState(null);
  const [visitedPagesData, setVisitedPagesData] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedDomain.length !== 0) {
      getAnalyticsData(period);
    }
  }, [selectedDomain, period]);

  const getData = async () => {
    const result = await fetchConnectedWebsites(account._id);
    if (result.status === "success") {
      setConnectedWebsites(result.connected_websites);
      setSelectedDomain([...selectedDomain, result.connected_websites[0]]);
    } else toast.error(result.msg);
  };

  const getAnalyticsData = async (period) => {
    setShowData(false);

    const result = await fetchAnalyticsData(selectedDomain, period);

    if (result.status === "success") {
      console.log(result);
      setShowData(true);

      setLiveUserCount(result.data.live_user_count);
      setEngagedSessionData(result.data.engaged_session_data);
      setVisitedPagesData(result.data.visited_pages_data);
      setCompanyData(result.data.company_data);
    } else toast.error(result.msg);
  };

  const getDownloadReport = async () => {
    const result = await fetchReportData(selectedDomain, period);

    if (result.status === "success") {
      console.log(result);
      exportToCsv(result.data);
    } else toast.error(result.msg);
  };

  const exportToCsv = (data) => {
    // Headers for each column
    let headers = ["Datum,Besuchszeit,Unternehmen,Stadt,Startseite,Referrer"];
    // Convert data to a csv
    let reportDataCsv = data.reduce((acc, reportData) => {
      const { Datum, Besuchszeit, Unternehmen, Stadt, Startseite, Referrer } =
        reportData;
      acc.push(
        [Datum, Besuchszeit, Unternehmen, Stadt, Startseite, Referrer].join(",")
      );
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
    <section className="flex flex-col gap-5 px-[10px]">
      <AnalyticsOverview
        data={connectedWebsites}
        selectedDomain={selectedDomain}
        handleAddWebsite={getData}
        handleSelectWebsite={(domain) => {
          if (selectedDomain.indexOf(domain) === -1)
            setSelectedDomain([...selectedDomain, domain]);
          else {
            if (selectedDomain.length > 1)
              setSelectedDomain(
                selectedDomain.filter((item) => item !== domain)
              );
          }
        }}
        handleDownloadReport={async () => await getDownloadReport()}
      />
      <div className="flex flex-col sm:flex-row w-full h-full justify-center gap-[29px]">
        {liveUserCount !== null &&
          liveUserCount.length !== 0 &&
          showData === true && (
            <div className="sm:w-3/5">
              <CurrentlyLiveUser data={liveUserCount} />
            </div>
          )}
        {(liveUserCount?.length === 0 || showData === false) && (
          <div className="flex h-[438px] sm:w-3/5 items-center justify-center bg-gray-300 rounded-2xl animate-pulse">
            <p>{liveUserCount?.length === 0 ? t("no_data") : ""}</p>
          </div>
        )}
        {engagedSessionData !== null && showData === true && (
          <div className="sm:w-2/5">
            <EngagedSessionPage data={engagedSessionData} />
          </div>
        )}
        {showData === false && (
          <div className="flex h-[438px] sm:w-2/5 items-center justify-center bg-gray-300 rounded-2xl animate-pulse">
            <p>{engagedSessionData?.length === 0 ? t("no_data") : ""}</p>
          </div>
        )}
        {/* <TriggerUsed /> */}
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        {visitedPagesData !== null && showData == true && (
          <MostViewedPages data={visitedPagesData} period={period} />
        )}
        {showData === false && (
          <div className="flex h-[523px] sm:w-3/5 items-center justify-center bg-gray-300 rounded-2xl animate-pulse">
            <p>{visitedPagesData?.length === 0 ? "No Data" : ""}</p>
          </div>
        )}
        {companyData !== null && showData === true && (
          <Companies data={companyData} />
        )}
        {showData === false && (
          <div className="flex h-[523px] sm:w-2/5 items-center justify-center bg-gray-300 rounded-2xl animate-pulse">
            <p>{companyData?.length === 0 ? t("no_data") : ""}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalyticsPage;

const AnalyticsOverview = ({
  data,
  selectedDomain,
  handleAddWebsite,
  handleSelectWebsite,
  handleDownloadReport,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDownloadReportModal, setShowDownloadReportModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-[10px] p-[10px] rounded-2xl border border-dashboard">
        <div className="flex flex-col sm:flex-row gap-4 p-[10px] justify-between sm:items-center">
          <div className="flex flex-col justify-center gap-[5px]">
            <p className="text-[28px] font-semibold text-primary-600">
              {t("analytics.title")}
            </p>
            <div className="flex items-center gap-[10px]">
              <div className="w-3 h-3">
                <InformationIcon color="#5082C4" />
              </div>
              <p className="text-sm font-normal text-secondary-400">
                {t("analytics.info")}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="bg-secondary-400 focus:ring-0 focus:outline-none font-semibold rounded-lg text-sm text-neutral-50 px-3 py-[8px] text-center inline-flex items-center"
              onClick={() => setShowDownloadReportModal(true)}
            >
              <DownloadReport />
              {t("downloadreport_button")}
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center p-[10px] w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] whitespace-nowrap sm:w-2/3 pb-4 sm:overflow-x-auto">
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={clsx(
                    "focus:ring-0 focus:outline-none font-medium rounded-2xl text-xl px-[15px] py-[10px] text-center inline-flex gap-[10px] items-center border",
                    selectedDomain.indexOf(item) !== -1
                      ? "bg-secondary-base border-secondary-500 text-secondary-100"
                      : "bg-grey-100 border-gray-100 text-grey-400"
                  )}
                  onClick={() => handleSelectWebsite(item)}
                >
                  <WebsiteIcon
                    fill={
                      selectedDomain.indexOf(item) !== -1
                        ? "#ECF1FB"
                        : "#858883"
                    }
                  />
                  {item}
                </button>
              );
            })}
          </div>
          <div
            className="flex justify-center items-center gap-[10px] cursor-pointer"
            onClick={() => setShowDialog(true)}
          >
            <PlusIcon />
            <p className="text-xl font-medium text-primary-400">
              {t("addmorewebsite")}
            </p>
          </div>
        </div>
      </div>
      <AddWebsiteModal
        open={showDialog}
        setOpen={() => setShowDialog(false)}
        handleAddWebsite={handleAddWebsite}
      />
      <DownloadReportModal
        open={showDownloadReportModal}
        setOpen={() => setShowDownloadReportModal(false)}
        selectedDomain={selectedDomain}
        handleDownloadReport={handleDownloadReport}
      />
    </>
  );
};

const DownloadReportModal = ({
  open,
  setOpen,
  selectedDomain,
  handleDownloadReport,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#313138] bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex flex-col w-[416px] items-center py-[15px] relative transform overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-xl transition-all sm:my-8 min-w-[500px]">
                <div className="flex px-5 justify-end w-full">
                  <svg
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    onClick={() => setOpen(false)}
                  >
                    <path
                      d="M11.1879 10.0115L15.5988 5.60071C15.6783 5.52384 15.7418 5.43188 15.7855 5.33021C15.8292 5.22854 15.8522 5.11919 15.8531 5.00854C15.8541 4.89789 15.833 4.78816 15.7911 4.68575C15.7492 4.58333 15.6873 4.49029 15.6091 4.41205C15.5308 4.3338 15.4378 4.27192 15.3354 4.23002C15.233 4.18812 15.1232 4.16704 15.0126 4.168C14.9019 4.16896 14.7926 4.19195 14.6909 4.23562C14.5892 4.2793 14.4973 4.34278 14.4204 4.42238L10.0096 8.83321L5.59876 4.42238C5.44159 4.27058 5.23109 4.18658 5.01259 4.18848C4.79409 4.19038 4.58508 4.27802 4.43057 4.43253C4.27607 4.58703 4.18843 4.79604 4.18653 5.01454C4.18463 5.23304 4.26862 5.44354 4.42042 5.60071L8.83126 10.0115L4.42042 14.4224C4.34083 14.4992 4.27735 14.5912 4.23367 14.6929C4.19 14.7945 4.16701 14.9039 4.16605 15.0145C4.16509 15.1252 4.18617 15.2349 4.22807 15.3373C4.26997 15.4397 4.33185 15.5328 4.41009 15.611C4.48834 15.6893 4.58138 15.7512 4.68379 15.7931C4.78621 15.835 4.89594 15.856 5.00659 15.8551C5.11724 15.8541 5.22659 15.8311 5.32826 15.7875C5.42993 15.7438 5.52188 15.6803 5.59876 15.6007L10.0096 11.1899L14.4204 15.6007C14.5776 15.7525 14.7881 15.8365 15.0066 15.8346C15.2251 15.8327 15.4341 15.7451 15.5886 15.5906C15.7431 15.4361 15.8308 15.227 15.8327 15.0085C15.8346 14.79 15.7506 14.5795 15.5988 14.4224L11.1879 10.0115Z"
                      fill="#9CA3AF"
                    />
                  </svg>
                </div>
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
                  <p className="text-base text-normal text-gray-500 w-[350px] text-center">
                    {t("ask_download_report")}
                    {/* <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary-400"
                    >
                      {selectedDomain}
                    </a>
                    ? */}
                  </p>
                  <div className="flex justify-center items-center gap-4 px-6 pb-6">
                    <button
                      className="flex px-3 py-2 justify-center items-center rounded-lg bg-secondary-400 text-sm font-medium text-white"
                      onClick={async () => {
                        await handleDownloadReport();
                        setOpen(false);
                      }}
                    >
                      {t("answer")}
                    </button>
                    <button
                      className="flex px-3 py-2 justify-center items-center rounded-lg border border-gray-200 text-sm font-medium text-gray-800"
                      onClick={() => setOpen(false)}
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const CurrentlyLiveUser = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 border border-dashboard rounded-2xl p-4 md:p-6 w-full h-[438px]">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center gap-2">
          <h5 className="text-3xl font-bold text-primary-400">
            {data[0].count}
          </h5>
          <p className="text-base font-medium text-grey-600">
            {t("analytics.currently_live_user")}
          </p>
        </div>
        {/* <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
          12%
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div> */}
      </div>
      <CurrentlyLiveUserChart data={data} />
      {/* <div className="mt-3.5 flex items-center justify-end border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-sm font-semibold uppercase text-secondary-500 hover:bg-gray-100"
          >
            users report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div> */}
    </div>
  );
};

const CurrentlyLiveUserChart = ({ data }) => {
  const { t } = useTranslation();

  const options = {
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#4D6C39",
        gradientToColors: ["#4D6C39"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    xaxis: {
      categories: [
        data[5].date,
        data[4].date,
        data[3].date,
        data[2].date,
        data[1].date,
        data[0].date,
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const series = [
    {
      name: t("analytics.live_user_count"),
      data: [
        data[5].count,
        data[4].count,
        data[3].count,
        data[2].count,
        data[1].count,
        data[0].count,
      ],
      color: "#4D6C39",
    },
  ];

  return <Chart height={200} options={options} series={series} type="area" />;
};

const TriggerUsed = () => {
  return (
    <div className="flex flex-col gap-6 w-1/3 border border-dashboard rounded-2xl p-4 md:p-6 h-[438px] overflow-auto">
      <div className="flex justify-between gap-2">
        <p className="text-xl font-semibold text-neutral-black-700">
          Trigger Used
        </p>
        <div className="flex gap-1 items-center cursor-pointer">
          <p className="text-sm font-semibold text-primary-400 underline">
            View All
          </p>
          <ArrowRightIcon color="#699250" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex p-3 items-center justify-between rounded-lg border border-neutral-100">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium neutral-black-700">
              Company Founded
            </p>
            <div className="flex items-center gap-1">
              <EllipseIcon color="#88BB67" />
              <p className="text-xs font-normal text-primary-300">
                Active trigger
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm font-medium text-neutral-black-700">12</p>
            <ArrowRightIcon color="#699250" />
          </div>
        </div>
        <div className="flex p-3 items-center justify-between rounded-lg border border-neutral-100">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium neutral-black-700">
              Company Location
            </p>
            <div className="flex items-center gap-1">
              <EllipseIcon color="#88BB67" />
              <p className="text-xs font-normal text-primary-300">
                Active trigger
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm font-medium text-neutral-black-700">35</p>
            <ArrowRightIcon color="#699250" />
          </div>
        </div>
        <div className="flex p-3 items-center justify-between rounded-lg border border-neutral-100">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium neutral-black-700">
              User sources
            </p>
            <div className="flex items-center gap-1">
              <EllipseIcon color="#FF635E" />
              <p className="text-xs font-normal text-danger-400">Paused</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm font-medium text-neutral-black-700">12</p>
            <ArrowRightIcon color="#FF635E" />
          </div>
        </div>
        <div className="flex p-3 items-center justify-between rounded-lg border border-neutral-100">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium neutral-black-700">
              Company Founded
            </p>
            <div className="flex items-center gap-1">
              <EllipseIcon color="#88BB67" />
              <p className="text-xs font-normal text-primary-300">
                Active trigger
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm font-medium text-neutral-black-700">12</p>
            <ArrowRightIcon color="#699250" />
          </div>
        </div>
        <div className="flex p-3 items-center justify-between rounded-lg border border-neutral-100">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium neutral-black-700">
              Company Founded
            </p>
            <div className="flex items-center gap-1">
              <EllipseIcon color="#88BB67" />
              <p className="text-xs font-normal text-primary-300">
                Active trigger
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm font-medium text-neutral-black-700">12</p>
            <ArrowRightIcon color="#699250" />
          </div>
        </div>
      </div>
    </div>
  );
};

const EngagedSessionPage = ({ data }) => {
  return (
    <div className="flex flex-col pb-3 rounded-lg border border-dashboard h-[438px]">
      <p className="flex items-center gap-2 p-6 text-xl font-semibold text-neutral-black-700">
        {t("analytics.engaged_session")}
      </p>
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div>
            <table className="min-w-full bg-table">
              <thead className="border-t-[1px] border-b-[1px] border-neutral-100">
                <tr className="text-xs font-semibold text-neutral-black-400 whitespace-nowrap">
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("analytics.page_name")}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("analytics.engaged_rate")}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("analytics.average_scroll_depth")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-neutral-black-700">
                {data.length === 0 && (
                  <tr className="hover:bg-gray-100">
                    <td colSpan={4} className="text-center">
                      {t("no_data")}
                    </td>
                  </tr>
                )}
                {data.map((item, index) => {
                  return <EngagedSessionItem key={index} data={item} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const EngagedSessionItem = ({ data }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <tr
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        className="cursor-pointer hover:bg-gray-100 h-16"
      >
        <td className="text-left px-6 py-2">
          <p>{data.page_name}</p>
        </td>
        <td className="text-center px-6 py-2">
          <p>{data.engaged_rate.toFixed(2)}%</p>
        </td>
        <td className="text-center px-6 py-2">
          <p>{data.average_scroll_depth.toFixed(2)}</p>
        </td>
      </tr>
      {showTooltip && (
        <div
          style={{
            position: "fixed",
            left: mousePosition.x + 10,
            top: mousePosition.y + 10,
            padding: "8px",
            background: "#333",
            color: "#fff",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
          }}
        >
          {data.domain}
        </div>
      )}
    </>
  );
};

const MostViewedPages = ({ data, period }) => {
  return (
    <div className="flex flex-col pb-3 rounded-lg border border-dashboard sm:w-3/5 h-[523px]">
      <p className="flex items-center gap-2 p-6 text-xl font-semibold text-neutral-black-700">
        {t("analytics.most_viewed_pages")}
      </p>
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div>
            <table className="min-w-full bg-table">
              <thead className="border-t-[1px] border-b-[1px] border-neutral-100">
                <tr className="text-xs font-semibold text-neutral-black-400 whitespace-nowrap">
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("analytics.page_name")}
                      {/* <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg> */}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("analytics.total_visitor")}
                      {/* <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg> */}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("analytics.session_time")}
                      {/* <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg> */}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("analytics.bounce_rate")}
                      {/* <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg> */}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-neutral-black-700">
                {data.length === 0 && (
                  <tr className="hover:bg-gray-100">
                    <td colSpan={4} className="text-center">
                      {t("no_data")}
                    </td>
                  </tr>
                )}
                {data.map((item, index) => {
                  return (
                    <MostViewedPagesItem
                      key={index}
                      data={item}
                      period={period}
                    />
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

const MostViewedPagesItem = ({ data, period }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <tr
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        className="cursor-pointer hover:bg-gray-100 h-16"
      >
        <td className="text-left px-6 py-2">
          <p>{data.page_name}</p>
        </td>
        <td className="text-center px-6 py-2">
          <p>{data.total_visitor}</p>
        </td>
        <td className="text-center px-6 py-2">
          <div className="flex gap-2 justify-center items-center">
            <p className="text-nowrap">
              {secondsToHMS(data.session_time.toFixed(0))}
            </p>
            {data.session_time_percent !== undefined && (
              <div className="flex gap-[2px] items-center">
                <p
                  className={clsx(
                    "font-semibold",
                    data.session_time_status === "increase"
                      ? "text-secondary-green-500"
                      : "text-secondary-red-500"
                  )}
                >
                  {data.session_time_percent.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  %
                </p>
                {data.session_time_status === "increase" ? (
                  <UpIcon color="#29CCB0" />
                ) : (
                  <DownIcon color="#EC3131" />
                )}
              </div>
            )}
          </div>
        </td>
        <td className="text-center px-6 py-2">
          <div className="flex justify-center items-center gap-2">
            <p
              className={clsx(
                "font-semibold",
                period !== "All Time" && data.bounce_rate_status === "increase"
                  ? "text-secondary-green-500"
                  : period !== "All Time" &&
                    data.bounce_rate_status === "decrease"
                  ? "text-secondary-red-500"
                  : ""
              )}
            >
              {data.bounce_rate.toFixed(2)}%
            </p>
            {period !== "All Time" &&
              data.bounce_rate_status === "increase" && (
                <UpIcon color="#29CCB0" />
              )}
            {period !== "All Time" &&
              data.bounce_rate_status === "decrease" && (
                <DownIcon color="#EC3131" />
              )}
          </div>
        </td>
      </tr>
      {showTooltip && (
        <div
          style={{
            position: "fixed",
            left: mousePosition.x + 10,
            top: mousePosition.y + 10,
            padding: "8px",
            background: "#333",
            color: "#fff",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
          }}
        >
          {data.website_url}
        </div>
      )}
    </>
  );
};

const Companies = ({ data }) => {
  return (
    <div className="flex flex-col p-6 items-center gap-6 rounded-lg border border-dashboard sm:w-2/5 h-[523px] overflow-auto">
      <div className="flex justify-between gap-2 px-[10px] w-full">
        <p className="text-xl font-semibold text-neutral-black-700">
          {t("analytics.companies")}
        </p>
        {/* <div className="flex gap-1 items-center cursor-pointer">
          <p className="text-sm font-semibold text-primary-400 underline">
            View All
          </p>
          <ArrowRightIcon color="#699250" />
        </div> */}
      </div>
      <div className="flex flex-col gap-[18px] w-full">
        {data.length === 0 && (
          <div className="text-sm font-medium text-neutral-black-700 text-center">
            {t("no_data")}
          </div>
        )}
        {data.map((item, index) => {
          return <CompanyItem key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

const CompanyItem = ({ data }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        className="flex gap-3 items-center"
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
      >
        <div className="flex items-center text-left">
          {data.logo !== null ? (
            <img
              alt={data.company_name}
              className="w-10 h-10 min-w-10 min-h-10 rounded-full"
              src={`${import.meta.env.VITE_IMG_URL}${data.logo}`}
            />
          ) : (
            <div className="flex flex-col justify-center items-center gap-[10px] w-10 h-10 min-w-[40px] min-h-[40px] p-[10px] bg-green_medium rounded-full">
              <p className="text-xl font-semibold text-primary-400">
                {data.company_name.charAt(0)}
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between text-sm font-medium text-neutral-black-700 w-full">
          <p>{data.company_name}</p>
          <p>{data.count}</p>
        </div>
      </div>
      {showTooltip && (
        <div
          style={{
            position: "fixed",
            left: mousePosition.x + 10,
            top: mousePosition.y + 10,
            padding: "8px",
            background: "#333",
            color: "#fff",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
          }}
        >
          {data.website_url}
        </div>
      )}
    </>
  );
};
