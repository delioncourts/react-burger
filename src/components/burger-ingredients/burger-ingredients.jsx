import React from 'react';

import PropTypes from 'prop-types';

import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';
import BurgerCard from '../burger-card/burger-card';

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('bun');

    const ingredients = data.ingredients;

    const buns = ingredients.filter(item => item.type === 'bun');
    const sauces = ingredients.filter(item => item.type === 'sauce');
    const mains = ingredients.filter(item => item.type === 'main');

    const onClickTabElement = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({behavior: 'smooth'});
      }
    

    return (
        <section id="order-line" className={styles.section}>
            <h1 className="text text_type_main-medium pb-5 pt-10">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={current === 'bun'} onClick={onClickTabElement}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={onClickTabElement}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={onClickTabElement}>
                    Начинки
                </Tab>
            </div>

            <ul className={`${styles.ingredients} custom-scroll`}>

                <h2 id="bun" className="text text_type_main-medium pt-10 pb-6">Булки</h2>
                <ul className={`${styles.list} pr-3`}>
                    {buns.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} />
                    ))}
                </ul>
                <h2 id="sauce" className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
                <ul className={`${styles.list} pr-3`}>
                    {sauces.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} />
                    ))}
                </ul>
                <h2 id="main" className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
                <ul className={`${styles.list} pr-3`}>
                    {mains.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} />
                    ))}
                </ul>
            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
};

export default BurgerIngredients;