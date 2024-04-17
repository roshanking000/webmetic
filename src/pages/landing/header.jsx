import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../provider/authProvider";

import logoIcon from "../../assets/images/logo_layer_1.png";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return (
    <section className="flex justify-between items-center w-full text-lg sm:text-2xl text-landing_color">
      <img className="h-10 sm:w-[225px] sm:h-12" alt="logo" src={logoIcon} />
      {/*<div className="flex gap-6 font-semibold">
        <Link to="#">Features</Link>
        <Link to="#">Contact Us</Link>
        <Link to="#">About us</Link>
        <Link to="#">Pricing</Link>
      </div>*/}
      <div className="flex items-center gap-2">
        <Link
          to={!isAuthenticated ? "/signin" : "/dashboard"}
          className="px-6 py-1.5 sm:px-10 sm:py-3 bg-[#E2FFD3] font-medium rounded"
        >
          {!isAuthenticated ? t('login') : "Dashboard"}
        </Link>
      </div>
    </section>
  );
};

export default Header;
