const Footer = () => {
  return (
    <div className="hidden sm:inline-flex text-center justify-center items-center gap-[10px] text-sm">
      <p className="text-[#A0AEC0]">©Webmetic {new Date().getFullYear()}</p>
      <p className="text-[#111827]">
        <a href="/impressum">Impressum</a>
      </p>
      <p className="text-[#111827]">
        <a href="/agb">AGB</a>
      </p>
      <p className="text-[#111827]">
        <a href="/datenschutzerklaerung">Datenschutzerklärung</a>
      </p>
    </div>
  );
};

export default Footer;
