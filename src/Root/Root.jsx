import { Outlet } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import Footer from "../components/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Slider></Slider>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
