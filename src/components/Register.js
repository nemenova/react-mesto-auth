import React from 'react';
import { Link } from 'react-router-dom'; 

function Register() {

   function handleSubmit () {

    }
    return(
        <>
       <h2 className="register__title">Регистрация</h2>
                <form name='register' onSubmit={handleSubmit} className="form" noValidate> 
                <fieldset className="form__input">
                    <input id="email-input" name="email" placeholder="Email" type="email" minLength="4" maxLength="40" 
                        className="register__form-item form__item_el_name" required></input>
                    <span className="form__item-error name-input-error"></span>
                    <input id="password-input" name="password" placeholder="Пароль" type="password" minLength="2" maxLength="200"
                        className="register__form-item form__item_el_about" required></input>
                    <span className="form__item-error about-input-error"></span>
                </fieldset>
                    <button type="submit" className="register__submit-btn btn-opacity-change">Зарегистрироваться</button>
                </form>
            <span className="register__capture">Уже зарегистрированы? <Link className="register__span-link" to="/reviews">Войти</Link></span>
        </>
    )
   
}
export default Register;
