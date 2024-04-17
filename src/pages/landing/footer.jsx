import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import FacebookIcon from "../../assets/icons/FacebookIcon";
import TwitterIcon from "../../assets/icons/TwitterIcon";
import LinkedinIcon from "../../assets/icons/LinkedinIcon";
import YoutubuIcon from "../../assets/icons/YoutubeIcon";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-between items-center px-2 sm:px-[118px] py-7 bg-green_medium w-full">
      <div className="flex flex-col justify-center gap-3 text-sm font-normal text-[#030700]">
        <p>© {new Date().getFullYear()} Webmetic</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-left sm:items-center gap-2 sm:gap-8">
        <Link to="/impressum">{t('landing.footer.legal_notice')}</Link>
        <Link to="/agb">{t('landing.footer.AGB')}</Link>
        <Link to="/datenschutzerklaerung">{t('landing.footer.privacy_policy')}</Link>
        {/* 
        <a href="/" target="_blank" rel="noreferrer">
          <FacebookIcon />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <TwitterIcon />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <LinkedinIcon />
        </a>
        <a href="/" target="_blank" rel="noreferrer">
          <YoutubuIcon />
        </a>*/}
      </div>
    </section>
  );
};

export default Footer;
