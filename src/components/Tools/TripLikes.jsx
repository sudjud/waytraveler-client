import tools from "./tools.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { postLikes } from "../../features/placeSlice";
import { BsHeartFill } from "react-icons/bs";
import { likeTrip } from "../../features/tripSlice";

function TripLike(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const likes = useSelector(
    (state) => state.trip.trips.find((item) => item._id === id).likes
  );
  const user = useSelector((state) => state.user.userId);

  if (likes) {
    const like = (id) => {
      dispatch(likeTrip(id));
    };

    return (
      <div className={tools.like}>
        <div onClick={() => like(id)} className={tools.like__icon}>
          {
            <BsHeartFill
              style={
                likes.includes(user) ? { color: "red" } : { color: "#DAAD86" }
              }
            />
          }
        </div>
        <div className={tools.like__count}>{likes.length}</div>
      </div>
    );
  }
}
export default TripLike;
