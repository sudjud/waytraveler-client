import "./style.sass";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
// import Footer from "./components/Footer";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAreas } from "./features/areaSlice";
import YandexMap from "./components/YandexMap/index";
import { fetchPlaces } from "./features/placeSlice";
import MainPage from "./pages/MainPage";
import SCard from "./components/Cards/PlaceCards/SCard";
import Footer from "./components/Footer";
import PlacePage from "./pages/PlacePage";
import CategoriesBlock from "./components/Blocks/CategoriesBlock";


function App() {
  const places = useSelector((state) => state.place.places);

  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  if (!token) {
    return (
      <div className="app">
        <Header />
          
        <Routes>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/auth" element={<SignUp />}></Route>
          <Route path="/map" element={<YandexMap />}></Route>
          <Route path="/" element={<MainPage />}></Route>
          <Route path='/place/:id' element={<PlacePage />} />
        </Routes>
      </div>
    );
  }
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/map" element={<YandexMap />}></Route>
        <Route path="/login" element={<Navigate to="/" />}></Route>
        <Route path="/auth" element={<Navigate to="/" />}></Route>
        <Route path="/place/:id" element={<PlacePage />} />
      </Routes>
      <CategoriesBlock />
    </div>
  );
}

export default App;
