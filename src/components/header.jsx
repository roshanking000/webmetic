import { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

import { fetchLanguageData } from "../api/simpleLocalize";

import SearchModal from "./modals/search_modal";

import { periodScope } from "../constants";

import dropdownIcon from "../assets/images/dropdown.png";
import searchIcon from "../assets/images/search.svg";
import websiteLinkIcon from "../assets/images/website_link.svg";
import notificationIcon from "../assets/images/notification.svg";

const Header = ({ period, setPeriod, selectedDomain }) => {
  const { t, i18n } = useTranslation();

  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({
    key: "",
    name: "",
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const setupLanguages = async () => {
      const result = await fetchLanguageData();
      setLanguages(result.data);
      for (let i = 0; i < result.data.length; i++) {
        if (
          localStorage.getItem("language") === "en" &&
          result.data[i].key === "en"
        )
          setSelectedLanguage(result.data[i]);
        else if (
          (localStorage.getItem("language") === "de" ||
            localStorage.getItem("language") === null) &&
          result.data[i].key === "de_DE"
        )
          setSelectedLanguage(result.data[i]);
      }
    };
    setupLanguages();
  }, []);

  const handleLanguageChange = async (language) => {
    localStorage.setItem("language", language.key === "en" ? "en" : "de");
    setSelectedLanguage(language);
    await i18n.changeLanguage(language.key);
  };

  return (
    <section className="flex justify-between items-center px-2">
      <div className="hidden sm:flex items-center w-1/2 bg-searchbar cursor-pointer rounded-xl">
        <button type="button" className="flex items-center gap-4 h-14 pl-10 bg-searchbar text-base text-main w-full rounded-xl" onClick={() => setShowDialog(true)}>
          <img alt={t("dashboard.search")} src={searchIcon} />
          <p>{t("dashboard.search")}</p>
        </button>
        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-10 pointer-events-none">
          <img alt={t('dashboard.search')} src={searchIcon} />
        </div>
        <input
          type="text"
          className="bg-searchbar block w-full h-14 pl-[70px] text-base text-main border-none focus:ring-0 rounded-full"
          placeholder={t('dashboard.search')}
        /> */}
      </div>
      <div className="flex justify-end items-center gap-6 w-full">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {t(`dashboard.timeframe.${period}`)}
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
                            setPeriod(item);
                          }}
                        >
                          {t(`dashboard.timeframe.${item}`)}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <div className="flex items-center">
                <span
                  className={clsx(
                    "fi mr-2",
                    selectedLanguage.key === "en" ? "fi-us" : "fi-de"
                  )}
                ></span>
                {selectedLanguage.name}
              </div>
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
            <Menu.Items className="absolute w-[150px] right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {languages.map((item, index) => {
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
                            handleLanguageChange(item);
                          }}
                        >
                          <div className="flex items-center">
                            <span
                              className={clsx(
                                "fi mr-2",
                                item.key === "en" ? "fi-us" : "fi-de"
                              )}
                            ></span>
                            {item.name}
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* <button
    onClick={() => setIsOpen(!isOpen)}
    type="button"
    className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    id={LANGUAGE_SELECTOR_ID}
    aria-expanded={isOpen}
>
    <FlagIcon countryCode={selectedLanguage.key}/>
    {selectedLanguage.name}
    <svg
        className="-me-1 ms-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
        />
    </svg>
</button> */}
        {/* {account.website !== undefined && (
          <a
            href={account.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-x-1.5 bg-white px-3 py-2 text-base font-semibold text-main"
          >
            <img
              alt="website"
              className="mr-3 h-5 w-5 text-gray-400"
              src={websiteLinkIcon}
            />
            {account.website}
            <img
              alt="dropdown"
              className="ml-3 h-5 w-5 text-gray-400"
              src={dropdownIcon}
            />
          </a>
        )}
        <div className="flex items-center gap-4">
          <img
            alt="notification"
            className="w-6 h-6 cursor-pointer"
            src={notificationIcon}
          />
          <div className="relative flex items-center gap-4 cursor-pointer">
            <img
              alt="avatar"
              className="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        </div> */}
      </div>
      <SearchModal
        open={showDialog}
        setOpen={() => setShowDialog(false)}
        selectedDomain={selectedDomain}
      />
    </section>
  );
};

export default Header;
