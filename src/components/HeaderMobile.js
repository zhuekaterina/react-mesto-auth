import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../images/logo.svg';
import closebutton from '../images/close_button.svg';

function HeaderMobile({email, onSignOut, onMenuClose}) {
    return (
        <header className="header header_mobile">
            <Route>
                <div className="header__container header__container_mobile">
                    <p className="header__email header__email_mobile">{email}</p>
                    <Link to='/singin' className="header__signout header__signout_mobile" onClick={onSignOut}>Выйти</Link>
                </div>
            </Route>
            <div className="header__container header__container_mobile-logo">
                <img className="header__logo header__logo_mobile" src={logo} alt="Название проекта - Mesto." />
                <img src={closebutton} className="header__menu header__menu_mobile" alt="Значок меню" onClick={onMenuClose}/>
            </div>
        </header>
        );
}

export default HeaderMobile;