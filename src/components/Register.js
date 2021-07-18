import React from 'react';
import { Link } from 'react-router-dom';


function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(
            password,
            email
        );
    }

    return (
        <>
            <h2 className="register__title">Регистрация</h2>
            <form name='register' onSubmit={handleSubmit} className="form" noValidate>
                <fieldset className="form__input">
                    <input id="email-input" name="email" placeholder="Email" type="email" minLength="4" maxLength="40"
                        onChange={handleChangeEmail} value={email}
                        className="register__form-item form__item_el_name" required></input>
                    <span className="form__item-error name-input-error"></span>
                    <input id="password-input" name="password" placeholder="Пароль" type="password" minLength="2" maxLength="200"
                        onChange={handleChangePassword}
                        value={password}
                        className="register__form-item form__item_el_about" required></input>
                    <span className="form__item-error about-input-error"></span>
                </fieldset>
                <button type="submit" className="register__submit-btn btn-opacity-change">Зарегистрироваться</button>
            </form>
            <span className="register__capture">Уже зарегистрированы?
            <Link className="register__span-link" to="/signin">Войти</Link>
            </span>
        </>
    )
}
export default Register;
