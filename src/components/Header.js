import React from 'react';
import logo from '../images/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';


function Header(props) {
    const location = useLocation();
    // function setHeader(props) {
    //         return <p className="menu__email">{props.values}</p>
    //                 <NavLink to={data.link} activeClassName="menu__link_active" className="menu__link">{data.title}</NavLink>

    // }

    // const data = {}

    // if (currentUrl === '/signup') {
    //     data.link = '/signin'
    //     data.title = 'Войти'
    // } else if (currentUrl === '/signin') {
    //     data.link = '/signup'
    //     data.title = 'Регистрация'
    // } else {
    //     data.link = '/signin'
    //     data.title = <button className='menu__exit-btn' onClick={props.onSignOut}>{`Выйти`}</button>
    // }



    // let content
    // if (currentUrl === '/signup') {
    //     content = <NavLink to='/signin' className="menu__link">Войти</NavLink>
    // } else if (currentUrl === '/signin') {
    //     content = <NavLink to='/signup' className="menu__link">Регистрация</NavLink>
    // } else if (props.loggedIn){
    //     content =
    //         <>
    //             <p className="menu__email">{props.values}</p>
    //             <NavLink to='/signin' className="menu__link"><button className='menu__exit-btn btn-opacity-change' 
    //             onClick={props.onSignOut}>Выйти</button></NavLink>
    //         </>
    // }


    return (
        <header className="header">
            <img src={logo} alt="логотип" className="logo"></img>
            <nav className="menu">
                {props.loggedIn ? (
                    <>
                        <p className="menu__email">{props.values}</p>
                        <NavLink className="menu__link" to="/sign-in"><button className='menu__exit-btn btn-opacity-change'
                            onClick={props.onSignOut}>Выйти</button></NavLink>
                    </>
                ) : (
                        <NavLink className="menu__link" to={`${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`}>
                            {`${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
                        </NavLink>
                    )}


            </nav>
        </header>
    )

}

export default Header;