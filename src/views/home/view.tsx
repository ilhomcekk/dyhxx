import { Button } from "antd";
import { languageList } from "./list";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper h-full">
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        {languageList.map((item, idx) => (
          <Button
            onClick={() => navigate(APP_ROUTES.CATEGORY)}
            className="w-[70%] py-3 h-[auto] uppercase"
            type="primary"
            key={idx}
          >
            {item?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Home;
