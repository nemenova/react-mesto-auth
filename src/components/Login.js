import React from 'react';

function Login(props) {
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
        if (!email || !password) {
            return;
        }
        props.onLogin(
            password,
            email
        );
    }
    return (
        <>
            <h2 className="register__title">Вход</h2>
            <form name='login' onSubmit={handleSubmit} className="form">
                <fieldset className="form__input">
                    <input id="email-input" name="email" placeholder="Email" type="email" minLength="4" maxLength="40"
                        onChange={handleChangeEmail} value={email}
                        className="register__form-item form__item_el_name" required></input>
                    <span className="form__item-error name-input-error"></span>
                    <input id="password-input" name="password" placeholder="Пароль" type="password" minLength="2" maxLength="200"
                        onChange={handleChangePassword} value={password}
                        className="register__form-item form__item_el_about" required></input>
                    <span className="form__item-error about-input-error"></span>
                </fieldset>
                <button type="submit" className="register__submit-btn btn-opacity-change">Войти</button>
            </form>
        </>
    )

}
export default Login;
