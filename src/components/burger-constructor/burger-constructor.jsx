import React from 'react';

import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';
import data from '../../utils/data';

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = () => {

    const ingredients = data.ingredients;
    const buns = ingredients.find(item => item.type === 'bun');

    return (
        <section className={`${styles.section} pt-25`}>
            <div className={`${styles.list} custom-scroll pr-2`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns.name} (верх)`}
                    price={buns.price}
                    thumbnail={buns.image}
                />

                <ul className={styles.items}>
                    {ingredients.map((item) => {
                        if (item.type !== 'bun') {
                            return (
                                <li key={item._id}>
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                        extraClass="ml-1"
                                    />
                                </li>
                            )
                        }
                    }
                    )}
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
                    <p className="text text_type_digits-medium pr-1">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['top','bottom',undefined]),
    isLocked: PropTypes.bool,
    extraClass: PropTypes.string,
    handleClose: PropTypes.func,
};

export default BurgerConstructor;