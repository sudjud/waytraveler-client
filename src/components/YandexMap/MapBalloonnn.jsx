import React from "react";
import {
  ListBoxItem,
} from "@pbe/react-yandex-maps";

const MapBalloonnn = ({ name }) => {
  return (
    <div>
      <ListBoxItem
        data={{
          content: name,
        }}
      />
    </div>
  );
};

export default MapBalloonnn;
