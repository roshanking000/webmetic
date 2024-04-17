import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { fetchSearchResult } from "@/api/search";

import searchIcon from "@/assets/images/search.svg";

const SearchModal = ({ open, setOpen, selectedDomain }) => {
  const { t } = useTranslation();

  const searchTarget = useRef(null);
  const [searchResult, setSearchResult] = useState(null);
  const [loadingView, setLoadingView] = useState(false);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      setLoadingView(true);
      setSearchResult(null);
      const result = await fetchSearchResult(
        selectedDomain,
        searchTarget.current.value
      );
      console.log(result);
      if (result.status === "success") {
        setSearchResult(result.data.data);
      } else toast.error("An unexpected error occurred!");
      setLoadingView(false);
    }
  };

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
          <div className="fixed inset-0 bg-[#313138] bg-opacity-30 transition-opacity" />
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
              <Dialog.Panel className="relative inline-flex flex-col gap-2 items-start p-[15px] transform rounded-lg bg-white shadow-xl transition-all min-w-[47rem] h-[600px]">
                <div className="relative flex items-center w-full bg-searchbar cursor-pointer rounded-xl">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-10 pointer-events-none">
                    <img alt={t("dashboard.search")} src={searchIcon} />
                  </div>
                  <input
                    ref={searchTarget}
                    type="text"
                    className="bg-searchbar block w-full h-14 pl-[70px] text-base text-main border-none focus:ring-0 rounded-full"
                    placeholder={t("dashboard.search")}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                {loadingView === true && (
                  <div className="absolute top-0 left-0 flex justify-center items-center w-full h-[200px] flex-col space-y-2 mt-[100px]">
                    <div className="w-20 h-20 border-t-8 border-b-8 dark:border-white border-indigo-900 rounded-full animate-spin"></div>
                    <div className="text-indigo-900 dark:text-white font-bold text-[24px]">
                      {t('loading')}
                    </div>
                  </div>
                )}
                {searchResult?.length === 0 ? (
                  <p className="text-center w-full">{t('lead_profile.no_data')}</p>
                ) : (
                  <div className="overflow-y-auto w-full">
                    {searchResult?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 text-left cursor-pointer hover:bg-light-blue-700 rounded-md w-full"
                        >
                          {item.logo !== null ? (
                            <img
                              alt={item.company}
                              className="w-[60px] h-[60px] rounded-full"
                              src={`${import.meta.env.VITE_IMG_URL}${
                                item.logo
                              }`}
                            />
                          ) : (
                            <div className="flex flex-col justify-center items-center gap-[10px] w-[60px] h-[60px] p-[10px] bg-green_medium rounded-full">
                              <p className="text-xl font-semibold text-primary-400">
                                {item.company.charAt(0).toUpperCase()}
                              </p>
                            </div>
                          )}
                          <p>{item.company}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchModal;
