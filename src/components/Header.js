import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    const location = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
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