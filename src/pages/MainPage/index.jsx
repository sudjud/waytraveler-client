import FadeIn from '../../components/Blocks/FadeInBlock';
import PlacesBlock from '../../components/Blocks/PlacesBlock';
import Welcome from '../../components/Blocks/WelcomeBlock';
import main from './main.module.sass';
import { useEffect } from "react";

function MainPage() {

  useEffect(() => {
    // Функция, которая выполняет прокрутку
    const handleLoad = () => {
      // Плавная прокрутка вниз
      window.scrollTo({
        top: 350,
        behavior: 'smooth'
      });

      // Задержка перед прокруткой обратно вверх
      const timerId = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 1000);

      // Очистка таймера при следующем вызове useEffect или размонтировании компонента
      return () => clearTimeout(timerId);
    };

    // Добавление обработчика события к окну
    window.addEventListener('load', handleLoad);

    // Функция очистки: удаление обработчика события
    return () => window.removeEventListener('load', handleLoad);
  }, []);

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
      {/* <h1>
        
        Отправьтесь в небольшую поездку
      </h1>
      <h6>
        Вашему вниманию места в наших краях, куда точно стоит поехать
        Маршруты собраны так, чтобы тот, кто любит горы, увидел все их разнообразие, а тот, кто любит историю, мог проникнуться ею в старинных башнях.
      </h6> */}
      </div>
      {/* <TripCard /> */}
    </div>
  )
};
export default MainPage;