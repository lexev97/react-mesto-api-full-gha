import { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    props.handleLoginSubmit({
      email: email,
      password: password,
    });
  };

  return (
    <section aria-label="Авторизация пользователя" className="login">
      <h2 className="popup__title popup__title_white">Вход</h2>
      <form
        className="popup__form"
        name="loginForm"
        onSubmit={handleFormSubmit}
      >
        <label>
          <input
            className="popup__input popup__input_black"
            type="email"
            id="email-input"
            name="emailInput"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            value={email || ""}
            onChange={handleEmailInput}
          />
        </label>
        <label>
          <input
            className="popup__input popup__input_black"
            type="password"
            id="password-input"
            name="passwordInput"
            placeholder="Пароль"
            minLength="6"
            maxLength="50"
            required
            value={password || ""}
            onChange={handlePasswordInput}
          />
        </label>
        <button type="submit" className="popup__save popup__save_white">
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
