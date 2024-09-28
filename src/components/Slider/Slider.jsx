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
    <div>
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
        className="mySwiper h-[50vh]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
