import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return ( 
    <header className="header">
        <img src={logo} className="header__logo" alt="Логотип Место Россия" />
        <div className="header__user-auth">
            {props.loggedIn && <p className="header__email">{props.userEmail}</p>}
            {props.loggedIn && <Link className="header__logout" to="/sign-in" onClick={props.handleLogout}>Выйти</Link>}
            {!props.loggedIn && <Link className="header__sign" to="/sign-up">Регистрация</Link>}
        </div>
    </header>
)
}

export default Header;