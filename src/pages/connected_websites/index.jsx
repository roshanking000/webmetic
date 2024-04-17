import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { fetchConnectedWebsites } from "@/api/connectedWebsitesService";
import { useAuth } from "@/provider/authProvider";
import AddWebsiteModal from "@/components/modals/add_website_modal";

import WebsiteIcon from "@/assets/icons/WebsiteIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import InformationIcon from "@/assets/icons/InformationIcon";

import WordpressIcon from "@/assets/images/wordpress.svg";
import WixIcon from "@/assets/images/wix.svg";
import JoomlaIcon from "@/assets/images/joomla.svg";
import ShopifyIcon from "@/assets/images/shopify.svg";
import SuqarespaceIcon from "@/assets/images/suqarespace.svg";
import { t } from "i18next";

const OverView = ({ data, handleAddWebsite }) => {
  const { t } = useTranslation();

  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex flex-col gap-[10px] p-[10px] rounded-2xl border border-dashboard">
      <div className="flex p-[10px] items-center">
        <div className="flex flex-col justify-center gap-[5px]">
          <p className="text-[28px] font-semibold text-primary-600">
            {t('connected_websites.title')}
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
                  index === 0
                    ? "bg-secondary-base border-secondary-500 text-secondary-100"
                    : "bg-grey-100 border-gray-100 text-grey-400"
                )}
              >
                <WebsiteIcon fill={index === 0 ? "#ECF1FB" : "#858883"} />
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
            {t('addmorewebsite')}
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

const UseIntegrationSection = () => {
  const [trackingCode, setTrackingCode] = useState("AVC123-05246");

  return (
    <div className="flex mt-[18px] p-[10px] flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center gap-[5px]">
          <p className="text-base font-semibold text-primary-600 text-ellipsis">
            Use Integration
          </p>
          <div className="flex items-center gap-[10px]">
            <InformationIcon color="#5082C4" />
            <p className="text-sm font-normal text-secondary-400">
              Install your Webmatic tracking code in below integrations
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-[10px]">
          <p className="text-base font-semibold text-primary-600 text-ellipsis">
            Your Webmatic tracking code:
          </p>
          <div className="relative min-w-[250px] w-[350px]">
            <input
              type="text"
              className="block w-full p-[10px] text-sm font-normal text-neutral-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
            />
            <CopyToClipboard
              text={trackingCode}
              onCopy={() => toast.success("Copied!")}
            >
              <button
                type="submit"
                className="text-white absolute end-2.5 top-[3px] bottom-[3px] bg-secondary-400 hover:bg-blue-800 focus:ring-0 focus:outline-none font-medium rounded-lg text-xs px-3 py-2"
              >
                Copy
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex w-[200px] p-[10px] justify-between items-center rounded-[10px] border border-secondary-200">
          <div className="flex justify-between items-center">
            <img
              className="w-10 h-10 rounded-full border border-secondary-100"
              src={WordpressIcon}
            />
            <p className="text-base font-semibold text-neutral-800">
              Wordpress
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M15.6766 9.4006C15.7496 9.20918 15.7687 8.99854 15.7314 8.79533C15.6942 8.59212 15.6023 8.40548 15.4673 8.25902L11.6099 4.06973C11.521 3.9697 11.4146 3.88992 11.2969 3.83503C11.1793 3.78014 11.0527 3.75125 10.9247 3.75004C10.7966 3.74883 10.6697 3.77533 10.5511 3.82799C10.4326 3.88065 10.325 3.95842 10.2344 4.05675C10.1439 4.15509 10.0723 4.27202 10.0238 4.40074C9.97528 4.52945 9.95088 4.66736 9.952 4.80642C9.95311 4.94548 9.97971 5.08291 10.0303 5.21069C10.0808 5.33847 10.1543 5.45404 10.2464 5.55065L12.4586 7.9532H3.21435C2.95859 7.9532 2.7133 8.06354 2.53245 8.25996C2.3516 8.45637 2.25 8.72276 2.25 9.00052C2.25 9.27829 2.3516 9.54468 2.53245 9.74109C2.7133 9.9375 2.95859 10.0478 3.21435 10.0478H12.4586L10.2473 12.4494C10.1552 12.546 10.0818 12.6615 10.0312 12.7893C9.98067 12.9171 9.95407 13.0545 9.95296 13.1936C9.95185 13.3326 9.97625 13.4706 10.0247 13.5993C10.0732 13.728 10.1448 13.8449 10.2354 13.9432C10.3259 14.0416 10.4336 14.1194 10.5521 14.172C10.6706 14.2247 10.7976 14.2512 10.9256 14.25C11.0537 14.2488 11.1802 14.2199 11.2979 14.165C11.4155 14.1101 11.522 14.0303 11.6109 13.9303L15.4683 9.74098C15.5576 9.64348 15.6284 9.52781 15.6766 9.4006Z"
              fill="#363936"
            />
          </svg>
        </div>
        <div className="flex w-[200px] p-[10px] justify-between items-center rounded-[10px] border border-secondary-200">
          <div className="flex justify-between items-center">
            <img
              className="w-10 h-10 rounded-full border border-secondary-100"
              src={WixIcon}
            />
            <p className="text-base font-semibold text-neutral-800">Wix</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M15.6766 9.4006C15.7496 9.20918 15.7687 8.99854 15.7314 8.79533C15.6942 8.59212 15.6023 8.40548 15.4673 8.25902L11.6099 4.06973C11.521 3.9697 11.4146 3.88992 11.2969 3.83503C11.1793 3.78014 11.0527 3.75125 10.9247 3.75004C10.7966 3.74883 10.6697 3.77533 10.5511 3.82799C10.4326 3.88065 10.325 3.95842 10.2344 4.05675C10.1439 4.15509 10.0723 4.27202 10.0238 4.40074C9.97528 4.52945 9.95088 4.66736 9.952 4.80642C9.95311 4.94548 9.97971 5.08291 10.0303 5.21069C10.0808 5.33847 10.1543 5.45404 10.2464 5.55065L12.4586 7.9532H3.21435C2.95859 7.9532 2.7133 8.06354 2.53245 8.25996C2.3516 8.45637 2.25 8.72276 2.25 9.00052C2.25 9.27829 2.3516 9.54468 2.53245 9.74109C2.7133 9.9375 2.95859 10.0478 3.21435 10.0478H12.4586L10.2473 12.4494C10.1552 12.546 10.0818 12.6615 10.0312 12.7893C9.98067 12.9171 9.95407 13.0545 9.95296 13.1936C9.95185 13.3326 9.97625 13.4706 10.0247 13.5993C10.0732 13.728 10.1448 13.8449 10.2354 13.9432C10.3259 14.0416 10.4336 14.1194 10.5521 14.172C10.6706 14.2247 10.7976 14.2512 10.9256 14.25C11.0537 14.2488 11.1802 14.2199 11.2979 14.165C11.4155 14.1101 11.522 14.0303 11.6109 13.9303L15.4683 9.74098C15.5576 9.64348 15.6284 9.52781 15.6766 9.4006Z"
              fill="#363936"
            />
          </svg>
        </div>
        <div className="flex w-[200px] p-[10px] justify-between items-center rounded-[10px] border border-secondary-200">
          <div className="flex justify-between items-center">
            <img
              className="w-10 h-10 rounded-full border border-secondary-100"
              src={JoomlaIcon}
            />
            <p className="text-base font-semibold text-neutral-800">Joomla!</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M15.6766 9.4006C15.7496 9.20918 15.7687 8.99854 15.7314 8.79533C15.6942 8.59212 15.6023 8.40548 15.4673 8.25902L11.6099 4.06973C11.521 3.9697 11.4146 3.88992 11.2969 3.83503C11.1793 3.78014 11.0527 3.75125 10.9247 3.75004C10.7966 3.74883 10.6697 3.77533 10.5511 3.82799C10.4326 3.88065 10.325 3.95842 10.2344 4.05675C10.1439 4.15509 10.0723 4.27202 10.0238 4.40074C9.97528 4.52945 9.95088 4.66736 9.952 4.80642C9.95311 4.94548 9.97971 5.08291 10.0303 5.21069C10.0808 5.33847 10.1543 5.45404 10.2464 5.55065L12.4586 7.9532H3.21435C2.95859 7.9532 2.7133 8.06354 2.53245 8.25996C2.3516 8.45637 2.25 8.72276 2.25 9.00052C2.25 9.27829 2.3516 9.54468 2.53245 9.74109C2.7133 9.9375 2.95859 10.0478 3.21435 10.0478H12.4586L10.2473 12.4494C10.1552 12.546 10.0818 12.6615 10.0312 12.7893C9.98067 12.9171 9.95407 13.0545 9.95296 13.1936C9.95185 13.3326 9.97625 13.4706 10.0247 13.5993C10.0732 13.728 10.1448 13.8449 10.2354 13.9432C10.3259 14.0416 10.4336 14.1194 10.5521 14.172C10.6706 14.2247 10.7976 14.2512 10.9256 14.25C11.0537 14.2488 11.1802 14.2199 11.2979 14.165C11.4155 14.1101 11.522 14.0303 11.6109 13.9303L15.4683 9.74098C15.5576 9.64348 15.6284 9.52781 15.6766 9.4006Z"
              fill="#363936"
            />
          </svg>
        </div>
        <div className="flex w-[200px] p-[10px] justify-between items-center rounded-[10px] border border-secondary-200">
          <div className="flex justify-between items-center">
            <img
              className="w-10 h-10 rounded-full border border-secondary-100"
              src={ShopifyIcon}
            />
            <p className="text-base font-semibold text-neutral-800">Shopify</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M15.6766 9.4006C15.7496 9.20918 15.7687 8.99854 15.7314 8.79533C15.6942 8.59212 15.6023 8.40548 15.4673 8.25902L11.6099 4.06973C11.521 3.9697 11.4146 3.88992 11.2969 3.83503C11.1793 3.78014 11.0527 3.75125 10.9247 3.75004C10.7966 3.74883 10.6697 3.77533 10.5511 3.82799C10.4326 3.88065 10.325 3.95842 10.2344 4.05675C10.1439 4.15509 10.0723 4.27202 10.0238 4.40074C9.97528 4.52945 9.95088 4.66736 9.952 4.80642C9.95311 4.94548 9.97971 5.08291 10.0303 5.21069C10.0808 5.33847 10.1543 5.45404 10.2464 5.55065L12.4586 7.9532H3.21435C2.95859 7.9532 2.7133 8.06354 2.53245 8.25996C2.3516 8.45637 2.25 8.72276 2.25 9.00052C2.25 9.27829 2.3516 9.54468 2.53245 9.74109C2.7133 9.9375 2.95859 10.0478 3.21435 10.0478H12.4586L10.2473 12.4494C10.1552 12.546 10.0818 12.6615 10.0312 12.7893C9.98067 12.9171 9.95407 13.0545 9.95296 13.1936C9.95185 13.3326 9.97625 13.4706 10.0247 13.5993C10.0732 13.728 10.1448 13.8449 10.2354 13.9432C10.3259 14.0416 10.4336 14.1194 10.5521 14.172C10.6706 14.2247 10.7976 14.2512 10.9256 14.25C11.0537 14.2488 11.1802 14.2199 11.2979 14.165C11.4155 14.1101 11.522 14.0303 11.6109 13.9303L15.4683 9.74098C15.5576 9.64348 15.6284 9.52781 15.6766 9.4006Z"
              fill="#363936"
            />
          </svg>
        </div>
        <div className="flex w-[200px] p-[10px] justify-between items-center rounded-[10px] border border-secondary-200">
          <div className="flex justify-between items-center">
            <img
              className="w-10 h-10 rounded-full border border-secondary-100"
              src={SuqarespaceIcon}
            />
            <p className="text-base font-semibold text-neutral-800">
              Suqarespace
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M15.6766 9.4006C15.7496 9.20918 15.7687 8.99854 15.7314 8.79533C15.6942 8.59212 15.6023 8.40548 15.4673 8.25902L11.6099 4.06973C11.521 3.9697 11.4146 3.88992 11.2969 3.83503C11.1793 3.78014 11.0527 3.75125 10.9247 3.75004C10.7966 3.74883 10.6697 3.77533 10.5511 3.82799C10.4326 3.88065 10.325 3.95842 10.2344 4.05675C10.1439 4.15509 10.0723 4.27202 10.0238 4.40074C9.97528 4.52945 9.95088 4.66736 9.952 4.80642C9.95311 4.94548 9.97971 5.08291 10.0303 5.21069C10.0808 5.33847 10.1543 5.45404 10.2464 5.55065L12.4586 7.9532H3.21435C2.95859 7.9532 2.7133 8.06354 2.53245 8.25996C2.3516 8.45637 2.25 8.72276 2.25 9.00052C2.25 9.27829 2.3516 9.54468 2.53245 9.74109C2.7133 9.9375 2.95859 10.0478 3.21435 10.0478H12.4586L10.2473 12.4494C10.1552 12.546 10.0818 12.6615 10.0312 12.7893C9.98067 12.9171 9.95407 13.0545 9.95296 13.1936C9.95185 13.3326 9.97625 13.4706 10.0247 13.5993C10.0732 13.728 10.1448 13.8449 10.2354 13.9432C10.3259 14.0416 10.4336 14.1194 10.5521 14.172C10.6706 14.2247 10.7976 14.2512 10.9256 14.25C11.0537 14.2488 11.1802 14.2199 11.2979 14.165C11.4155 14.1101 11.522 14.0303 11.6109 13.9303L15.4683 9.74098C15.5576 9.64348 15.6284 9.52781 15.6766 9.4006Z"
              fill="#363936"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const GoogleTagManagerSection = () => {
  return (
    <div className="flex items-start mt-10 p-[10px] flex-col gap-5">
      <div className="flex flex-col items-start gap-[5px]">
        <p className="text-base font-semibold text-ellipsis text-primary-600">
          Setup with Google Tag Manager
        </p>
        <div className="flex items-center gap-[10px]">
          <InformationIcon color="#5082C4" />
          <p className="text-sm font-normal text-secondary-400">
            Select the GTM account and then the tag container you’d like to use.
            Then click Create and Publish Tag.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="flex px-3 py-[5px] rounded-lg border border-secondary-400 bg-secondary-500 text-sm font-medium text-ellipsis text-secondary-100"
      >
        Sign-in with Google
      </button>
    </div>
  );
};

const ManualInstallationSection = ({ customerId }) => {
  const { t } = useTranslation();
  const [manualCode, setManualCode] = useState("");

  return (
    <div className="flex p-[10px] flex-col items-start gap-5 mt-10">
      <div className="flex flex-col items-start gap-[5px]">
        <p className="text-base font-semibold text-ellipsis text-primary-600">
          {t('connected_websites.manual_installation')}
        </p>
        <div className="flex items-center gap-[10px]">
          <div className="w-3 h-3">
            <InformationIcon color="#5082C4" />
          </div>
          <p className="text-sm font-normal text-secondary-400">
            {t('connected_websites.info')}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start rounded-lg border border-gray-300">
        {/* <textarea
          rows="4"
          className="block p-x-4 py-3 w-[500px] h-[166px] text-sm font-normal text-gray-500 bg-gray-50 border-0 focus:ring-0 focus:border-blue-500 resize-none"
          onChange={(e) => setManualCode(e.target.value)}
        >
        </textarea> */}
        <code className="text-sm font-normal text-gray-500 px-4 py-3">
          &lt;script src="https://t.webmetic.de/iav.js?id={customerId}" async&gt;&lt;/script&gt;
        </code>
        <div className="flex items-center border-t-[1px] border-gray-300 rounded-b-lg bg-gray-50 w-full px-4 py-3">
          <code className="text-sm font-normal text-black">
            Account ID: {customerId}
          </code>
        </div>
        <div className="flex p-3 items-center border-t-[1px] border-gray-300 rounded-b-lg bg-gray-50 w-full">
          <CopyToClipboard
            text={`<script src="https://t.webmetic.de/iav.js?id={customerId}" async></script>`}
            onCopy={() => toast.success("Copied!")}
          >
            <button
              type="button"
              className="text-white px-3 py-2 bg-secondary-400 hover:bg-blue-800 focus:ring-0 focus:outline-none font-semibold rounded-lg text-xs"
            >
              {t('connected_websites.copy_code_button')}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

const ConnectedWebsitesPage = () => {
  const { account } = useAuth();
  const [connectedWebsites, setConnectedWebsites] = useState([]);
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetchConnectedWebsites(account._id);
    if (result.status === "success") {
      setConnectedWebsites(result.connected_websites);
      setCustomerId(result.customer_id);
    } else toast.error(result.msg);
  };

  return (
    <section className="flex flex-col">
      <OverView data={connectedWebsites} handleAddWebsite={getData} />
      {/* <UseIntegrationSection />
      <GoogleTagManagerSection /> */}
      <ManualInstallationSection customerId={customerId} />
    </section>
  );
};

export default ConnectedWebsitesPage;
