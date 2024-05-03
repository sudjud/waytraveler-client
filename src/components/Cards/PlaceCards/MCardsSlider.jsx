import card from "./card.module.sass";
import MCard from "./MCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPlaces } from "../../../features/placeSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function MCardSlider() {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.places);
  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  return (
    <div className={card.mSlider}>
    <Swiper
      spaceBetween = {0} // Расстояние между слайдами
      slidesPerView = {1.1} // Количество видимых слайдов
      breakpoints={{
        771: { // при минимальной ширине 640px
          slidesPerView: 1.6, // 1.5 слайда
          spaceBetween: 20 // немного больше пространства
        },
        1024: { // при минимальной ширине 1024px
          slidesPerView: 1.9, // 1.9 слайда
          spaceBetween: 30 // стандартное пространство, как было задано
        }
      }}
    >
      {places.map((item) => (
        <SwiperSlide key={item._id}>
          <MCard
            id={item._id}
            name={item.name}
            desc={item.description}
            author={item.author}
            likes={item.likes}
            comments={item.comments}
            photos={item.photos}
            area={item.areas}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  );
}
export default MCardSlider;
