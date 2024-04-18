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
      Вашему вниманию места в наших краях, куда точно стоит поехать
      </h6>
      <img src={mountain} />
      <MCardSlider />
    </div>
  )
};
export default PlacesBlock;