import React from "react";
import card from "../Cards/PlaceCards/card.module.sass";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PlaceMap = (props) => {
  const places = useSelector((state) => state.place.places);
  const { id, w, h, zoom } = props;
  const place = places.find((item) => item._id === id);

  const [point_, point_2] = place.point.split(" ");
  const point_1 = point_.slice(0, point_.length - 1);


  return (
    <div>
      <YMaps>
        <Map
          defaultState={{
            center: [+point_1, +point_2],
            zoom: zoom ? zoom : 18,
          }}
          width={w}
          height={h}
        >
          <Placemark
            modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            options={{ iconColor: "red" }}
            geometry={[+point_1, +point_2]}
            properties={{
              balloonContent: `
          <div class=${card.s}>
          <div class=${card.s__image}>
            <img  src='https://waytravel-server-7bcc93134540.herokuapp.com/${place.photos[0].name}' alt="" width="400"/>
          </div>
          <div class=${card.s__name}>
            ${place.name}
          </div>
          <div class=${card.s__area}>
            ${place.areas.name}
          </div>
        </div>`,
            }}
          />
        </Map>
      </YMaps>
      {/* <Footer /> */}
    </div>
  );
};
export default PlaceMap;
