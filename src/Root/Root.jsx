import { Outlet, useLocation } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import Footer from "../components/Footer/Footer";

const Root = () => {
  const location = useLocation();

  // Define the paths where you don't want to show the Slider
  const noSliderPaths = ["/login", "/dashboard"];

  // Check if the current path matches any of the noSliderPaths
  const shouldShowSlider = !noSliderPaths.includes(location.pathname);

  return (
    <div className=" ">
      {shouldShowSlider && <Slider />}
      <div className="min-h-[calc(100vh-(35vh))] container mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Root;
