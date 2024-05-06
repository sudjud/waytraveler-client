import card from "./card.module.sass";
import { motion } from "framer-motion";
import { BsShare } from "react-icons/bs";
import SimpleImageSlider from "react-simple-image-slider";
import Likes from "../../Tools/Likes";
import { useNavigate } from "react-router-dom";
import Comments from "../../Tools/Comments";
import { useEffect, useRef, useState } from "react";

function MCard(props) {
  const navigate = useNavigate();
  const { id, name, area, desc, author, photos } = props;
  const [slidersImageSize, setSlidersImageSize] = useState(390);

  let images = photos.map((item) => {
    return {
      url: `https://waytravel-server-7bcc93134540.herokuapp.com/uploads/images/${item.name}`,
    };
  });

  let mCardRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      // Проверка на существование элемента перед доступом к его свойствам
      if (mCardRef.current) {
        if (window.innerWidth <= 1680) {
          setSlidersImageSize(mCardRef.current.clientWidth);
        } else {
          setSlidersImageSize(390);
        }
      }
    }
  
    window.addEventListener('resize', handleResize);
    handleResize(); // Вызов при монтировании компонента для инициализации размера
  
    // Очистка при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let handleClickMCard = () => {
    return window.innerWidth <= 1680 ? navigate(`/place/${id}`) : null;
  }

  return (
    <motion.div 
      className={card.m} 
      ref={mCardRef}
      onClick={() => {
        handleClickMCard()
      }}
    >
      <div className={card.m__info}>
        <div className={card.m__name}>{name}</div>
        <div className={card.m__area}>{area.name}</div>
        <div className={card.m__desc}>
          {desc.length > 220 ? desc.substring(0, window.innerWidth < 768 ? 220 : 260) + "..." : desc}
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
        {
          window.innerWidth > 1680 ?
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
          :
          null
        }
      </div>
      <div className={card.m__img}>
        <SimpleImageSlider
          width={slidersImageSize}
          height={540}
          navSize={50}
          navStyle={1}
          images={images}
          showBullets={window.innerWidth > 1680}
          bgColor={"white"}
          showNavs={window.innerWidth > 1680}
        />
      </div>
    </motion.div>
  );
}
export default MCard;
