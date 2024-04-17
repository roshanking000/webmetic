import { useTranslation } from "react-i18next";

import featuresImage from "../../assets/images/features-image.png";

const Features = () => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-between max-w-[1200px] w-full gap-[75px] px-2">
      <img
        className="hidden sm:block"
        alt="features_image"
        src={featuresImage}
      />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 text-landing_color text-center sm:text-left">
          <p className="text-2xl sm:text-[40px] font-black">
            {t("landing.features.title")}
          </p>
          <p className="text-base sm:text-xl font-extralight">
            {t("landing.features.info")}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="w-10 h-10 bg-[#E2FFD3] rounded-full"></div>
            <div className="flex-1 flex flex-col gap-4 text-landing_color">
              <p className="text-xl sm:text-[28px] font-semibold">
                {t("landing.features.visitor_identification")}
              </p>
              <p className="text-base sm:text-xl font-normal text-[#A1A1A1]">
                {t("landing.features.visitor_identification_info")}
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-10 h-10 bg-[#E2FFD3] rounded-full"></div>
            <div className="flex-1 flex flex-col gap-4 text-landing_color">
              <p className="text-xl sm:text-[28px] font-semibold">
                {t("landing.features.comprehensive_behavioral_analysis")}
              </p>
              <p className="text-base sm:text-xl font-normal text-[#A1A1A1]">
                {t("landing.features.comprehensive_behavioral_analysis_info")}
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-10 h-10 bg-[#E2FFD3] rounded-full"></div>
            <div className="flex-1 flex flex-col gap-4 text-landing_color">
              <p className="text-xl sm:text-[28px] font-semibold">
                {t("landing.features.lead_prediction")}
              </p>
              <p className="text-base sm:text-xl font-normal text-[#A1A1A1]">
                {t("landing.features.lead_prediction_info")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
