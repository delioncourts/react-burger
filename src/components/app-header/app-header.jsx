import React from 'react';
import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
            <nav className={styles.nav}>
            <a href="#" className={styles.link}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
            </a>

            <a href="#" className={styles.link}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
            </a>

            </nav>

            <Logo />

            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default">Личный кабинет</p>
            </div>
        </header>
    );
}

export default AppHeader;