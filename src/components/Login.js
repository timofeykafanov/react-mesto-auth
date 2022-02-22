function Login() {
    return (
        <form className="form">
            <h2 className="form__heading">Вход</h2>
            <input className="form__input" type="email" placeholder="Email"></input>
            <input className="form__input" type="password" placeholder="Пароль"></input>
            <button className="form__button" type="submit">Войти</button>
        </form>
    )
}

export default Login;