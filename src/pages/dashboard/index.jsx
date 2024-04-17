import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/provider/authProvider";
import { fetchConnectedWebsites } from "@/api/connectedWebsitesService";
import { secondsToHMS } from "@/utils";

import {
  fetchDashboardData,
  fetchVisitorsLocationData,
  fetchVisitedPagesData,
  fetchVisitorSourceData,
  fetchLeadProfilesData,
} from "../../api/dashboard";

import Splash from "@/pages/splash";
import VisitorsLocationChart from "@/components/visitors_location_chart";
import MostVisitedPagesChart from "@/components/most_visited_pages_chart";
import VisitorsSourcesChart from "@/components/visitors_sources_chart";
import LeadProfiles from "@/components/lead_profiles";
import { Pagination } from "@/components/pagination";
import AddWebsiteModal from "@/components/modals/add_website_modal";

import arrowNarrowUpIcon from "@/assets/images/arrow-narrow-up.svg";
import arrowNarrowDownIcon from "@/assets/images/arrow-narrow-down.svg";
import WebsiteIcon from "@/assets/icons/WebsiteIcon";
import PlusIcon from "@/assets/icons/PlusIcon";

const DashboardPage = () => {
  const { account } = useAuth();
  const [showSplash, setShowSplash, period] = useOutletContext();
  const { t } = useTranslation();

  const [connectedWebsites, setConnectedWebsites] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const [numberOfVisitors, setNumberOfVisitors] = useState({
    count: 0,
    percent: 0,
    status: "increase",
  });
  const [numberOfVisitedPages, setnumberOfVisitedPages] = useState({
    count: 0,
    percent: 0,
    status: "increase",
  });
  const [sessionDuration, setSessionDuration] = useState({
    time: 0,
    percent: 0,
    status: "increase",
  });
  const [bounceRateData, setBounceRateData] = useState({
    rate: 0,
    percent: 0,
    status: "increase",
  });
  const [showVisitorsLocationData, setShowVisitorsLocationData] =
    useState(false);
  const [visitorsLocationData, setVisitorsLocationData] = useState(null);
  const [showVisitedPagesData, setShowVisitedPagesData] = useState(false);
  const [visitedPagesData, setVisitedPagesData] = useState(null);
  const [showLeadProfileData, setShowLeadProfileData] = useState(false);
  const [leadProfilesData, setLeadProfilesData] = useState(null);
  const [showVisitorSourceData, setShowVisitorSourceData] = useState(false);
  const [visitorSourceData, setVisitorSourceData] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [pageTotalCount, setPageTotalCount] = useState(10);

  useEffect(() => {
    if (showSplash === false) getConnectedWebsitesData();
  }, [showSplash]);

  useEffect(() => {
    if (selectedDomain.length !== 0) getDashboardData();
  }, [selectedDomain]);

  useEffect(() => {
    if (selectedDomain.length !== 0) {
      getDashboardData();
      getVisitorsLocationData();
      getVisitedPagesData();
      getVisitorSourceData();
    }
  }, [selectedDomain, period]);

  // useEffect(() => {
  //   if (selectedDomain.length !== 0) getLeadProfilesData(0, 10);
  // }, [selectedDomain, leadProfilesPeriod]);

  const getConnectedWebsitesData = async () => {
    const result = await fetchConnectedWebsites(account._id);
    if (result.status === "success") {
      setConnectedWebsites(result.connected_websites);
      setSelectedDomain([...selectedDomain, result.connected_websites[0]]);
    } else toast.error("An unexpected error occurred!");
  };

  const getDashboardData = async () => {
    const result = await fetchDashboardData(selectedDomain, period);
    console.log(result);
    if (result.status === "success") {
      setNumberOfVisitors({
        count: result.data.visitor_data.current_visitor_count,
        percent: result.data.visitor_data.last_visitor_count === 0 ? 0 : Math.abs(
          (
            100 -
            (100 * result.data.visitor_data.current_visitor_count) /
              result.data.visitor_data.last_visitor_count
          ).toFixed(2)
        ),
        status:
          (result.data.visitor_data.current_visitor_count === 0 || result.data.visitor_data.last_visitor_count === 0)
            ? "none"
            : result.data.visitor_data.last_visitor_count >
              result.data.visitor_data.current_visitor_count
            ? "decrease"
            : "increase",
      });
      setnumberOfVisitedPages({
        count: result.data.visited_page_data.total_current_count,
        percent: result.data.visited_page_data.total_last_count === 0 ? 0 : Math.abs(
          (
            100 -
            (100 * result.data.visited_page_data.total_current_count) /
              result.data.visited_page_data.total_last_count
          ).toFixed(2)
        ),
        status:
          result.data.visited_page_data.total_current_count === 0
            ? "none"
            : result.data.visited_page_data.total_last_count >
              result.data.visited_page_data.total_current_count
            ? "decrease"
            : "increase",
      });
      setSessionDuration({
        time: result.data.session_duration_data.total_current_visit_time,
        percent: result.data.session_duration_data.total_last_visit_time === 0 ? 0 : Math.abs(
          (
            100 -
            (100 *
              result.data.session_duration_data.total_current_visit_time) /
              result.data.session_duration_data.total_last_visit_time
          ).toFixed(2)
        ),
        status:
          result.data.session_duration_data.total_current_visit_time === 0
            ? "none"
            : result.data.session_duration_data.total_last_visit_time >
              result.data.session_duration_data.total_current_visit_time
            ? "decrease"
            : "increase",
      });
      setBounceRateData({
        rate: result.data.bounce_rate_data.total_count === 0 ? 0 :(
          (result.data.bounce_rate_data.total_current_visit_count /
            result.data.bounce_rate_data.total_count) *
          100
        ).toFixed(2),
        percent: result.data.bounce_rate_data.total_last_visit_count === 0 ? 0 : Math.abs(
          (
            100 -
            (100 * result.data.bounce_rate_data.total_current_visit_count) /
              result.data.bounce_rate_data.total_last_visit_count
          ).toFixed(2)
        ),
        status:
          result.data.bounce_rate_data.total_current_visit_count === 0
            ? "none"
            : result.data.bounce_rate_data.total_last_visit_count >
              result.data.bounce_rate_data.total_current_visit_count
            ? "decrease"
            : "increase",
      });
    } else toast.error("An unexpected error occurred!");
  };

  const getVisitorsLocationData = async () => {
    setShowVisitorsLocationData(false);
    const result = await fetchVisitorsLocationData(
      selectedDomain,
      period
    );

    if (result.status === "success") {
      if (result.data.length !== 0) setShowVisitorsLocationData(true);
      setVisitorsLocationData(result.data);
    } else toast.error("An unexpected error occurred!");
  };

  const getVisitedPagesData = async () => {
    setShowVisitedPagesData(false);
    const result = await fetchVisitedPagesData(
      selectedDomain,
      period
    );

    if (result.status === "success") {
      if (result.data.length !== 0) setShowVisitedPagesData(true);
      setVisitedPagesData(result.data);
    } else toast.error("An unexpected error occurred!");
  };

  const getVisitorSourceData = async () => {
    setShowVisitorSourceData(false);
    const result = await fetchVisitorSourceData(
      selectedDomain,
      period
    );

    if (result.status === "success") {
      if (result.data.length !== 0) setShowVisitorSourceData(true);
      setVisitorSourceData(result.data);
    } else toast.error("An unexpected error occurred!");
  };

  // const getLeadProfilesData = async (page_num, page_count) => {
  //   setShowLeadProfileData(false);
  //   const result = await fetchLeadProfilesData(
  //     selectedDomain,
  //     leadProfilesPeriod,
  //     page_num,
  //     page_count
  //   );
  //   console.log(result);
  //   if (result.status === "success") {
  //     setShowLeadProfileData(true);
  //     setLeadProfilesData(result.data.data);
  //     setPageNum(result.data.page_num);
  //     setPageTotalCount(result.data.page_total);
  //   } else toast.error("An unexpected error occurred!");
  // };

  return (
    <>
      {showSplash === true && (
        <Splash
          websiteSubmit={(status, website_url) => {
            setConnectedWebsites([...connectedWebsites, website_url]);
            setSelectedDomain([...selectedDomain, website_url]);
            setShowSplash(!status);
          }}
        />
      )}
      {showSplash === false && (
        <section className="flex flex-col gap-10">
          <OverView
            data={connectedWebsites}
            selectedDomain={selectedDomain}
            handleAddWebsite={getConnectedWebsitesData}
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
          />
          <div className="grid grid-cols-1 sm:grid-cols-4 rounded-2xl border border-dashboard p-6">
            <div className="flex flex-col gap-4 justify-center items-start">
              <p className="text-sm font-semibold text-overview-title text-ellipsis whitespace-nowrap">
                {t('dashboard.numberofvisitors')}
              </p>
              <div className="flex flex-col gap-4 justify-center items-start">
                <p className="text-[32px] font-bold text-overview-value">
                  {numberOfVisitors.count.toLocaleString()}
                </p>
                {(period !== "All Time" && numberOfVisitors.percent !== 0) && (
                  <div className="flex gap-1 items-center">
                    <div className="flex gap-1 items-center">
                      <img
                        alt="arrow"
                        className="w-[14px] h-[14px]"
                        src={
                          numberOfVisitors.status === "increase"
                            ? arrowNarrowUpIcon
                            : arrowNarrowDownIcon
                        }
                      />
                      <p
                        className={clsx(
                          "text-sm",
                          numberOfVisitors.status === "increase"
                            ? "text-overview-positive-percentage"
                            : "text-overview-negative-percentage"
                        )}
                      >
                        {numberOfVisitors.percent}%
                      </p>
                    </div>
                    <p className="text-xs text-overview-description">
                      {numberOfVisitors.status === "increase"
                        ? "increased vs last month"
                        : "decreased vs last month"}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-start">
              <p className="text-sm font-semibold text-overview-title text-ellipsis whitespace-nowrap">
                {t('dashboard.mostvisitedpages')}
              </p>
              <p className="text-[32px] font-bold text-overview-value">
                {numberOfVisitedPages.count.toLocaleString()}
              </p>
              {(period !== "All Time" && numberOfVisitedPages.percent !== 0) && (
                <div className="flex gap-1 items-center">
                  <div className="flex gap-1 items-center">
                    <img
                      alt="arrow"
                      className="w-[14px] h-[14px]"
                      src={
                        numberOfVisitedPages.status === "increase"
                          ? arrowNarrowUpIcon
                          : arrowNarrowDownIcon
                      }
                    />
                    <p
                      className={clsx(
                        "text-sm",
                        numberOfVisitedPages.status === "increase"
                          ? "text-overview-positive-percentage"
                          : "text-overview-negative-percentage"
                      )}
                    >
                      {numberOfVisitedPages.percent}%
                    </p>
                  </div>
                  <p className="text-xs text-overview-description">
                    {numberOfVisitedPages.status === "increase"
                      ? "increased vs last month"
                      : "decreased vs last month"}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 justify-center items-start">
              <p className="text-sm font-semibold text-overview-title text-ellipsis whitespace-nowrap">
                {t('dashboard.sessionduration')}
              </p>
              <p className="text-[32px] font-bold text-overview-value">
                {secondsToHMS(sessionDuration.time.toFixed(0))}
              </p>
              {(period !== "All Time" && sessionDuration.percent !== 0) && (
                <div className="flex gap-1 items-center">
                  <div className="flex gap-1 items-center">
                    <img
                      alt="arrow"
                      className="w-[14px] h-[14px]"
                      src={
                        sessionDuration.status === "increase"
                          ? arrowNarrowUpIcon
                          : arrowNarrowDownIcon
                      }
                    />
                    <p
                      className={clsx(
                        "text-sm",
                        sessionDuration.status === "increase"
                          ? "text-overview-positive-percentage"
                          : "text-overview-negative-percentage"
                      )}
                    >
                      {sessionDuration.percent}%
                    </p>
                  </div>
                  <p className="text-xs text-overview-description">
                    {sessionDuration.status === "increase"
                      ? "increased vs last month"
                      : "decreased vs last month"}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 justify-center items-start">
              <p className="text-sm font-semibold text-overview-title text-ellipsis whitespace-nowrap">
                {t('dashboard.bouncerate')}
              </p>
              <p className="text-[32px] font-bold text-overview-value">
                {bounceRateData.rate}%
              </p>
              {(period !== "All Time" && bounceRateData.percent !== 0) && (
                <div className="flex gap-1 items-center">
                  <div className="flex gap-1 items-center">
                    <img
                      alt="arrow"
                      className="w-[14px] h-[14px]"
                      src={
                        bounceRateData.status === "increase"
                          ? arrowNarrowUpIcon
                          : arrowNarrowDownIcon
                      }
                    />
                    <p
                      className={clsx(
                        "text-sm",
                        bounceRateData.status === "increase"
                          ? "text-overview-positive-percentage"
                          : "text-overview-negative-percentage"
                      )}
                    >
                      {bounceRateData.percent}%
                    </p>
                  </div>
                  <p className="text-xs text-overview-description">
                    {bounceRateData.status === "increase"
                      ? "increased vs last month"
                      : "decreased vs last month"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="grid xl:grid-cols-3 gap-6">
            <VisitorsLocationChart
              data={visitorsLocationData}
              showVisitorsLocationData={showVisitorsLocationData}
            />
            <MostVisitedPagesChart
              data={visitedPagesData}
              showVisitedPagesData={showVisitedPagesData}
            />
            <VisitorsSourcesChart
              data={visitorSourceData}
              showVisitorSourceData={showVisitorSourceData}
            />
          </div>
          {/* <div className="flex flex-col gap-[35px]">
            <div className="flex items-center justify-between">
              <p className="text-[28px] font-semibold text-title">
                Lead Profiles
              </p>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {leadProfilesPeriod}
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {periodScope.map((item, index) => {
                        return (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <div
                                className={clsx(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                                onClick={() => {
                                  setLeadProfilesPeriod(item);
                                }}
                              >
                                {item}
                              </div>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            {showLeadProfileData === true ? (
              <>
                <LeadProfiles
                  data={leadProfilesData}
                  onHandleSelect={(item) => {}}
                />
                <div
                  className={clsx(
                    "flex flex-row justify-center",
                    pageTotalCount <= 1 ? "hidden" : ""
                  )}
                >
                  <Pagination
                    pageCount={pageTotalCount}
                    gotoPage={(page) => {
                      setPageNum(page);
                      getLeadProfilesData(page, 10);
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="flex h-[300px] items-center justify-center bg-gray-300 rounded-2xl animate-pulse">
                <p>{leadProfilesData?.length === 0 ? "No Data" : ""}</p>
              </div>
            )}
          </div> */}
        </section>
      )}
    </>
  );
};

const OverView = ({
  data,
  selectedDomain,
  handleAddWebsite,
  handleSelectWebsite,
}) => {
  const { t } = useTranslation();

  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex flex-col gap-[10px] p-[10px] rounded-2xl border border-dashboard">
      <div className="flex p-[10px] items-center">
        <div className="flex flex-col justify-center gap-[5px]">
          <p className="text-[28px] font-semibold text-primary-600">
            {t('dashboard.title')}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center py-[10px]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-[10px]">
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
                    selectedDomain.indexOf(item) !== -1 ? "#ECF1FB" : "#858883"
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
            {t('dashboard.addmorewebsite')}
          </p>
        </div>
      </div>
      <AddWebsiteModal
        open={showDialog}
        setOpen={() => setShowDialog(false)}
        handleAddWebsite={handleAddWebsite}
      />
    </div>
  );
};

export default DashboardPage;
