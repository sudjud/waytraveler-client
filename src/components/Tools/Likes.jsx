import tools from "./tools.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { postLikes } from "../../features/placeSlice";
import { BsHeartFill } from "react-icons/bs";

const Likes = (props) => {
  const dispatch = useDispatch();
  const { id } = props;
  const likes = useSelector(
    (state) => state.place.places.find((item) => item._id === id).likes
  );
  const user = useSelector((state) => state.user.userId);
  const addLike = (id) => {
    dispatch(postLikes(id));
  };

  return (
    <div className={tools.like}>
      <div onClick={() => addLike(id)} className={tools.like__icon}>
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
};

export default Likes;
