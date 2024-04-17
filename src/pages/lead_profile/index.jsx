import { Fragment, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { fetchLeadProfilesData } from "../../api/dashboard";
import { fetchConnectedWebsites } from "@/api/connectedWebsitesService";

import { useAuth } from "../../provider/authProvider";

import LeadProfiles from "../../components/lead_profiles";
import CompanyProfileModal from "../../components/modals/company_profile_modal";
import { Pagination } from "../../components/pagination";
import DownloadOutlineIcon from "../../assets/icons/DownloadOutlineIcon";
import TrashOutlineIcon from "../../assets/icons/TrashOutlineIcon";
import RefreshIcon from "../../assets/icons/RefreshIcon";

import websiteLinkIcon from "../../assets/images/website_link.svg";

const LeadProfilePage = () => {
  const { account } = useAuth();
  const [period] = useOutletContext();
  const { t } = useTranslation();

  const [showDialog, setShowDialog] = useState(false);
  const [selectedCompanyProfile, setSelectedCompanyProfile] = useState(null);
  const [showSelectionIcons, setShowSelectionIcons] = useState(false);

  const [leadProfilesData, setLeadProfilesData] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState(50);
  const [pageTotalCount, setPageTotalCount] = useState(0);
  const [showLeadProfileData, setShowLeadProfileData] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const [connectedWebsites, setConnectedWebsites] = useState([]);

  useEffect(() => {
    getConnectedWebsitesData();
  }, []);

  useEffect(() => {
    if (selectedDomain.length !== 0) getLeadProfilesData(selectedDomain, period, 0, pageCount);
  }, [selectedDomain, period]);

  const getConnectedWebsitesData = async () => {
    const result = await fetchConnectedWebsites(account._id);
    console.log(result);
    if (result.status === "success") {
      setConnectedWebsites(result.connected_websites);
      setSelectedDomain([...selectedDomain, result.connected_websites[0]]);
    } else toast.error("An unexpected error occurred!");
  };

  const getLeadProfilesData = async (domain, period, page_num, page_count) => {
    setShowLeadProfileData(false);
    const result = await fetchLeadProfilesData(
      domain,
      period,
      page_num,
      page_count
    );
    console.log(result);
    if (result.status === "success") {
      setLeadProfilesData(result.data.data);
      setPageNum(result.data.page_num);
      setPageTotalCount(result.data.page_total);
      setShowLeadProfileData(true);
    } else toast.error("An unexpected error occurred!");
  };

  return (
    <div className="flex flex-col gap-[35px]">
      <div className="flex items-center justify-between">
        <div className="flex p-[10px] justify-center items-center gap-[30px]">
          <p className="text-[28px] font-semibold text-title">{t('lead_profile.title')}</p>
          {showSelectionIcons === true && (
            <div className="flex p-[10px] justify-center items-center gap-5">
              <DownloadOutlineIcon />
              <TrashOutlineIcon />
              <RefreshIcon />
            </div>
          )}
        </div>
        <div className="flex items-center gap-9">
          <div className="flex items-center">
            <img
              alt="website"
              className="mr-3 h-5 w-5 text-gray-400"
              src={websiteLinkIcon}
            />
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {selectedDomain}
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
                    {connectedWebsites.map((item, index) => {
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
                                setSelectedDomain([item]);
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
        </div>
      </div>
      <div className="relative">
        {showLeadProfileData === true && (
          <LeadProfiles
            data={leadProfilesData}
            onHandleSelect={(item) => {
              setSelectedCompanyProfile(item);
              setShowDialog(true);
            }}
            onHandleSelection={(selectedAll) => {
              setShowSelectionIcons(selectedAll);
            }}
            onHandleCheck={(checkedCount) => {
              if (checkedCount === 0) setShowSelectionIcons(false);
              else setShowSelectionIcons(true);
            }}
          />
        )}
        {showLeadProfileData === false && (
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-[200px] flex-col space-y-2">
            <div className="w-20 h-20 border-t-8 border-b-8 dark:border-white border-indigo-900 rounded-full animate-spin"></div>
            <div className="text-indigo-900 dark:text-white font-bold text-[24px]">
              {t('loading')}
            </div>
          </div>
        )}
        <div
          className={clsx(
            "flex flex-row justify-center",
            pageTotalCount <= 1 ? "hidden" : "",
            showLeadProfileData === false ? "mt-[300px]" : ""
          )}
        >
          <Pagination
            pageCount={pageTotalCount}
            gotoPage={(page) => {
              setPageNum(page);
              getLeadProfilesData(selectedDomain, period, page, pageCount);
              setLeadProfilesData([]);
            }}
          />
        </div>
      </div>
      <CompanyProfileModal
        data={selectedCompanyProfile}
        open={showDialog}
        setOpen={() => setShowDialog(false)}
      />
    </div>
  );
};

export default LeadProfilePage;
