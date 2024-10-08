// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Slider = () => {
  const images = [
    "https://i.postimg.cc/ZnLKNtgB/sub-banner-Artboard-1.jpg",
    "https://i.postimg.cc/ZnLKNtgB/sub-banner-Artboard-2.jpg",
    "https://i.postimg.cc/ZnLKNtgB/sub-banner-Artboard-3.jpg",
    "https://i.postimg.cc/ZnLKNtgB/sub-banner-Artboard-4.jpg",
  ];

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper object-cover h-[20vh] lg:h-[60vh] "
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-[20vh] lg:h-[60vh] "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
