import { QRCode } from "antd";
import "./module.css";

const Check = () => {
  return (
    <div className="check">
      <div className="check-welcome">Xush kelibsiz!</div>
      <div className="check-qr-block">
        <div>
          <div>Navbat raqami:</div>
          <div className="check-id">F335</div>
        </div>
        <div className="qr">
          <QRCode value="asd" />
        </div>
      </div>
      <div className="strong">
        Xizmat: Transport vositasini ro'yhatdan o'tkazish
      </div>
      <div className="check-text">Sana: 30 Aprel 2024 22:34</div>
      <div className="check-text">Kerakli hujjatlar:</div>
      <div className="check-text">-Shaxsni tasdiqlovchi hujjatlar</div>
      <div className="check-text">-Avtotransportlarga tegishli hujjatlar</div>
      <ul className="check-list">
        <li>Ko'rikdan o'tkazish</li>
        <li>To'lov</li>
        <li>Ro'yhat zali</li>
      </ul>
      <div className="thanks">Kutganingiz uchun rahmat!</div>
    </div>
  );
};

export default Check;
