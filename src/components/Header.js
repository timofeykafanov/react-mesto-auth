import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    const location = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            {location.pathname === "/" && (
                <div className="header__data">
                    <p className="header__email">{props.email}</p>
                    <button className="header__link header__link_type_logout" onClick={props.handleLogout}>Выйти</button>
                </div>
            )}
            {location.pathname === "/sign-in" && (
                <Link className="header__link" to="/sign-up">Регистрация</Link>
            )}
            {location.pathname === "/sign-up" && (
                <Link className="header__link" to="/sign-in">Войти</Link>
            )}
        </header>
    )
}

export default Header;