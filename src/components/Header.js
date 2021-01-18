import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import logo from '../images/logo.svg';
import menu from '../images/menu-lines.svg';

function Header({email, onSignOut, onMenuOpen}) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Название проекта - Mesto." />
            <Switch>
                <Route path='/signin'>
                    <Link className="header__authlink" to='/signup'>Регистрация</Link>
                </Route>
                <Route path='/signup'>
                    <Link className="header__authlink" to='/signin'>Войти</Link>
                </Route>
                <Route>
                    <div className="header__container">
                        <p className="header__email">{email}</p>
                        <Link to='/singin' className="header__signout" onClick={onSignOut}>Выйти</Link>
                        <img src={menu} className="header__menu" alt="Значок меню" onClick={onMenuOpen}/>
                    </div>
                </Route>
            </Switch>
        </header>
        );
}

export default Header;