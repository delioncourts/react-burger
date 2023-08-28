import React from 'react';
import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('one');

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-medium">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
        </section>
    )
}

export default BurgerIngredients;