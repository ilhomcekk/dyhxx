import { useNavigate } from "react-router-dom";
import { AccordionHeader } from "../../components";
import { APP_ROUTES } from "../../router";
import { useTranslation } from "react-i18next";

const Category = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="wrapper">
      <div className="flex flex-col">
        <div className="text-center text-[200%]">{t("select_category")}</div>
        <div className="flex flex-col gap-2 mt-4">
          {[...Array(10)].map((_, idx) => (
            <AccordionHeader
              onClick={() => navigate(APP_ROUTES.SERVICE)}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
