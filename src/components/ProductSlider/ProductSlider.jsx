import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 w-[300px] lg:w-[400px]"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} 
      >
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/X7SxjBQ8/i-Phone-16-Pro-Max-Natural-Titanium.jpg"
            alt="Nature 1 Thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/pXfCpVSt/i-Phone-16-Pro-Max-Desert-Titanium.jpg"
            alt="Nature 2 Thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/XYn8FSMB/i-Phone-16-Pro-Max-White-Titanium.jpg"
            alt="Nature 3 Thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/K8Q5DqFq/i-Phone-16-Pro-Max-Black-Titanium.jpg"
            alt="Nature 4 Thumbnail"
          />
        </SwiperSlide>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3 w-[200px] lg:w-[300px] mb-5"
      >
        {[
          "https://i.postimg.cc/X7SxjBQ8/i-Phone-16-Pro-Max-Natural-Titanium.jpg",
          "https://i.postimg.cc/pXfCpVSt/i-Phone-16-Pro-Max-Desert-Titanium.jpg",
          "https://i.postimg.cc/XYn8FSMB/i-Phone-16-Pro-Max-White-Titanium.jpg",
          "https://i.postimg.cc/K8Q5DqFq/i-Phone-16-Pro-Max-Black-Titanium.jpg",
        ].map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <img
              src={imgSrc}
              alt={`Thumbnail ${index + 1}`}
              style={{
                border: activeIndex === index ? "2px solid black" : "2px solid transparent", 
                opacity: activeIndex === index ? 1 : 0.6, 
                cursor: "pointer", 
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSlider;
