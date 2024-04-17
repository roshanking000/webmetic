import { useNavigate } from "react-router-dom";

import InformationIcon from "../../assets/icons/InformationIcon";
import FolderIcon from "../../assets/icons/FolderIcon";
import QuestionCircleIcon from "../../assets/icons/QuestionCircleIcon";
import FileShieldIcon from "../../assets/icons/FileShieldIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";

const HelpCenterPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-[9px]">
      <div className="flex p-[10px] flex-col justify-center items-start gap-5 rounded-2xl border border-dashboard">
        <div className="flex flex-col justify-center items-start gap-[5px]">
          <p className="text-[28px] font-semibold text-ellipsis text-primary-600">
            Help Center
          </p>
          <div className="flex items-center gap-[10px]">
            <div>
              <InformationIcon color="#5082C4" />
            </div>
            <p className="text-sm font-normal text-secondary-400">
              Webmatic help center is here to give you solution about Webmatic.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 px-8 gap-x-6 gap-y-5">
        <div className="flex p-6 flex-col justify-center items-start gap-4 rounded-2xl bg-white hover:bg-gray-100 cursor-pointer">
          <div className="flex p-4 rounded-full border-[2px] border-primary-100">
            <FolderIcon />
          </div>
          <p className="text-xl font-bold text-neutral-800">Get Started</p>
          <p className="text-sm font-medium text-neutral-500">
            Discover Webmatic and learn from tutorial
          </p>
        </div>
        <div
          className="flex p-6 flex-col justify-center items-start gap-4 rounded-2xl bg-white hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/help-center/faq")}
        >
          <div className="flex p-4 rounded-full border-[2px] border-primary-100">
            <QuestionCircleIcon />
          </div>
          <p className="text-xl font-bold text-neutral-800">FAQ</p>
          <p className="text-sm font-medium text-neutral-500">
            Frequently Asked Questions
          </p>
        </div>
        <div
          className="flex p-6 flex-col justify-center items-start gap-4 rounded-2xl bg-white hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/help-center/privacy_policy")}
        >
          <div className="flex p-4 rounded-full border-[2px] border-primary-100">
            <FileShieldIcon />
          </div>
          <p className="text-xl font-bold text-neutral-800">Privacy Policy</p>
          <p className="text-sm font-medium text-neutral-500">
            Learn about the policy of Webmatic
          </p>
        </div>
        <div
          className="flex p-6 flex-col justify-center items-start gap-4 rounded-2xl bg-white hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/help-center/contact_support")}
        >
          <div className="flex p-4 rounded-full border-[2px] border-primary-100">
            <PhoneIcon />
          </div>
          <p className="text-xl font-bold text-neutral-800">Contact Support</p>
          <p className="text-sm font-medium text-neutral-500">
            Get support if you having trouble
          </p>
        </div>
      </div>
    </section>
  );
};

export default HelpCenterPage;
