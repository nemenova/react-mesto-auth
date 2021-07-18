import React from 'react';
import logo from '../images/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';


function Header(props) {
    const location = useLocation();

    return (
        <header className="header">
            <img src={logo} alt="логотип" className="logo"></img>
            <nav className="menu">
                {props.loggedIn ? (
                    <>
                        <p className="menu__email">{props.values}</p>
                        <NavLink className="menu__link" to="/signin"><button className='menu__exit-btn btn-opacity-change'
                            onClick={props.onSignOut}>Выйти</button></NavLink>
                    </>
                ) : (
                        <NavLink className="menu__link" to={`${location.pathname === '/signin' ? '/signup' : '/signin'}`}>
                            {`${location.pathname === '/signin' ? 'Регистрация' : 'Войти'}`}
                        </NavLink>
                    )}
            </nav>
        </header>
    )

}

export default Header;