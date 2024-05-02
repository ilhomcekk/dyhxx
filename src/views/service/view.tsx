import { FileDoneOutlined } from "@ant-design/icons";
import { AccordionHeader, Check } from "../../components";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { categoryStore, queueStore } from "../../store";
import QRCode from "qrcode";
import ReactDOMServer from "react-dom/server";

const Service = () => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const { list, getList } = categoryStore();
  const { create, check } = queueStore();
  const [qrDataURL, setQRDataURL] = useState(null);

  const generateQRCode = async () => {
    try {
      const qrDataURL = await QRCode.toDataURL("https://telegram.com");
      return qrDataURL;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  };
  const onPrint = () => {
    window.ipcRenderer.send(
      "print-command-request",
      ReactDOMServer.renderToStaticMarkup(
        <div className="check">
          <div className="check-welcome">{t("welcome")}!</div>
          <div className="check-qr-block">
            <div>
              <div>Navbat raqami:</div>
              <div className="check-id">{check?.number}</div>
            </div>
            <div className="qr">
              {qrDataURL && <img src={qrDataURL} alt="" />}
            </div>
          </div>
          <div className="strong">
            Xizmat: Transport vositasini ro'yhatdan o'tkazish
          </div>
          <div className="check-text">{check?.created_at}</div>
          <div className="check-text">Kerakli hujjatlar:</div>
          <div className="check-text">-Shaxsni tasdiqlovchi hujjatlar</div>
          <div className="check-text">
            -Avtotransportlarga tegishli hujjatlar
          </div>
          <ul className="check-list">
            <li>Ko'rikdan o'tkazish</li>
            <li>To'lov</li>
            <li>Ro'yhat zali</li>
          </ul>
          <div className="thanks">{t("thanks_for_wait")}!</div>
        </div>
      )
    );
  };
  useEffect(() => {
    getList();
    generateQRCode().then((dataURL: any) => {
      setQRDataURL(dataURL);
    });
  }, []);
  console.log(list);

  return (
    <>
      <div className="wrapper">
        <div className="flex flex-col">
          <div className="text-center text-[200%]">{t("select_service")}</div>
          <div className="flex flex-col gap-2 mt-4">
            {list?.map((item, idx) => (
              <AccordionHeader
                onClick={() => {
                  create({
                    category_id: item.id,
                  })
                    .then(() => {
                      onPrint();
                    })
                    .catch((err) => {
                      console.log("err", err);
                    });
                }}
                className="!bg-green"
                icon={<FileDoneOutlined className="[&>svg]:text-[100%]" />}
                title={item?.name}
                key={idx}
              />
            ))}
            <AccordionHeader
              onClick={onPrint}
              title="Test"
              className="!bg-green"
              icon={<FileDoneOutlined className="[&>svg]:text-[100%]" />}
            />
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
