import { LazyLoadImage } from "react-lazy-load-image-component";
import { ASSETS } from "../../assets/images/assets";

const Logo = () => {
  return (
    <div className="flex items-center gap-6 text-[200%]">
      <LazyLoadImage
        src={ASSETS.logo}
        wrapperClassName="h-[100px] max-w-[160px]"
        className="w-full h-full object-contain"
        effect="opacity"
        alt=""
      />
      DYXHH
    </div>
  );
};

export default Logo;
