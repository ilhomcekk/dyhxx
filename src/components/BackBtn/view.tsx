import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button
      onClick={() => navigate(-1)}
      className="mb-4 uppercase py-[1%] h-[auto] flex items-center justify-center !bg-warning w-full"
      type="primary"
    >
      <ArrowLeftOutlined className="mr-auto [&>svg]:text-[200%]" />
      <span className="mr-auto text-[200%]">{t("back")}</span>
    </Button>
  );
};

export default BackBtn;
