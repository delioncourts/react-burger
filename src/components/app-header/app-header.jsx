import React from 'react';
import { NavLink } from "react-router-dom";

import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={`${styles.content} pt-4 pb-4`}>
                <nav className={styles.nav}>
                    <NavLink to="/" className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default pl-2">Конструктор</p>
                    </NavLink>

                    <NavLink to="/" className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
                    </NavLink>

                </nav>

                <Logo />

                <NavLink to="/profile" className={`${styles.cabinet} pt-4 pr-5 pb-4 pl-5`}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default pl-2">Личный кабинет</p>
                </NavLink>
            </div>
        </header>
    );
}

export default AppHeader;