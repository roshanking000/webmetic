import Breadcrumb from "../../components/breadcrumb";

const PrivacyPolicyPage = () => {
  return (
    <section className="flex flex-col gap-[7px]">
      <div className="flex p-[10px] flex-col justify-center items-start gap-5 rounded-2xl border border-dashboard">
        <div className="flex flex-col justify-center items-start gap-[5px] px-[10px]">
          <p className="text-[28px] font-semibold text-ellipsis text-primary-600">
            Help Center
          </p>
          <Breadcrumb
            breadcrumbs={[
              { label: 'Help Center', href: '/help-center' },
              { label: 'Privacy Policy', href: `#` },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col p-8 items-start gap-8 rounded-2xl bg-white">
        <div className="flex items-center gap-[6px]">
          <p className="text-lg font-semibold text-primary-400">
            Privacy Policy
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M9 16.25C7.66498 16.25 6.35994 15.8541 5.2499 15.1124C4.13987 14.3707 3.27471 13.3165 2.76382 12.0831C2.25292 10.8497 2.11925 9.49251 2.3797 8.18314C2.64015 6.87377 3.28303 5.67104 4.22703 4.72703C5.17104 3.78303 6.37377 3.14015 7.68314 2.8797C8.99251 2.61925 10.3497 2.75292 11.5831 3.26382C12.8165 3.77471 13.8707 4.63987 14.6124 5.7499C15.3541 6.85994 15.75 8.16498 15.75 9.5C15.748 11.2896 15.0362 13.0054 13.7708 14.2708C12.5054 15.5362 10.7896 16.248 9 16.25ZM9 4.1C7.93198 4.1 6.88795 4.41671 5.99992 5.01007C5.1119 5.60343 4.41977 6.44679 4.01105 7.43351C3.60234 8.42023 3.4954 9.50599 3.70376 10.5535C3.91212 11.601 4.42642 12.5632 5.18163 13.3184C5.93683 14.0736 6.89902 14.5879 7.94651 14.7962C8.99401 15.0046 10.0798 14.8977 11.0665 14.489C12.0532 14.0802 12.8966 13.3881 13.4899 12.5001C14.0833 11.6121 14.4 10.568 14.4 9.5C14.3984 8.06833 13.8289 6.69575 12.8166 5.6834C11.8043 4.67105 10.4317 4.10161 9 4.1Z"
              fill="#699250"
            />
            <path
              d="M9 11.525C8.82098 11.525 8.64929 11.4539 8.5227 11.3273C8.39612 11.2007 8.325 11.029 8.325 10.85V9.89285C8.325 9.80196 8.34335 9.712 8.37896 9.62837C8.41457 9.54474 8.4667 9.46917 8.53223 9.40618C8.59726 9.3428 8.6746 9.29345 8.75947 9.26117C8.84435 9.22889 8.93494 9.21438 9.02565 9.21853C9.15615 9.22326 9.28626 9.20157 9.40816 9.15477C9.53007 9.10796 9.64127 9.03701 9.73507 8.94617C9.82888 8.85533 9.90336 8.74647 9.95405 8.62612C10.0047 8.50578 10.0306 8.37643 10.0301 8.24585C10.0404 7.97732 9.94372 7.71566 9.76118 7.51844C9.57864 7.32122 9.32523 7.20459 9.0567 7.1942C8.78817 7.18382 8.52651 7.28053 8.32929 7.46307C8.13207 7.64561 8.01544 7.89902 8.00505 8.16755C8.00292 8.2565 7.98297 8.34411 7.94639 8.42522C7.90981 8.50632 7.85734 8.57927 7.79208 8.63974C7.72682 8.70022 7.6501 8.74699 7.56645 8.77731C7.4828 8.80762 7.39393 8.82085 7.30508 8.81623C7.12637 8.8092 6.95776 8.73154 6.83626 8.6003C6.71477 8.46906 6.65032 8.29497 6.65708 8.11625C6.67624 7.68219 6.81473 7.26182 7.05733 6.90137C7.29992 6.54091 7.63721 6.25434 8.03212 6.07316C8.42702 5.89198 8.86425 5.82321 9.2957 5.87442C9.72716 5.92562 10.1361 6.09482 10.4777 6.3634C10.8192 6.63198 11.08 6.98954 11.2315 7.39676C11.383 7.80398 11.4193 8.24509 11.3363 8.67158C11.2533 9.09807 11.0544 9.49342 10.7613 9.81416C10.4682 10.1349 10.0923 10.3686 9.675 10.4896V10.85C9.675 11.029 9.60389 11.2007 9.4773 11.3273C9.35071 11.4539 9.17902 11.525 9 11.525Z"
              fill="#699250"
            />
            <path
              d="M9 13.55C9.37279 13.55 9.675 13.2478 9.675 12.875C9.675 12.5022 9.37279 12.2 9 12.2C8.62721 12.2 8.325 12.5022 8.325 12.875C8.325 13.2478 8.62721 13.55 9 13.55Z"
              fill="#699250"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start gap-6">
          <div className="flex p-6 flex-col items-start gap-8 rounded-2xl border border-neutral-100 bg-white">
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg font-semibold text-neutral-900">
                Introduction
              </p>
              <p className="text-sm font-medium text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg font-semibold text-neutral-900">
                Collection and Use of Personal Information
              </p>
              <p className="text-sm font-medium text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irureLorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg font-semibold text-neutral-900">
                Disclosure of Personal Information
              </p>
              <p className="text-sm font-medium text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irureLorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg font-semibold text-neutral-900">Security</p>
              <p className="text-sm font-medium text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irureLorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg font-semibold text-neutral-900">
                Access and Correction of Personal Information
              </p>
              <p className="text-sm font-medium text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg font-semibold text-neutral-900">
                Retention of Personal Information
              </p>
              <p className="text-sm font-medium text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg font-semibold text-neutral-900">
                Changes to this Privacy Policy
              </p>
              <p className="text-sm font-medium text-neutral-400">
                We may update this Privacy Policy from time to time. We will
                post any changes to this Privacy Policy on our website and, if
                the changes are material, we will provide notice to you by email
                or through Humanline.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg font-semibold text-neutral-900">
                Contact Us
              </p>
              <p className="text-sm font-medium text-neutral-400">
                If you have any questions or concerns about this Privacy Policy,
                or if you would like to access or correct your personal
                information, please contact us at <span className="text-primary-400 underline">contact@webmatic</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
