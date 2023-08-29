import React from 'react';
import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('one');

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-medium">Соберите бургер</h1>
            <div className={styles.tab}>
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

            <ul className={`${styles.ingredients} custom-scroll`}>

                <h2 className="text text_type_main-medium">Булки</h2>
                <h2 className="text text_type_main-medium">Соусы</h2>
                <h2 className="text text_type_main-medium">Начинки</h2>
            </ul>
        </section>
    )
}

export default BurgerIngredients;