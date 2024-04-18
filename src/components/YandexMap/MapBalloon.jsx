import React from "react";
import card from "../Cards/PlaceCards/card.module.sass";
import { Placemark } from "@pbe/react-yandex-maps";

const MapBalloon = ({ name, point, areas, photos, id }) => {
  const [point_, point_2] = point.split(" ");
  const point_1 = point_.slice(0, point_.length - 1);


  function myFunction(id) {
    return `http://localhost:3000/place/${id}`;
  }

  const login = myFunction(id);

  return (
    <div>

      <Placemark
        options={{ iconColor: "green" }}
        geometry={[+point_1, +point_2]}
        properties={{
          balloonContent: `
          <div class=${card.s}>
          <div class=${card.s__image}>
            <img src='https://waytravel-server-7bcc93134540.herokuapp.com/uploads/images/${photos[0].name}' alt="" />
          </div>
          <div class=${card.s__name}>
            ${name}
          </div>
          <div style='flex: none' class=${card.s__area}>
            ${areas.name}
          </div>
          <div class=${card.s__buttons}>
            <button onclick='location.href="${login}"' class=${card.s__viewAll}>Подробнее</button>
          </div>
        </div>`,
        }}
      />
    </div>
  );
};

export default MapBalloon;
