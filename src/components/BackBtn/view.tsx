import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      className="mb-4 uppercase py-3 h-[auto] flex items-center justify-center !bg-warning w-full"
      type="primary"
    >
      <ArrowLeftOutlined className="mr-auto" />
      <span className="mr-auto">Назад</span>
    </Button>
  );
};

export default BackBtn;
