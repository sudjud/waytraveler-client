import MCardSlider from '../Cards/PlaceCards/MCardsSlider';
import block from './block.module.sass';
import mountain from '../../assets/img/silhouette.png'

function PlacesBlock() {

  return (
    <div className={block.places}>
      <h1 className={block.places__title}>
      Стоит посетить
      </h1>
      <h6 className={block.places__desc}>
        Нажимайте на <span className={block.places__desc_mob}>карточку</span><span className={block.places__desc_desctop}>кнопку "Подробнее"</span>, чтобы узнать побольше о локации и посмотреть больше фото.
      </h6>
      <img src={mountain} />
      <MCardSlider />
    </div>
  )
};
export default PlacesBlock;