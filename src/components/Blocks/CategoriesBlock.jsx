import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../features/categorySlice";
import block from './block.module.sass'

function CategoriesBlock () {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const categories = useSelector((state) => state.category.category);
    useEffect(() => {
        dispatch(fetchCategories());
    },[dispatch]);
    return (
      <div className={block.categories}>
          {categories.map((item) => {
            return (
              <div className={block.cart} key={item._id}>
                <span
                  className={block.name}
                  onClick={() => navigate(`/category/${item._id}`)}
                >
                  {item.name}
                </span>
                  <img className={block.image} src={item.photo} alt="imag"></img>
              </div>
            );
          })}
      </div>
    );
}

export default CategoriesBlock;