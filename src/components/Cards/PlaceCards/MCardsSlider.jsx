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
        spaceBetween={50}
        slidesPerView={1.9}
      >
        {places.map((item) => {
          return (
            <SwiperSlide>
              <MCard
                key={item._id}
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
          );
        })}
      </Swiper>
    </div>
  );
}
export default MCardSlider;
