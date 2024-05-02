import { QRCode } from "antd";
import "./module.css";
import { useTranslation } from "react-i18next";
import { queueStore } from "../../store";

const Check = () => {
  const { t } = useTranslation();
  const { check } = queueStore();
  return (
    <div className="check">
      <div className="check-welcome">{t("welcome")}!</div>
      <div className="check-qr-block">
        <div>
          <div>Navbat raqami:</div>
          <div className="check-id">{check?.number}F10</div>
        </div>
        <div className="qr">
          <QRCode value="asd" />
        </div>
      </div>
      <div className="strong">
        Xizmat: Transport vositasini ro'yhatdan o'tkazish
      </div>
      <div className="check-text">{check?.created_at}26347TS:235</div>
      <div className="check-text">Kerakli hujjatlar:</div>
      <div className="check-text">-Shaxsni tasdiqlovchi hujjatlar</div>
      <div className="check-text">-Avtotransportlarga tegishli hujjatlar</div>
      <ul className="check-list">
        <li>Ko'rikdan o'tkazish</li>
        <li>To'lov</li>
        <li>Ro'yhat zali</li>
      </ul>
      <div className="thanks">{t("thanks_for_wait")}!</div>
    </div>
  );
};

export default Check;
