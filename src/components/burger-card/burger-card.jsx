import React from 'react';
import styles from './burger-constructor.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerCard = ({ card, name, image }) => {
    return (
        <li className={styles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img className={styles.img} scr={image} alt={name} />
            <div className={styles.container}>
                <p className={styles.price}>{card.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name}>{name}</p>
        </li>
    )
}

export default BurgerCard;