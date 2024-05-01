import { Button } from "antd";
import { FC, ReactNode } from "react";
import { RightOutlined } from "@ant-design/icons";

interface Props {
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

const AccordionHeader: FC<Props> = ({ onClick, className, icon }) => {
  return (
    <Button
      type="primary"
      className={`flex items-center justify-between py-[1%] h-[auto] [&>span]:text-[200%] ${className}`}
      onClick={onClick}
    >
      Физическое лицо
      {icon ? icon : <RightOutlined className="[&>svg]:text-[100%]" />}
    </Button>
  );
};

export default AccordionHeader;
