import React from 'react';
import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>

            <ListIcon type="secondary" />
            <p className="text text_type_main-default">Лента заказов</p>
            
            <Logo />

            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default">Личный кабинет</p>
        </header>
    );
}

export default AppHeader;