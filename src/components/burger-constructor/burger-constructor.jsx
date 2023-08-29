import React from 'react';
import styles from './burger-constructor.module.css';
import data from '../../data/data';

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = () => {
    
    const ingredients = data.ingredients;
    const buns = ingredients.find(item => item.type === 'bun');

    return (
        <section className={`${styles.section} pt-25`}>
            <div className={styles.list}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns.name} (верх)`}
                    price={buns.price}
                    thumbnail={buns.image}
                />

<ul className={`${styles.list} custom-scroll`}>

</ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${buns.name} (низ)`}
                    price={buns.price}
                    thumbnail={buns.image}
                />
            </div>
            <div className={`${styles.order} pt-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;