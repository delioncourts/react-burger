import React from 'react';
import styles from './burger-constructor.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerCard = () => {
    return (
        <>
            <Counter count={1} size="default" extraClass="m-1" />
            <CurrencyIcon type="primary" />
        </>
    )
}

export default BurgerCard;