// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-[90vh]"
      >
        <SwiperSlide className="">
          <img
            src="https://i.postimg.cc/ZnLKNtgB/sub-banner-Artboard-1.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <img
            src="https://i.postimg.cc/ZnLKNtgB/sub-banner-Artboard-1.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <img
            src="https://i.postimg.cc/ZnLKNtgB/sub-banner-Artboard-1.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <img
            src="https://i.postimg.cc/ZnLKNtgB/sub-banner-Artboard-1.jpg"
            alt=""
            className="w-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
