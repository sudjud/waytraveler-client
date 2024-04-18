import tools from "./tools.module.sass";
import { useSelector } from "react-redux";
import { FaComment } from "react-icons/fa";

const Comments = (props) => {
  const { id } = props;
  const comments = useSelector(
    (state) => state.place.places.find((item) => item._id === id).comments
  );
  
  return (
    <div className={tools.comment}>
      <div className={tools.comment__icon}>
        <FaComment />
      </div>
      <div className={tools.m__comment__count}>{comments.length}</div>
    </div>
  );
};

export default Comments;
