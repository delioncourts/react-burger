import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";

import styles from './burger-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const BurgerCard = ({ ingredients, name, image, price, onIngredientClick }) => {
    const buns = useSelector(store => store.cart.buns);
    const other = useSelector(store => store.cart.otherItems);

    function handleIngredientClick() {
        onIngredientClick();
    }

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredients",
        item: ingredients,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? .5 : 1
        })

        // collect: (monitor) => ({
        //   isDrag: monitor.isDragging()
        // }),
    });

    return (
        <li ref={dragRef} className={styles.card} onClick={handleIngredientClick} style={{ opacity }}>
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

BurgerCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerCard;