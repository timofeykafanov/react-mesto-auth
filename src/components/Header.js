import logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            <p className="header__text">Регистрация</p>
        </header>
    )
}

export default Header;