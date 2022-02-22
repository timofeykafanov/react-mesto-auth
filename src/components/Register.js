import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({handleRegistration}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      }

    function handleSubmit(e) {
        e.prevendDefault();
        handleRegistration(formData);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__heading">Регистрация</h2>
            <input className="form__input" type="email" value={formData.email} placeholder="Email" onChange={handleChange}></input>
            <input className="form__input" type="password" value={formData.password} placeholder="Пароль" onChange={handleChange}></input>
            <button className="form__button" type="submit">Зарегистрироваться</button>
            <p className="form__text">Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></p>
        </form>
    )
}

export default Register;