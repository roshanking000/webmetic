import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/provider/authProvider";
import { addWebsite } from "@/api/connectedWebsitesService";

const AddWebsiteModal = ({ open, setOpen, handleAddWebsite }) => {
  const { account } = useAuth();
  const { t } = useTranslation();

  const [loadingView, setLoadingView] = useState(false);
  const [website, setWebsite] = useState("");

  const handleSubmit = async () => {
    if (isValidURL(website) === false) {
      toast.error("Please enter a correct domain!");
      return;
    }
    setLoadingView(true);

    const result = await addWebsite(account.email, website);
    setLoadingView(false);
    setOpen();
    handleAddWebsite();
    if (result.status === "success") {
      toast.success(result.msg)
      setWebsite("");
    }
    else toast.error(result.msg);
  };

  const isValidURL = (url) => {
    // Regular expression to match valid URLs
    const urlRegex = /^(https):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
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
              <Dialog.Panel className="inline-flex flex-col items-start py-[15px] relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all min-w-[554px]">
                <div className="flex px-4 pt-4 items-center justify-end w-full">
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
                      d="M11.1889 10.0101L15.5997 5.59924C15.6793 5.52237 15.7428 5.43042 15.7865 5.32875C15.8302 5.22708 15.8531 5.11773 15.8541 5.00708C15.8551 4.89643 15.834 4.7867 15.7921 4.68428C15.7502 4.58187 15.6883 4.48883 15.6101 4.41058C15.5318 4.33234 15.4388 4.27046 15.3364 4.22856C15.2339 4.18666 15.1242 4.16557 15.0136 4.16654C14.9029 4.1675 14.7936 4.19049 14.6919 4.23416C14.5902 4.27783 14.4983 4.34132 14.4214 4.42091L10.0106 8.83174L5.59973 4.42091C5.44256 4.26911 5.23206 4.18512 5.01356 4.18702C4.79507 4.18891 4.58606 4.27656 4.43155 4.43106C4.27704 4.58557 4.1894 4.79458 4.1875 5.01308C4.18561 5.23157 4.2696 5.44208 4.4214 5.59924L8.83223 10.0101L4.4214 14.4209C4.34181 14.4978 4.27832 14.5897 4.23465 14.6914C4.19097 14.7931 4.16799 14.9024 4.16702 15.0131C4.16606 15.1237 4.18715 15.2335 4.22905 15.3359C4.27095 15.4383 4.33283 15.5313 4.41107 15.6096C4.48931 15.6878 4.58236 15.7497 4.68477 15.7916C4.78718 15.8335 4.89692 15.8546 5.00757 15.8536C5.11822 15.8527 5.22757 15.8297 5.32924 15.786C5.43091 15.7423 5.52286 15.6788 5.59973 15.5992L10.0106 11.1884L14.4214 15.5992C14.5786 15.751 14.7891 15.835 15.0076 15.8331C15.2261 15.8312 15.4351 15.7436 15.5896 15.5891C15.7441 15.4346 15.8317 15.2256 15.8336 15.0071C15.8355 14.7886 15.7515 14.5781 15.5997 14.4209L11.1889 10.0101Z"
                      fill="#9CA3AF"
                    />
                  </svg>
                </div>
                <p className="text-2xl text-left font-semibold text-primary-600 p-[15px] w-full">
                  {t('personal_website_information')}
                </p>
                <div className="flex flex-col justify-center items-center gap-4 px-6 pb-6 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm text-left font-medium text-neutral-600 w-full">
                      {t('your_website')}
                    </p>
                    <div className="relative flex items-start py-2 rounded-lg bg-gray-50 border border-gray-300 w-full">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.832 11C9.6665 12.177 9.3865 13.1908 9.0265 13.9298C8.851 14.2903 8.6595 14.5805 8.44875 14.7773C8.30525 14.9113 8.1595 15 8 15C7.8405 15 7.69475 14.9113 7.55125 14.7773C7.3405 14.5805 7.149 14.2903 6.9735 13.9298C6.6135 13.1908 6.3335 12.177 6.168 11H9.832ZM14.001 11C13.2348 12.835 11.6512 14.245 9.70625 14.7732C10.2175 13.9142 10.6245 12.585 10.8375 11H14.001ZM5.1625 11C5.3755 12.585 5.7825 13.9142 6.29375 14.7732C4.3485 14.2448 2.765 12.8348 1.999 11H5.1625ZM5.05725 7C5.01975 7.484 5 7.98575 5 8.5C5 9.01425 5.01975 9.516 5.05725 10H1.67425C1.56025 9.5185 1.5 9.01625 1.5 8.5C1.5 7.98375 1.56025 7.4815 1.67425 7H5.05725ZM9.94125 7C9.97975 7.4825 10 7.9845 10 8.5C10 9.0155 9.97975 9.5175 9.94125 10H6.05875C6.02025 9.5175 6 9.0155 6 8.5C6 7.9845 6.02025 7.4825 6.05875 7H9.94125ZM14.3258 7C14.4398 7.4815 14.5 7.98375 14.5 8.5C14.5 9.01625 14.4398 9.5185 14.3258 10H10.9427C10.9803 9.516 11 9.01425 11 8.5C11 7.98575 10.9803 7.484 10.9427 7H14.3258ZM6.29375 2.22675C5.7825 3.08575 5.3755 4.415 5.1625 6H1.999C2.76525 4.165 4.34875 2.755 6.29375 2.22675ZM8 2C8.1595 2 8.30525 2.08875 8.44875 2.22275C8.6595 2.4195 8.851 2.70975 9.0265 3.07025C9.3865 3.80925 9.6665 4.823 9.832 6H6.168C6.3335 4.823 6.6135 3.80925 6.9735 3.07025C7.149 2.70975 7.3405 2.4195 7.55125 2.22275C7.69475 2.08875 7.8405 2 8 2ZM9.70625 2.22675C11.6515 2.75525 13.235 4.16525 14.001 6H10.8375C10.6245 4.415 10.2175 3.08575 9.70625 2.22675Z"
                            fill="#64748B"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="bg-gray-50 block w-full h-5 pl-10 text-sm font-normal text-[#6B7280] border-none focus:ring-0"
                        placeholder={t('write_website_here')}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={clsx(
                    "mx-auto text-sm font-medium text-neutral-50 w-1/2 h-[45px] rounded-[10px] p-[10px]",
                    website === ""
                      ? "cursor-not-allowed bg-primary-400"
                      : "bg-primary-500"
                  )}
                  disabled={website === "" ? true : false}
                  onClick={handleSubmit}
                >
                  {loadingView === true && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {t('submit')}
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddWebsiteModal;
