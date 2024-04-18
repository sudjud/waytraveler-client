import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTrips } from "../../../features/tripSlice";
import card from "./card.module.sass";
import { BsHeartFill } from "react-icons/bs";
import { BsShare } from "react-icons/bs";
import Likes from "../../Tools/Likes";
import TripLike from "../../Tools/TripLikes";

const TripCard = (props) => {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip.trips);
  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);
  return (
    <div className={card.main}>
      <div className={card.trip}>
        {trip.map((item) => {
          return (
            <div className={card.m}>
              <div className={card.title}>
                <div className={card.img}>
                  <img
                    src="https://russia.travel/upload/route/4bd/4bd1778efbda02d2bd3ece3ed1184f07.png"
                    alt="mountain"
                  />
                </div>
                <div>
                  <h2>{item.name}</h2>
                  <h5>{item.category}</h5>
                  <div className={card.desc}>
                    {item.desc.length > 100
                      ? item.desc.substring(0, 100) + "..."
                      : item.desc}
                  </div>
                </div>
              </div>
              <div className={card.image}>
                <img
                  src="https://funart.pro/uploads/posts/2021-04/1617277757_47-p-oboi-gori-chechni-48.jpg"
                  alt="awe"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <div className={card.footer}>
                <div>By ADMIN</div>
                <div className={card.like}>
                  <TripLike id={item._id}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripCard;
