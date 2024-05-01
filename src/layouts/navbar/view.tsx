// import { changeLanguage } from "../../helpers/api";
// import { useTranslation } from "react-i18next";

import { Logo, Time } from "../../components";

const Navbar = () => {
  // const { t, i18n } = useTranslation();

  return (
    <nav className="bg-body py-[1%] border-b border-gray z-[99]">
      <div className="wrapper">
        <div className="flex items-center justify-between">
          <Logo />
          <Time />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
