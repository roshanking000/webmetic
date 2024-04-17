import { useState, Fragment, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/provider/authProvider";
import {
  fetchUserList,
  addNewUser,
  editUser,
  removeUser,
  fetchAPIKey,
  generateAPIKey,
} from "@/api/setting";

import InformationIcon from "@/assets/icons/InformationIcon";
import EditOutlineIcon from "@/assets/icons/EditOutlineIcon";
import CheckIcon from "@/assets/icons/CheckIcon";
import AddIcon from "@/assets/icons/AddIcon";
import UploadIcon from "@/assets/icons/UploadIcon";

const MyProfileSection = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-xl font-semibold text-neutral-700">User Profiles</p>
        <div className="overflow-x-auto">
          <div className="w-full inline-block align-middle">
            <div className="max-h-[560px] overflow-auto">
              <table className="min-w-full">
                <thead className="border-b-[1px] border-[#E2E8F0]">
                  <tr className="uppercase text-xs font-bold text-neutral-800 bg-table">
                    <th scope="col" className="px-6 py-4 text-left">
                      <span className="cursor-pointer inline-flex items-center">
                        name
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      <span className="cursor-pointer inline-flex items-center">
                        email
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      <span className="cursor-pointer inline-flex items-center">
                        added by
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      <span className="cursor-pointer inline-flex items-center">
                        assigned role
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      <span className="cursor-pointer inline-flex items-center">
                        last activity
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      <span className="cursor-pointer inline-flex items-center">
                        action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-neutral-black-700">
                  {UserData.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="cursor-pointer hover:bg-gray-50 h-16 text-sm font-medium text-neutral-700"
                      >
                        <td className="text-left px-6 py-2">
                          <p>{item.name}</p>
                        </td>
                        <td className="text-left px-6 py-2">
                          <p>{item.email}</p>
                        </td>
                        <td className="text-left px-6 py-2">
                          <p>{item.added_by}</p>
                        </td>
                        <td className="text-left px-6 py-2">
                          <p>{item.assigned_role}</p>
                        </td>
                        <td className="text-left px-6 py-2">
                          <p>{item.last_activity}</p>
                        </td>
                        <td className="text-left px-6 py-2">
                          <div className="inline-flex items-start gap-[22px]">
                            <div className="flex px-[10px] py-[5px] justify-center items-center gap-[5px] rounded-full bg-secondary-100 hover:bg-secondary-200">
                              <EditOutlineIcon />
                              <p className="text-xs font-normal text-secondary-400">
                                Edit
                              </p>
                            </div>
                            <div className="flex px-[10px] py-[5px] justify-center items-center gap-[5px] rounded-full bg-danger-50 hover:bg-danger-100">
                              <TrashOutlineIcon />
                              <p className="text-xs font-normal text-danger-400">
                                Remove
                              </p>
                            </div>
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
      <div className="inline-flex flex-col items-start gap-4">
        <p className="text-xl font-semibold text-neutral-700">Email Reports</p>
        <div className="flex py-[10px] items-center gap-5">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-300 border-neutral-600 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:bg-white peer-checked:after:bg-secondary-500 after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-secondary-100 peer-checked:border-secondary-500 border-[1px]"></div>
            <span className="ms-2.5 text-sm font-normal text-neutral-800">
              Receive Daily Report
            </span>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-300 border-neutral-600 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:bg-white peer-checked:after:bg-secondary-500 after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-secondary-100 peer-checked:border-secondary-500 border-[1px]"></div>
            <span className="ms-2.5 text-sm font-normal text-neutral-800">
              Receive Weekly Report
            </span>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-300 border-neutral-600 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:bg-white peer-checked:after:bg-secondary-500 after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-secondary-100 peer-checked:border-secondary-500 border-[1px]"></div>
            <span className="ms-2.5 text-sm font-normal text-neutral-800">
              Receive Monthly Report
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

const TrashOutlineIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M11.6667 3.62411H9.33333V2.39604C9.33333 2.07033 9.21042 1.75797 8.99162 1.52766C8.77283 1.29735 8.47609 1.16797 8.16667 1.16797H5.83333C5.52391 1.16797 5.22717 1.29735 5.00838 1.52766C4.78958 1.75797 4.66667 2.07033 4.66667 2.39604V3.62411H2.33333C2.17862 3.62411 2.03025 3.6888 1.92085 3.80396C1.81146 3.91911 1.75 4.07529 1.75 4.23814C1.75 4.401 1.81146 4.55718 1.92085 4.67233C2.03025 4.78749 2.17862 4.85218 2.33333 4.85218H2.91667V11.6066C2.91667 11.9323 3.03958 12.2446 3.25838 12.4749C3.47717 12.7053 3.77391 12.8346 4.08333 12.8346H9.91667C10.2261 12.8346 10.5228 12.7053 10.7416 12.4749C10.9604 12.2446 11.0833 11.9323 11.0833 11.6066V4.85218H11.6667C11.8214 4.85218 11.9697 4.78749 12.0791 4.67233C12.1885 4.55718 12.25 4.401 12.25 4.23814C12.25 4.07529 12.1885 3.91911 12.0791 3.80396C11.9697 3.6888 11.8214 3.62411 11.6667 3.62411ZM5.83333 2.39604H8.16667V3.62411H5.83333V2.39604ZM9.91667 11.6066H4.08333V4.85218H9.91667V11.6066Z"
        fill="#FF635E"
      />
      <path
        d="M5.83333 5.46621C5.67862 5.46621 5.53025 5.53091 5.42085 5.64606C5.31146 5.76122 5.25 5.9174 5.25 6.08025V10.3785C5.25 10.5413 5.31146 10.6975 5.42085 10.8127C5.53025 10.9278 5.67862 10.9925 5.83333 10.9925C5.98804 10.9925 6.13642 10.9278 6.24581 10.8127C6.35521 10.6975 6.41667 10.5413 6.41667 10.3785V6.08025C6.41667 5.9174 6.35521 5.76122 6.24581 5.64606C6.13642 5.53091 5.98804 5.46621 5.83333 5.46621Z"
        fill="#FF635E"
      />
      <path
        d="M8.16667 5.46621C8.01196 5.46621 7.86358 5.53091 7.75419 5.64606C7.64479 5.76122 7.58333 5.9174 7.58333 6.08025V10.3785C7.58333 10.5413 7.64479 10.6975 7.75419 10.8127C7.86358 10.9278 8.01196 10.9925 8.16667 10.9925C8.32138 10.9925 8.46975 10.9278 8.57915 10.8127C8.68854 10.6975 8.75 10.5413 8.75 10.3785V6.08025C8.75 5.9174 8.68854 5.76122 8.57915 5.64606C8.46975 5.53091 8.32138 5.46621 8.16667 5.46621Z"
        fill="#FF635E"
      />
    </svg>
  );
};

const UserData = [
  {
    name: "Julia Roberts",
    email: "julia@example.io",
    added_by: "Robinson",
    assigned_role: "Admin",
    last_activity: "November 27, 2023",
  },
  {
    name: "Julia Roberts",
    email: "julia@example.io",
    added_by: "Robinson",
    assigned_role: "Viewer",
    last_activity: "November 27, 2023",
  },
  {
    name: "Julia Roberts",
    email: "julia@example.io",
    added_by: "Robinson",
    assigned_role: "Admin",
    last_activity: "November 27, 2023",
  },
];

const AddNewUserModal = ({ open, setOpen, handleUpdateUserList }) => {
  const { account } = useAuth();
  const { t } = useTranslation();

  const [loadingView, setLoadingView] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [userRole, setUserRole] = useState("Viewer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingView(true);
    const result = await addNewUser(account.email, userName, userEmail);
    console.log(result);
    if (result.status === "success") {
      setLoadingView(false);
      toast.success(result.msg);
      handleUpdateUserList();
      setUserName("");
      setUserEmail("");
      // setUserRole("Viewer");
    } else toast.error(result.msg);
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
              <Dialog.Panel className="flex flex-col sm:w-1/3 w-full items-center py-[15px] relative transform overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-xl transition-all sm:my-8 sm:min-w-[500px]">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center"
                >
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
                  <div className="flex p-[15px] flex-col items-start gap-4">
                    <p className="text-2xl font-semibold text-primary-600">
                      {t("settings.modal.title")}
                    </p>
                    <div className="flex items-start gap-[10px]">
                      <div className="w-3 h-3">
                        <InformationIcon color="#5082C4" />
                      </div>
                      <p className="text-sm font-normal text-secondary-400">
                        {t("settings.modal.info")}
                      </p>
                    </div>
                  </div>
                  <div className="flex px-6 pb-6 flex-col items-start gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-sm text-left font-medium text-neutral-600 w-full">
                        {t("settings.modal.user_name")}
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
                              d="M10.7304 4.99139C10.7304 6.44861 9.51865 7.64929 7.99967 7.64929C6.4807 7.64929 5.26891 6.44861 5.26891 4.99139C5.26891 3.53417 6.4807 2.3335 7.99967 2.3335C9.51865 2.3335 10.7304 3.53417 10.7304 4.99139ZM6.92295 9.35104C6.92308 9.35104 6.92321 9.35104 6.92334 9.35104H9.07601C9.07614 9.35104 9.07627 9.35104 9.0764 9.35104C9.89919 9.3521 10.6858 9.67216 11.2642 10.2375C11.8423 10.8026 12.1654 11.5663 12.1663 12.3604V14.4651C12.1663 14.5149 12.1462 14.565 12.1066 14.6037C12.0665 14.6429 12.0098 14.6668 11.9484 14.6668H4.05096C3.98952 14.6668 3.93283 14.6429 3.89279 14.6037C3.85313 14.565 3.83301 14.5149 3.83301 14.4651V12.3601C3.83406 11.5661 4.15713 10.8025 4.73518 10.2375C5.31359 9.67216 6.10016 9.3521 6.92295 9.35104Z"
                              fill="#6B7280"
                              stroke="#6B7280"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          className="bg-gray-50 block w-full h-5 pl-10 text-sm font-normal text-[#6B7280] border-none focus:ring-0"
                          placeholder="Write name here"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-sm text-left font-medium text-neutral-600 w-full">
                        {t("settings.modal.user_email")}
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
                              d="M7.99967 9.06887L14.183 4.12719C13.9456 3.93891 13.6446 3.8349 13.333 3.8335H2.66634C2.35479 3.8349 2.05377 3.93891 1.81634 4.12719L7.99967 9.06887Z"
                              fill="#64748B"
                            />
                            <path
                              d="M8.83301 10.0414C8.59037 10.2146 8.29381 10.3092 7.98834 10.3108C7.70367 10.3114 7.42657 10.2253 7.19901 10.0657L1.33301 5.3791V11.9224C1.33301 12.2524 1.47348 12.569 1.72353 12.8023C1.97358 13.0357 2.31272 13.1668 2.66634 13.1668H13.333C13.6866 13.1668 14.0258 13.0357 14.2758 12.8023C14.5259 12.569 14.6663 12.2524 14.6663 11.9224V5.3791L8.83301 10.0414Z"
                              fill="#64748B"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          className="bg-gray-50 block w-full h-5 pl-10 text-sm font-normal text-[#6B7280] border-none focus:ring-0"
                          placeholder="Write email address"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="flex flex-col gap-2 w-full">
                      <p className="text-sm text-left font-medium text-neutral-600 w-full">
                        Select user role
                      </p>
                      <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                          <span className="w-full inline-flex cursor-pointer justify-between items-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-neutral-500 hover:bg-gray-100 hover:text-gray-900 text-xs font-normal">
                            <span>{userRole}</span>
                            <svg
                              className="ml-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </span>
                        }
                      >
                        <Dropdown.Item
                          className="text-neutral-500 text-xs font-normal"
                          onClick={() => setUserRole("Admin")}
                        >
                          Admin
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-neutral-500 text-xs font-normal"
                          onClick={() => setUserRole("Viewer")}
                        >
                          Viewer
                        </Dropdown.Item>
                      </Dropdown>
                    </div> */}
                  </div>
                  <button
                    type="submit"
                    className={clsx(
                      "flex p-[10px] justify-center items-center gap-[10px] rounded-[10px] text-sm font-medium text-neutral-50 w-1/3 mb-8",
                      userName === "" || userEmail === ""
                        ? "cursor-not-allowed bg-secondary-400"
                        : "bg-secondary-500"
                    )}
                    disabled={
                      userName === "" || userEmail === "" ? true : false
                    }
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
                    {t("submit")}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const EditUserModal = ({ data, open, setOpen, handleUpdateUserList }) => {
  const { account } = useAuth();
  const { t } = useTranslation();

  const [loadingView, setLoadingView] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserName(data.name);
    setUserEmail(data.email);
    // setUserRole(data.role);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingView(true);
    const result = await editUser(
      account.email,
      data.name,
      data.email,
      userName,
      userEmail
    );
    console.log(result);
    if (result.status === "success") {
      setLoadingView(false);
      toast.success(result.msg);
      handleUpdateUserList();
    } else toast.error(result.msg);
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
              <Dialog.Panel className="flex flex-col sm:w-1/3 w-full items-center py-[15px] relative transform overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-xl transition-all sm:my-8 sm:min-w-[500px]">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center w-full"
                >
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
                  <div className="flex p-[15px] flex-col items-start gap-4 w-full">
                    <p className="text-2xl font-semibold text-primary-600">
                      {t("settings.edit_modal.title")}
                    </p>
                  </div>
                  <div className="flex px-6 pb-6 flex-col items-start gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-sm text-left font-medium text-neutral-600 w-full">
                        {t("settings.modal.user_name")}
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
                              d="M10.7304 4.99139C10.7304 6.44861 9.51865 7.64929 7.99967 7.64929C6.4807 7.64929 5.26891 6.44861 5.26891 4.99139C5.26891 3.53417 6.4807 2.3335 7.99967 2.3335C9.51865 2.3335 10.7304 3.53417 10.7304 4.99139ZM6.92295 9.35104C6.92308 9.35104 6.92321 9.35104 6.92334 9.35104H9.07601C9.07614 9.35104 9.07627 9.35104 9.0764 9.35104C9.89919 9.3521 10.6858 9.67216 11.2642 10.2375C11.8423 10.8026 12.1654 11.5663 12.1663 12.3604V14.4651C12.1663 14.5149 12.1462 14.565 12.1066 14.6037C12.0665 14.6429 12.0098 14.6668 11.9484 14.6668H4.05096C3.98952 14.6668 3.93283 14.6429 3.89279 14.6037C3.85313 14.565 3.83301 14.5149 3.83301 14.4651V12.3601C3.83406 11.5661 4.15713 10.8025 4.73518 10.2375C5.31359 9.67216 6.10016 9.3521 6.92295 9.35104Z"
                              fill="#6B7280"
                              stroke="#6B7280"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          className="bg-gray-50 block w-full h-5 pl-10 text-sm font-normal text-[#6B7280] border-none focus:ring-0"
                          placeholder="Write name here"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-sm text-left font-medium text-neutral-600 w-full">
                        {t("settings.modal.user_email")}
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
                              d="M7.99967 9.06887L14.183 4.12719C13.9456 3.93891 13.6446 3.8349 13.333 3.8335H2.66634C2.35479 3.8349 2.05377 3.93891 1.81634 4.12719L7.99967 9.06887Z"
                              fill="#64748B"
                            />
                            <path
                              d="M8.83301 10.0414C8.59037 10.2146 8.29381 10.3092 7.98834 10.3108C7.70367 10.3114 7.42657 10.2253 7.19901 10.0657L1.33301 5.3791V11.9224C1.33301 12.2524 1.47348 12.569 1.72353 12.8023C1.97358 13.0357 2.31272 13.1668 2.66634 13.1668H13.333C13.6866 13.1668 14.0258 13.0357 14.2758 12.8023C14.5259 12.569 14.6663 12.2524 14.6663 11.9224V5.3791L8.83301 10.0414Z"
                              fill="#64748B"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          className="bg-gray-50 block w-full h-5 pl-10 text-sm font-normal text-[#6B7280] border-none focus:ring-0"
                          placeholder="Write email address"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="flex flex-col gap-2 w-full">
                      <p className="text-sm text-left font-medium text-neutral-600 w-full">
                        Select user role
                      </p>
                      <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                          <span className="w-full inline-flex cursor-pointer justify-between items-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-neutral-500 hover:bg-gray-100 hover:text-gray-900 text-xs font-normal">
                            <span>{userRole}</span>
                            <svg
                              className="ml-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </span>
                        }
                      >
                        <Dropdown.Item
                          className="text-neutral-500 text-xs font-normal"
                          onClick={() => setUserRole("Admin")}
                        >
                          Admin
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-neutral-500 text-xs font-normal"
                          onClick={() => setUserRole("Viewer")}
                        >
                          Viewer
                        </Dropdown.Item>
                      </Dropdown>
                    </div> */}
                  </div>
                  <button
                    type="submit"
                    className={clsx(
                      "flex p-[10px] justify-center items-center gap-[10px] rounded-[10px] text-sm font-medium text-neutral-50 w-1/3 mb-8",
                      userName === "" || userEmail === ""
                        ? "cursor-not-allowed bg-secondary-400"
                        : "bg-secondary-500"
                    )}
                    disabled={
                      userName === "" || userEmail === "" ? true : false
                    }
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
                    {t("submit")}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const RemoveUserModal = ({ data, open, setOpen, handleDeleteUser }) => {
  const { t } = useTranslation();

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
              <Dialog.Panel className="flex flex-col w-[400px] items-center py-[15px] relative transform overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-xl transition-all sm:my-8 min-w-[500px]">
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
                <div className="flex px-6 py-5 flex-col items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                  >
                    <path
                      d="M35 7H7C5.06975 7 3.5 8.56975 3.5 10.5V31.5C3.5 33.4303 5.06975 35 7 35H35C36.9302 35 38.5 33.4303 38.5 31.5V10.5C38.5 8.56975 36.9302 7 35 7ZM12.25 28C11.284 28 10.5 27.216 10.5 26.25C10.5 25.284 11.284 24.5 12.25 24.5C13.216 24.5 14 25.284 14 26.25C14 27.216 13.216 28 12.25 28ZM12.25 22.75C11.284 22.75 10.5 21.966 10.5 21C10.5 20.034 11.284 19.25 12.25 19.25C13.216 19.25 14 20.034 14 21C14 21.966 13.216 22.75 12.25 22.75ZM12.25 17.5C11.284 17.5 10.5 16.716 10.5 15.75C10.5 14.784 11.284 14 12.25 14C13.216 14 14 14.784 14 15.75C14 16.716 13.216 17.5 12.25 17.5ZM29.75 28H19.25C18.2823 28 17.5 27.216 17.5 26.25C17.5 25.284 18.2823 24.5 19.25 24.5H29.75C30.7178 24.5 31.5 25.284 31.5 26.25C31.5 27.216 30.7178 28 29.75 28ZM29.75 22.75H19.25C18.2823 22.75 17.5 21.966 17.5 21C17.5 20.034 18.2823 19.25 19.25 19.25H29.75C30.7178 19.25 31.5 20.034 31.5 21C31.5 21.966 30.7178 22.75 29.75 22.75ZM29.75 17.5H19.25C18.2823 17.5 17.5 16.716 17.5 15.75C17.5 14.784 18.2823 14 19.25 14H29.75C30.7178 14 31.5 14.784 31.5 15.75C31.5 16.716 30.7178 17.5 29.75 17.5Z"
                      fill="#80A7E5"
                    />
                  </svg>
                  <p className="text-base font-normal text-center text-gray-500 w-[300px]">
                    {t("ask_remove_user")}
                    {/* Are you sure you want to remove{" "}
                    <span className="text-secondary-400">
                      {'"' + data.name + '"'}
                    </span>
                    &nbsp;from user list? */}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-4 px-6 pb-6">
                  <button
                    className="flex px-3 py-2 justify-center items-center rounded-lg bg-secondary-400 text-sm font-medium text-white"
                    onClick={() => {
                      handleDeleteUser(data);
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const SubscriptionSection = ({ apiKey, handleCreateAPIKey }) => {
  const { t } = useTranslation();

  const [showAPIKey, setShowAPIKey] = useState(false);

  const copyAPIKey = () => {
    toast.success("Copied!");
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col justify-center items-start gap-6">
        <div className="flex flex-col justify-center items-start gap-4 w-full">
          <p className="text-xl font-semibold text-neutral-700">
            {t("settings.api_key")}
          </p>
          {apiKey === "" ? (
            <button
              type="button"
              className="flex p-4 justify-center items-center gap-[10px] rounded-xl bg-primary-400 text-sm font-semibold text-white w-full"
              onClick={handleCreateAPIKey}
            >
              {t("settings.create_api_key_button")}
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full">
              <div className="relative sm:w-[600px]">
                <input
                  type={showAPIKey === false ? "password" : "text"}
                  className="select-none border border-input rounded-[10px] block w-full px-5 py-4 focus:ring-0 focus:border-input"
                  value={apiKey}
                  disabled={true}
                />
                {showAPIKey === false ? (
                  <EyeSlashIcon
                    className="absolute top-[30%] right-4 w-6 h-6 cursor-pointer"
                    onClick={() => setShowAPIKey(true)}
                  />
                ) : (
                  <EyeIcon
                    className="absolute top-[30%] right-4 w-6 h-6 cursor-pointer"
                    onClick={() => setShowAPIKey(false)}
                  />
                )}
              </div>
              <button
                type="button"
                className="flex w-fit p-4 justify-center items-center gap-[10px] rounded-xl bg-primary-400 text-sm font-semibold text-white"
                onClick={copyAPIKey}
              >
                {t("settings.copy_api_key_button")}
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-start gap-4">
          <p className="text-xl font-semibold text-neutral-700">
            {t("settings.plans_pricing")}
          </p>
          <div className="flex items-center gap-[10px]">
            <div className="w-3 h-3">
              <InformationIcon color="#5082C4" />
            </div>
            <p className="text-sm font-normal text-secondary-400">
              {t("settings.plans_info")}
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center me-5 cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-0  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>{" "}
          <span className="ms-4 text-lg font-medium text-greyscale-600">
            {t("settings.billed_monthly")}
          </span>
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-6 xl:max-w-screen-xl w-full mx-auto">
        <div className="flex px-8 py-[26px] flex-col justify-between items-start gap-7 rounded-2xl bg-gray-50 min-w-[325px] w-[325px] h-full mx-auto hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-800 group">
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col items-start gap-[10px] text-greyscale-900 group-hover:text-white">
              <p className="text-base font-medium">{t("settings.plan_free")}</p>
              <p className="text-[26px] font-bold">
                $31
                <span className="text-sm font-normal text-greyscale-600 group-hover:text-[#F9FFFC]">
                  /{t("settings.period")}
                </span>
              </p>
            </div>
            <div className="w-full h-[1px] bg-greyscale-300"></div>
            <div className="flex flex-col items-start gap-3 text-sm font-normal text-greyscale-600 group-hover:text-[#F9FFFC]">
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>50000 {t("settings.credits")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.validity")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.multilingual")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.image_upload")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.post_scheduling")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.posting_4sm_platforms")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.unlimited_sm_posting")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.basic_analytics")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.download_analytics")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.email_support")}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="flex p-2 justify-center items-center gap-[10px] rounded-xl bg-primary-400 group-hover:bg-white text-sm font-semibold text-white group-hover:text-primary-500 w-full"
          >
            {t("settings.choose_plan_button")}
          </button>
        </div>
        <div className="flex px-8 py-[26px] flex-col justify-between items-start gap-7 rounded-2xl bg-gray-50 min-w-[325px] w-[325px] h-full mx-auto hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-800 group">
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col items-start gap-[10px] text-greyscale-900 group-hover:text-white">
              <p className="text-base font-medium">
                {t("settings.plan_standard")}
              </p>
              <p className="text-[26px] font-bold">
                $59
                <span className="text-sm font-normal text-greyscale-600 group-hover:text-[#F9FFFC]">
                  /{t("settings.period")}
                </span>
              </p>
            </div>
            <div className="w-full h-[1px] bg-greyscale-300"></div>
            <div className="flex flex-col items-start gap-3 text-sm font-normal text-greyscale-600 group-hover:text-[#F9FFFC]">
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.all_features")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>100000 {t("settings.credits")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.validity")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.ai_image_creation")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.image_download")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.posting_8sm_platforms")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.unlimited_sm_posting")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.advanced_analytics")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.basic_recommendation")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.add_5members")}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="flex p-2 justify-center items-center gap-[10px] rounded-xl bg-primary-400 group-hover:bg-white text-sm font-semibold text-white group-hover:text-primary-500 w-full"
          >
            {t("settings.choose_plan_button")}
          </button>
        </div>
        <div className="flex px-8 py-[26px] flex-col justify-between items-start gap-7 rounded-2xl bg-gray-50 min-w-[325px] w-[325px] h-full mx-auto hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-800 group">
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col items-start gap-[10px] text-greyscale-900 group-hover:text-white">
              <p className="text-base font-medium">{t("settings.plan_pro")}</p>
              <p className="text-[26px] font-bold">
                $79
                <span className="text-sm font-normal text-greyscale-600 group-hover:text-[#F9FFFC]">
                  /{t("settings.period")}
                </span>
              </p>
            </div>
            <div className="w-full h-[1px] bg-greyscale-300"></div>
            <div className="flex flex-col items-start gap-3 text-sm font-normal text-greyscale-600 group-hover:text-[#F9FFFC]">
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>200000 {t("settings.credits")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.validity")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.image_upload")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.posting_10sm_platforms")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.posting_4sm_platforms")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.unlimited_sm_posting")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.basic_analytics")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.dedicated_support")}</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <p>{t("settings.add_10members")}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="flex p-2 justify-center items-center gap-[10px] rounded-xl bg-primary-400 group-hover:bg-white text-sm font-semibold text-white group-hover:text-primary-500 w-full"
          >
            {t("settings.choose_plan_button")}
          </button>
        </div>
      </div>
    </div>
  );
};

const UsersSection = ({ account, data, updateUserList, deleteUser }) => {
  const { t } = useTranslation();

  const [showAddNewUserDialog, setShowAddNewUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showRemoveUserDialog, setShowRemoveUserDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center px-[10px] items-start gap-[5px]">
        <p className="text-[28px] font-semibold text-primary-600 text-ellipsis">
          {t("settings.manage_users")}
        </p>
        <div className="flex items-center gap-[10px]">
          <div className="w-3 h-3">
            <InformationIcon color="#5082C4" />
          </div>
          <p className="text-sm font-normal text-secondary-400">
            {t("settings.users_info")}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="max-h-[560px] overflow-auto">
            <table className="min-w-full">
              <thead className="border-b-[1px] border-[#E2E8F0]">
                <tr className="uppercase text-xs font-bold text-neutral-800 bg-table">
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("settings.users.name")}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("settings.users.email")}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center text-nowrap">
                      {t("settings.users.added_by")}
                    </span>
                  </th>
                  {/* <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center">
                      assigned role
                    </span>
                  </th> */}
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center text-nowrap">
                      {t("settings.users.last_activity")}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left">
                    <span className="cursor-pointer inline-flex items-center">
                      {t("settings.users.action")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-neutral-700">
                {data.length === 0 && (
                  <tr className="hover:bg-gray-50">
                    <td colSpan={6} className="text-center">
                      {t("no_data")}
                    </td>
                  </tr>
                )}
                {data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 h-16 text-sm font-medium text-neutral-700"
                    >
                      <td className="text-left px-6 py-2">
                        <p>{item.name}</p>
                      </td>
                      <td className="text-left px-6 py-2">
                        <p>{item.email}</p>
                      </td>
                      <td className="text-left px-6 py-2">
                        <p>{item.added_by_user_info[0].name}</p>
                      </td>
                      {/* <td className="text-left px-6 py-2">
                        <p>{item.role}</p>
                      </td> */}
                      <td className="text-left px-6 py-2">
                        <p>
                          {format(
                            new Date(item.last_activity),
                            "MMMM dd, yyyy"
                          )}
                        </p>
                      </td>
                      <td className="text-left px-6 py-2">
                        <div className="inline-flex items-start gap-[22px]">
                          <div
                            className="flex px-[10px] py-[5px] justify-center items-center gap-[5px] rounded-full bg-secondary-100 hover:bg-secondary-200 cursor-pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowEditUserDialog(true);
                            }}
                          >
                            <EditOutlineIcon />
                            <p className="text-xs font-normal text-secondary-400">
                              {t("settings.users.edit_button")}
                            </p>
                          </div>
                          <div
                            className="flex px-[10px] py-[5px] justify-center items-center gap-[5px] rounded-full bg-danger-50 hover:bg-danger-100 cursor-pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowRemoveUserDialog(true);
                            }}
                          >
                            <TrashOutlineIcon />
                            <p className="text-xs font-normal text-danger-400">
                              {t("settings.users.remove_button")}
                            </p>
                          </div>
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
      <button
        type="button"
        className="inline-flex px-3 py-[10px] justify-center items-center gap-2 rounded-lg bg-secondary-400 w-fit"
        onClick={() => setShowAddNewUserDialog(true)}
      >
        <AddIcon />
        <p className="text-xs font-semibold text-neutral-50">
          {t("settings.users.add_new_user_button")}
        </p>
      </button>
      <AddNewUserModal
        open={showAddNewUserDialog}
        setOpen={() => setShowAddNewUserDialog(false)}
        handleUpdateUserList={() => {
          updateUserList();
          setShowAddNewUserDialog(false);
        }}
      />
      {selectedItem !== null && (
        <>
          <EditUserModal
            data={selectedItem}
            open={showEditUserDialog}
            setOpen={() => setShowEditUserDialog(false)}
            handleUpdateUserList={() => {
              updateUserList();
              setShowEditUserDialog(false);
            }}
          />
          <RemoveUserModal
            data={selectedItem}
            open={showRemoveUserDialog}
            setOpen={() => setShowRemoveUserDialog(false)}
            handleDeleteUser={(data) => deleteUser(data)}
          />
        </>
      )}
    </div>
  );
};

const BulkTaggingSection = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-[10px]">
        <p className="text-xl font-semibold text-neutral-700">Bulk tagging</p>
        <div className="flex items-center gap-[10px]">
          <div className="w-3 h-3">
            <InformationIcon color="#5082C4" />
          </div>
          <p className="text-sm font-normal text-secondary-400">
            Bulk tagging helps you save manual work by automatically giving tags
            to your leads, e.g. ‘Hot’, ‘Customer’, or ‘Competitor’.
          </p>
        </div>
      </div>
      <div className="inline-flex p-[10px] flex-col justify-center items-start gap-[10px] rounded-[10px] bg-secondary-100 w-1/2">
        <p className="sm:hidden md:block text-base font-semibold text-secondary-500">
          Sample import file
        </p>
        <p className="text-sm font-normal text-ellipsis text-neutral-600">
          The following file include the required column headers for each field
          type with examples of each field
        </p>
        <p className="text-sm font-normal text-ellipsis text-secondary-500 underline">
          Download CSV template
        </p>
        <p className="text-base font-semibold text-secondary-500">Columns</p>
        <p className="text-sm font-normal text-neutral-600">
          Depending on the object(s) you are importing, your file must include
          at least one of the columns. The more information you provide, the
          better we can match the data.
        </p>
      </div>
      <button
        type="button"
        className="inline-flex px-3 py-[10px] justify-center items-center gap-2 rounded-lg bg-secondary-400 w-fit"
      >
        <UploadIcon />
        <p className="text-xs font-semibold text-neutral-50">Import file</p>
      </button>
    </div>
  );
};

const EmailTrackingSection = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-[10px]">
        <p className="text-xl font-semibold text-neutral-700">Email tracking</p>
        <div className="flex items-center gap-[10px]">
          <div className="w-3 h-3">
            <InformationIcon color="#5082C4" />
          </div>
          <p className="text-sm font-normal text-secondary-400">
            email tracking provides insight into when your emails are read and
            when recipients click into them,
            <br /> allowing you to better anticipate customer interactions and
            improve the effectiveness of your communication.
          </p>
        </div>
      </div>
      <div className="flex p-[10px] flex-col justify-center items-start gap-5 rounded-[10px] bg-secondary-100">
        <div className="flex flex-col justify-center items-start gap-[10px]">
          <p className="text-base font-semibold text-secondary-500">
            Email tracking for Gmail
          </p>
          <p className="text-sm font-normal text-neutral-600">
            This Chrome extension allows you to easily track every email and
            link in Gmail. When installing, your inbox will open automatically
            and you can immediately link it to Webmatic.
          </p>
          <button
            type="button"
            className="flex p-[10px] justify-center items-start gap-[10px] rounded-lg bg-secondary-400 text-sm font-normal text-ellipsis text-white"
          >
            Install in chrome
          </button>
        </div>
        <div className="flex flex-col justify-center items-start gap-[10px]">
          <p className="text-base font-semibold text-secondary-500">
            Email Tracking for Outlook
          </p>
          <p className="text-sm font-normal text-neutral-600">
            The Outlook add-in works on both the desktop and web versions. Read
            our help article for the installation guide and the supported
            versions.
          </p>
          <button
            type="button"
            className="flex p-[10px] justify-center items-start gap-[10px] rounded-lg bg-secondary-400 text-sm font-normal text-ellipsis text-white"
          >
            Download for outlook
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const { account } = useAuth();
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = useState("Subscription");
  const [userList, setUserList] = useState(null);
  const [apiKey, setAPIKey] = useState("");

  useEffect(() => {
    if (currentTab === "Users") getUserList();
    else if (currentTab === "Subscription") getAPIKey();
  }, [currentTab]);

  const getUserList = async () => {
    const result = await fetchUserList(account.email);
    console.log(result);
    if (result.status === "success") {
      setUserList(result.data);
    } else toast.error("An unexpected error occurred!");
  };

  const deleteUser = async (data) => {
    const result = await removeUser(data.email, account.email);
    if (result.status === "success") {
      toast.success(result.msg);
      await getUserList();
    } else toast.error(result.msg);
  };

  const getAPIKey = async () => {
    const result = await fetchAPIKey(account.email);
    if (result.status === "success") setAPIKey(result.data);
    else toast.error(result.msg);
  };

  const handleCreateAPIKey = async () => {
    const result = await generateAPIKey(account.email);
    console.log(result);
    if (result.status === "success") setAPIKey(result.data);
    else toast.error(result.msg);
  };

  return (
    <section className="flex flex-col gap-8 px-[10px]">
      <div className="flex p-[10px] flex-col gap-5 rounded-2xl border border-dashboard">
        <div className="flex flex-col justify-center px-[10px] items-start gap-[5px]">
          <p className="text-[28px] font-semibold text-primary-600 text-ellipsis">
            {t("settings.title")}
          </p>
          <div className="flex items-center gap-[10px]">
            <div className="w-3 h-3">
              <InformationIcon color="#5082C4" />
            </div>
            <p className="text-sm font-normal text-secondary-400">
              {t("settings.info")}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* <div
            className={clsx(
              "flex p-[10px] justify-center items-center gap-[10px] border-b-[1px] text-base font-medium w-full cursor-pointer",
              currentTab === "My Profile"
                ? "text-primary-400 border-primary-400"
                : "text-neutral-800 border-neutral-100"
            )}
            onClick={() => setCurrentTab("My Profile")}
          >
            My Profile
          </div> */}
          <div
            className={clsx(
              "flex p-[10px] justify-center items-center gap-[10px] border-b-[1px] text-base font-medium w-full cursor-pointer",
              currentTab === "Subscription"
                ? "text-primary-400 border-primary-400"
                : "text-neutral-800 border-neutral-100"
            )}
            onClick={() => setCurrentTab("Subscription")}
          >
            {t("settings.tab_subscription")}
          </div>
          <div
            className={clsx(
              "flex p-[10px] justify-center items-center gap-[10px] border-b-[1px] text-base font-medium w-full cursor-pointer",
              currentTab === "Users"
                ? "text-primary-400 border-primary-400"
                : "text-neutral-800 border-neutral-100"
            )}
            onClick={() => setCurrentTab("Users")}
          >
            {t("settings.tab_users")}
          </div>
          {/* <div
            className={clsx(
              "flex p-[10px] justify-center items-center gap-[10px] border-b-[1px] text-base font-medium w-full cursor-pointer",
              currentTab === "Bulk Tagging"
                ? "text-primary-400 border-primary-400"
                : "text-neutral-800 border-neutral-100"
            )}
            onClick={() => setCurrentTab("Bulk Tagging")}
          >
            Bulk Tagging
          </div>
          <div
            className={clsx(
              "flex p-[10px] justify-center items-center gap-[10px] border-b-[1px] text-base font-medium w-full cursor-pointer",
              currentTab === "Email Tracking"
                ? "text-primary-400 border-primary-400"
                : "text-neutral-800 border-neutral-100"
            )}
            onClick={() => setCurrentTab("Email Tracking")}
          >
            Email Tracking
          </div> */}
        </div>
      </div>
      {currentTab === "My Profile" && <MyProfileSection />}
      {currentTab === "Subscription" && (
        <SubscriptionSection
          apiKey={apiKey}
          handleCreateAPIKey={handleCreateAPIKey}
        />
      )}
      {currentTab === "Users" && account !== null && userList !== null && (
        <UsersSection
          account={account}
          data={userList}
          updateUserList={async () => {
            await getUserList();
          }}
          deleteUser={async (data) => await deleteUser(data)}
        />
      )}
      {currentTab === "Bulk Tagging" && <BulkTaggingSection />}
      {currentTab === "Email Tracking" && <EmailTrackingSection />}
    </section>
  );
};

export default SettingsPage;
