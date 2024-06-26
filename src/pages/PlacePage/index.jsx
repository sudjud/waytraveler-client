import placeStyle from "./place.module.sass";
import { useNavigate, useParams } from "react-router-dom";
import PlaceMap from "../../components/YandexMap/PlaceMap";
import { useDispatch, useSelector } from "react-redux";
import { IoHomeOutline } from "react-icons/io5";
import SCard from "../../components/Cards/PlaceCards/SCard";
import SimpleImageSlider from "react-simple-image-slider";
import towerImg from "../../assets/img/towers/tower.png";
import { useEffect } from "react";
import { fetchPlaces } from "../../features/placeSlice";
import Likes from "../../components/Tools/Likes";
import Comments from "../../components/Tools/Comments";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // импортируйте базовые стили Swiper
import 'swiper/css/navigation'; // стили для навигации
import 'swiper/css/pagination'; // стили для пагинации
import { Navigation, Pagination } from 'swiper';
import PlacePageSlider from "./placePageSlider";

function PlacePage() {
  const { id } = useParams();
  let images;
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.places);
  const place = places.find((item) => item._id === id);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nearPlaces = places.filter((item) => {
    let [latitude, longitude] = place.point.split(", ");
    let [latitudeI, longitudeI] = item.point.split(", ");
    let calcedLatitude = Math.abs(+latitude - +latitudeI);
    let calcedLongitude = Math.abs(+longitude - +longitudeI);
    return (
      calcedLatitude < 0.151 &&
      calcedLongitude < 0.151 &&
      item._id !== place._id
    );
  });

  if (place) {
    images = place.photos.map((item) => {
      return {
        url: `https://waytravel-server-7bcc93134540.herokuapp.com/uploads/images/${item.name}`,
      };
    });
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const navigate = useNavigate();
  if (place && places) {
    return (
      <div className={placeStyle.place}>
        <div
          style={{
            background: `url(https://waytravel-server-7bcc93134540.herokuapp.com/uploads/images/${
              place.photos[getRandomInt(place.photos.length)].name
            }) no-repeat center center`,
          }}
          className={placeStyle.place__main}
        >
          <div className="container">
            <div className={placeStyle.place__main_label}>
              <div className={placeStyle.place__categories}>
                {place.categories.map((item, idx, arr) =>
                  idx === arr.length - 1 ? (
                    <span className="underline" key={item._id}>
                      {item.name}
                    </span>
                  ) : (
                    <div>
                      <span key={item._id} className="underline">
                        {item.name}
                      </span>
                      <div className={placeStyle.place__categories_andChar}>
                        &
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className={placeStyle.place__name}>{place.name}</div>
            </div>
          </div>
        </div>

        <div className={placeStyle.place__features}>
          <div className="container">
            <div className={placeStyle.place__area}>
              <IoHomeOutline
                style={{ cursor: "pointer" }}
                size={25}
                onClick={() => navigate("/")}
              />
              <span className={placeStyle.place__area_separator}>{">"}</span>
              <span>{place.areas.name}</span>
              <span className={placeStyle.place__area_separator}>{">"}</span>
              {place.name}
            </div>
            <div className={placeStyle.place__reactions}>
              <div className={placeStyle.place__reactions_like}>
                <Likes id={id} />
              </div>
              <div className={placeStyle.place__reactions_comment}>
                <Comments id={id} />
              </div>
            </div>
          </div>
        </div>

        <div className={placeStyle.place__info}>
          <div className={placeStyle.place__map}>
            <PlaceMap zoom={8} id={place._id} w="100%" h="350px" />
            <div className={placeStyle.place__map_info}>
              Район:
              <div className={placeStyle.place__map_area}>
                {place.areas.name}
              </div>
              Координаты:
              <div className={placeStyle.place__map_area}>
                {place.point.split(", ")[0].substring(0, 10)},<span> </span>
                {place.point.split(", ")[1].substring(0, 10)}
              </div>
            </div>
            <img
              src={towerImg}
              className={placeStyle.place__towerImg}
              alt="tower"
            />
          </div>
          <div>
            <div className={placeStyle.place__desc}>{place.description}</div>
            <div className={placeStyle.place__photos}>
              {/* <SimpleImageSlider
                className="slider-custom-stiles"
                width={window.innerWidth > 768 ? "70vw" : "100vw"}
                height={640}
                navSize={30}
                navStyle={2}
                images={images}
                showBullets={true}
                bgColor={"transparent"}
                showNavs={true}
              /> */}
              {/* <Swiper
                // Установите ширину и высоту в соответствии с вашими требованиями
                style={{
                  width: window.innerWidth > 768 ? "70vw" : "100vw",
                  height: "640px",
                }}
                navigation={true} // включить навигационные кнопки
                pagination={{ clickable: true }} // включить и сделать кликабельной пагинацию
                modules={[Navigation, Pagination]} // добавить модули
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url}
                      alt={`Slide ${index}`}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper> */}
              <PlacePageSlider images={images} />
            </div>
          </div>
          {!!nearPlaces.length && (
            <div className={placeStyle.place__near}>
              <div className={placeStyle.place__subtitle}>Это рядом!</div>
              <div className={placeStyle.place__near_items}>
                {nearPlaces.map((item) => {
                  return <SCard key={item._id} id={item._id} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default PlacePage;
