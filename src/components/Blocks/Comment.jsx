import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import block from "./block.module.sass";
import {
  addComment,
  deleteComment,
  fetchComment,
} from "../../features/commentSlice";

const Comment = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { idParams } = useParams();

  useEffect(() => {
    dispatch(fetchComment());
  }, [dispatch]);
<<<<<<< Updated upstream
  const comment = useSelector((state) => state.comment.comment);
  const loading = useSelector((state) => state.comment.loading);
=======
>>>>>>> Stashed changes

  //   console.log(comment);

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleAddComment = () => {
    // console.log(1);
    dispatch(addComment({ text: text, idParams }));
    setText("");
  };
  const handleDelete = (id) => {
    dispatch(deleteComment(id));
  };

  if (!loading && comment) {
    // console.log(comment[0].user.login);
    return (
      <div className={block.comments}>
        {/* <input type="file" /> */}
        <div className={block.addBlock}>
        <input
          type="text"
          className="input-add-comment"
          value={text}
          onChange={handleText}
        />
        <button className={block.buttonAdd} onClick={() => handleAddComment()}>
          Добавить
        </button>
        </div>
        {comment.map((item) => {
          return (
            <div className={block.comment}>
              <div className={block.login}>{item.user.login}</div>
              <div className={block.text}>
                <div>{item.text}</div>
                <button
                  className={block.buttonDelete}
                  onClick={() => handleDelete(item._id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return <div>Загрузка</div>;
};

export default Comment;
