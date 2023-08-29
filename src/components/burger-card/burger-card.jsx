import React from 'react';

import styles from './burger-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerCard = ({ name, image, price }) => {
    return (
        <li className={styles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img className={styles.img} src={image} alt={name} />
            <div className={`${styles.container} pt-1`}>
                <p className="text text_type_main-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pt-1">{name}</p>
        </li>
    )
}

export default BurgerCard;