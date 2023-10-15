import React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";

import styles from './burger-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { bunsInCart, otherInCart } from '../../services/selectors';

const BurgerCard = ({ ingredients, name, image, price, onIngredientClick }) => {
    //булочки и начинки с соусами
    const buns = useSelector(bunsInCart);
    const other = useSelector(otherInCart);

    //объединяем массив объектов булочек и начинок и соусов в один массив
    //можно попробовать объединить либо spread, либо методом concat
    //при объединении spread появляется ошибка buns is not iterable
    //при объединении concat Cannot read properties of null (reading 'concat')
    //const ingredientsInConstructor = buns.concat(other);


    //фильтруем массив всех ингредиентов по id и обращаемся к длине получившегося массива
    //массив всех ингредиентов обновляется 
    //const count = useMemo(() => ingredientsInConstructor.filter(element => element._id === ingredients._id).length, [ingredientsInConstructor])

    
    function handleIngredientClick() {
        onIngredientClick();
    }

    //перенос ингредиента
    const [{ opacity }, dragRef] = useDrag({
        type: "ingredients",
        item: ingredients,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? .5 : 1
        })
    });

    return (
        <li ref={dragRef} className={styles.card} onClick={handleIngredientClick} style={{ opacity }}>
            <Counter count={0} size="default" extraClass="m-1" />
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