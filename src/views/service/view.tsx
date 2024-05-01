import { FileDoneOutlined } from "@ant-design/icons";
import { AccordionHeader, Check } from "../../components";
import { useState } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

const Service = () => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="wrapper">
        <div className="flex flex-col">
          <div className="text-center text-[200%]">{t("select_service")}</div>
          <div className="flex flex-col gap-2 mt-4">
            {[...Array(10)].map((_, idx) => (
              <AccordionHeader
                onClick={() => setModal(true)}
                className="!bg-green"
                icon={<FileDoneOutlined className="[&>svg]:text-[100%]" />}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        centered
        footer={null}
      >
        <Check />
      </Modal>
    </>
  );
};

export default Service;
