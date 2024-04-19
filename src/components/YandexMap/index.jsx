import React from "react";
import MapBalloon from "./MapBalloon";
import MapBalloonnn from "./MapBalloonnn";
import { YMaps, Map, ListBox, SearchControl } from "@pbe/react-yandex-maps";
import { useSelector } from "react-redux";

const YandexMap = () => {
  const places = useSelector((state) => state.place.places);

  return (
    <div>
      <YMaps>
        <Map
          defaultState={{
            center: [43.16689676691209, 44.80166469187365],
            zoom: 10,
          }}
          width={"100%"}
          height={"100vh"}
        >
          <SearchControl
            options={{
              float: "right",
            }}
          />
          <ListBox
            data={{
              content: "Список отметок",
            }}
          >
            {places.map((item) => {
              return <MapBalloonnn name={item.name} />;
            })}
          </ListBox>
          {places.map((item) => {
            return (
              <MapBalloon
                key={item._id}
                id={item._id}
                point={item.point}
                name={item.name}
                areas={item.areas}
                photos={item.photos}
              />
            );
          })}
        </Map>
      </YMaps>
    </div>
  );
};

export default YandexMap;
