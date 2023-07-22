import { Fragment, useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Header = (props) => {
  const userCtx = useContext(CurrentUserContext);

  return (
    <header className='header'>
      <div className='logo'></div>
      <div className='header__links'>
        <Routes>
          <Route
            path='/sign-up'
            element={
              <Link className='header__link' to='/sign-in'>
                Войти
              </Link>
            }
          />
          <Route
            path='/sign-in'
            element={
              <Link className='header__link' to='/sign-up'>
                Регистрация
              </Link>
            }
          />
          <Route
            path='/'
            element={
              <Fragment>
                <p className='header__email'>{userCtx.email}</p>
                <Link
                  className='header__link header__link_gray'
                  to='/sign-in'
                  onClick={props.handleLogOut}
                >
                  Выйти
                </Link>
              </Fragment>
            }
          />
        </Routes>
      </div>
    </header>
  );
};

export default Header;
