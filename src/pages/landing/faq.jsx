import { useTranslation } from "react-i18next";

import FAQItem from "../../components/faq_item";

const FAQPage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center gap-10 max-w-[840px] px-2">
      <div className="flex flex-col justify-center items-center gap-6">
        <p className="text-[40px] font-black text-landing_color">FAQ</p>
        <p className="hidden sm:block text-xl font-normal text-[#A1A1A1] text-center max-w-[500px]">
          {t("landing.faq.title")}
          <br />
          {t("landing.faq.info")}
        </p>
        <p className="sm:hidden text-base sm:text-xl font-normal text-[#A1A1A1] text-center max-w-[582px]">
          {t("landing.faq.mobile_info")}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <FAQItem
          title={t("landing.faq.faq_item1_title")}
          content={t("landing.faq.faq_item1_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item2_title")}
          content={t("landing.faq.faq_item2_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item3_title")}
          content={t("landing.faq.faq_item3_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item4_title")}
          content={t("landing.faq.faq_item4_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item5_title")}
          content={t("landing.faq.faq_item5_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item6_title")}
          content={t("landing.faq.faq_item6_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item7_title")}
          content={t("landing.faq.faq_item7_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item8_title")}
          content={t("landing.faq.faq_item8_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item9_title")}
          content={t("landing.faq.faq_item9_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item10_title")}
          content={t("landing.faq.faq_item10_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item11_title")}
          content={t("landing.faq.faq_item11_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item12_title")}
          content={t("landing.faq.faq_item12_content")}
        />
        <FAQItem
          title={t("landing.faq.faq_item13_title")}
          content={t("landing.faq.faq_item13_content")}
        />
      </div>
    </section>
  );
};

export default FAQPage;
