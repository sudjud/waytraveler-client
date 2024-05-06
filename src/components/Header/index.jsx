import header from "./header.module.sass";
import { NavLink, useNavigate } from "react-router-dom";
import { TbMap2 } from "react-icons/tb";
import logo from './logo.png'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { deleteToken } from "../../features/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);

  const [scrollSetting, setScrollSetting] = useState({
    prevScrollPos: window.pageYOffset, // Используйте pageYOffset для получения начальной позиции
    visible: true
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = currentScrollPos < scrollSetting.prevScrollPos || currentScrollPos === 0;

      setScrollSetting({
        prevScrollPos: currentScrollPos,
        visible: isVisible
      });
    };

    // Добавьте обработчик прокрутки
    window.addEventListener("scroll", handleScroll);

    // Удалите обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollSetting.prevScrollPos]);

  const logout = () => {
    dispatch(deleteToken());
  }

  const login = () => {
    navigate('/login')
  }

  return (
    <div className={scrollSetting.visible ? header.header : header.header_hidden}>
      <div className={header.sidebar}>
        {/* <Sidebar /> */}
      </div>
      <div className={header.left}>
        <NavLink to="/map" style={{ textDecoration: "none" }}>
          <div className={header.map}>
            <TbMap2 className={header.__map} />
            {/* <div>Карта</div> */}
          </div>
        </NavLink>
        <div className={header.img}>
          <NavLink to="/">
            <img className={header.logo} src={logo} alt="" />
          </NavLink>
        </div>
        <div className={header.login}>
          {token ? <RiLogoutBoxLine onClick={logout} /> : <RiLoginBoxLine onClick={login} />}
        </div>
      </div>
    </div>
  );
}

export default Header;