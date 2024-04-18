import card from "./card.module.sass";
import { motion } from "framer-motion";
import { BsShare } from "react-icons/bs";
import SimpleImageSlider from "react-simple-image-slider";
import Likes from "../../Tools/Likes";
import { useNavigate } from "react-router-dom";
import Comments from "../../Tools/Comments";

function MCard(props) {
  const navigate = useNavigate();
  const { id, name, area, desc, author, photos } = props;

  let images = photos.map((item) => {
    return {
      url: `https://waytravel-server-7bcc93134540.herokuapp.com/uploads/images/${item.name}`,
    };
  });

  return (
    <motion.div className={card.m}>
      <div className={card.m__info}>
        <div className={card.m__name}>{name}</div>
        <div className={card.m__area}>{area.name}</div>
        <div className={card.m__desc}>
          {desc.length > 220 ? desc.substring(0, 260) + "..." : desc}
        </div>
        <div className={card.m__features}>
          <div className={card.m__author}>By {author.login}</div>
          <div className={card.m__reactions}>
            <div className={card.m__reactions_wrapper}>
              <Comments id={id} />
              <div className={card.m__reactions_separator}></div>
              <Likes id={id} />
            </div>
          </div>
        </div>
        <div className={card.m__buttons}>
          <div className={card.m__share}>
            <BsShare />
          </div>
          <button
            onClick={() => {
              navigate(`/place/${id}`)
            }}
            className={card.m__viewAll}
          >
            Подробнее
          </button>
        </div>
      </div>
      <div className={card.m__img}>
        <SimpleImageSlider
          width={400}
          height={540}
          navSize={50}
          navStyle={1}
          images={images}
          showBullets={true}
          bgColor={"white"}
          showNavs={true}
        />
      </div>
    </motion.div>
  );
}
export default MCard;
