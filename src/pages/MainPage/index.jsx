import FadeIn from '../../components/Blocks/FadeInBlock';
import PlacesBlock from '../../components/Blocks/PlacesBlock';
import TripsBlock from '../../components/Blocks/TripsBlock';
import Welcome from '../../components/Blocks/WelcomeBlock';
import TripCard from '../../components/Cards/TripCards/MTrip';
import main from './main.module.sass'

function MainPage() {

  return (
    <div className={main.main}>
      <Welcome />
      <div className={main.fadeInBlock}>
        <FadeIn />
      </div>
      <div className={main.placeBlock}>
        <PlacesBlock />
      </div>
      <div className={main.beforeTrip}>
      <h1>
        
        Отправьтесь в небольшую поездку
      </h1>
      <h6>
        Вашему вниманию места в наших краях, куда точно стоит поехать
        Маршруты собраны так, чтобы тот, кто любит горы, увидел все их разнообразие, а тот, кто любит историю, мог проникнуться ею в старинных башнях.
      </h6>
      </div>
      <TripCard />
    </div>
  )
};
export default MainPage;