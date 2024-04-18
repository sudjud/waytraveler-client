import auth from "./auth.module.sass";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../features/userSlice";
import BgImage from "./video/gori.mp4";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleSetLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSignIn = () => {
    dispatch(signIn({ login, password })).then((data) => {
      if (!data.error) {
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div className={auth.auth}>
      <video autoPlay loop muted>
        <source src={BgImage} type="video/mp4" />
      </video>
      <form onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <input
          type="text"
          value={login}
          onChange={handleSetLogin}
          placeholder="Имя пользователя"
        />
        <div style={{ display: "flex" }}>
          <input
            type={passwordShown ? "text" : "password"}
            value={password}
            onChange={handleSetPass}
            placeholder="Пароль"
          ></input>
          {passwordShown ? (
            <AiFillEyeInvisible className={auth.eye} onClick={togglePassword} />
          ) : (
            <AiFillEye className={auth.eye} onClick={togglePassword} />
          )}
          {error && <div className={auth.warningSignIn}>{error}</div>}
        </div>
        <button onClick={handleSignIn}>Войти</button>
      </form>
      <p className={auth.haveAcc}>
        Ещё нет аккаунта? <Link to="/auth">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
};

export default SignIn;
