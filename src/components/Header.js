import React from 'react';
import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';


function Header (props) {
const currentUrl = window.location.pathname;

    
    const data = {}
    if (currentUrl === '/signup') {
        data.link = '/signin'
        data.title = 'Войти'
    } else if (currentUrl === '/signin') {
        data.link = '/signup'
        data.title = 'Регистрация'
    } else {
        data.link = '/signin'
        data.title = <button className='menu__exit-btn' onClick={props.onSignOut}>{`Выйти`}</button>
    }


    return (
        <header className="header">
            <img src={logo} alt="логотип" className="logo"></img>
            <nav className="menu">
                <p className="menu__email">{props.values}</p>
                <NavLink to={data.link} activeClassName="menu__link_active" className="menu__link">{data.title}</NavLink>
            </nav>
        </header>
    )
    
}

export default Header;