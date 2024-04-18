import auth from "./auth.module.sass";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteError } from "../../features/userSlice";
import BgImage from "./video/gori.mp4";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password_1, setPassword_1] = useState("");
  const [password_2, setPassword_2] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [equal, setEqual] = useState(false);
  const [messagePass, setMessagePass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let error = useSelector((state) => state.user.error);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetMail = (e) => {
    setMail(e.target.value);
  };

  const handleSetPassword1 = (e) => {
    setPassword_1(e.target.value);
    if (password_1.length > 3) {
      setEqual(false);
    }
  };

  const handleSetEqual = () => {
    dispatch(deleteError());
    if (password_1.length < 3) setEqual(true);
  };

  const handleSetPassword2 = (e) => {
    setPassword_2(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRegisterUser = () => {
    if (password_1 === password_2) {
      dispatch(addUser({ name, password_1, mail })).then((data) => {
        if (!data.error) {
          navigate("/login", { replace: true });
        }
      });
      setMessagePass(false);
      dispatch(deleteError());
      return;
    }

    dispatch(deleteError());
    setMessagePass(true);
  };

  return (
    <div className={auth.auth}>
      <video autoPlay loop muted>
        <source src={BgImage} type="video/mp4" />
      </video>
      <form onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <input
          type="text"
          value={name}
          onChange={handleSetName}
          placeholder="Имя пользователя"
        />
        <input
          type="text"
          value={mail}
          onChange={handleSetMail}
          placeholder="Почта"
        />
        <div style={{ display: "flex" }}>
          <input
            type={passwordShown ? "text" : "password"}
            value={password_1}
            onChange={handleSetPassword1}
            placeholder="Пароль"
            onFocus={handleSetEqual}
          />
          {passwordShown ? (
            <AiFillEyeInvisible className={auth.eye} onClick={togglePassword} />
          ) : (
            <AiFillEye className={auth.eye} onClick={togglePassword} />
          )}
        </div>
        <div style={{ display: "flex" }}>
          <input
            type={passwordShown2 ? "text" : "password"}
            value={password_2}
            onChange={handleSetPassword2}
            placeholder="Подтверждение пароля"
          />

          {passwordShown2 ? (
            <AiFillEyeInvisible
              className={auth.eye}
              onClick={togglePassword2}
            />
          ) : (
            <AiFillEye className={auth.eye} onClick={togglePassword2} />
          )}
          {error && <div className={auth.warningSignUp}>{error}</div>}
          {equal && !error ? (
            <div className={auth.warningSignUp}>
              * Пароль должен содержать больше 4 символов
            </div>
          ) : null}
          {messagePass && (
            <div className={auth.warningSignUp}>* Пароли не совпадают</div>
          )}
        </div>
        <p className={auth.personalData}>
          Нажимая на кнопку «Зарегистрироваться» Вы даёте согласие на{" "}
          <Link to="/auth">обработку своих персональных данных</Link>{" "}
        </p>
        <button onClick={handleRegisterUser}>Зарегистрироваться</button>
      </form>
      <p className={auth.haveAcc}>
        Уже есть аккаунт? <Link to="/login">Войдите</Link>
      </p>
    </div>
  );
};

export default SignUp;
