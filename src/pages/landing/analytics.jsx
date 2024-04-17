import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import analyticsDashboardImage from "../../assets/images/analytics-dashboard.png"

const Analytics = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex gap-[92px] max-w-[1200px] bg-green_medium rounded-2xl sm:px-[120px] py-12 w-full px-2">
      <div className="inline-flex flex-col items-center sm:items-start gap-10">
        <div className="flex flex-col justify-center items-start gap-[10px] text-center sm:text-left px-2">
          <p className="text-xl sm:text-[32px] font-black text-landing_color sm:max-w-[492px]">{t('landing.analytics.title')}</p>
          <p className="text-base font-medium text-[#437623] max-w-[378px]">{t('landing.analytics.info')}</p>
        </div>
        <Link to="signup" className="inline-flex gap-2 justify-center items-center text-xl text-landing_color font-semibold px-6 py-[14px] bg-white rounded-xl">
          {t('landing.signup_button')}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M25.334 16L6.66732 16M25.334 16L17.334 8M25.334 16L17.334 24" stroke="#1F3832" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <img className="hidden sm:block absolute w-[415px] bottom-0 right-[78px]" alt="analytics_dashboard" src={analyticsDashboardImage} />
    </section>
  )
}

export default Analytics;