import { Outlet, useLocation } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import Footer from "../components/Footer/Footer";

const Root = () => {
  const location = useLocation();

  const noSliderPaths = ["/login", "/Login", "/Dashboard", "/dashboard","/reset-admin-password"];
  const shouldShowSlider = !noSliderPaths.includes(location.pathname);

  return (
    <div className=" ">
      {shouldShowSlider && <Slider />}
      <div className="min-h-[calc(100vh-20vh)] flex flex-col">
        <div className="">
          <Outlet></Outlet>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Root;
