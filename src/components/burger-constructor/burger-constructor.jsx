import React from 'react';
import { useState } from 'react';

import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';
import data from '../../utils/data';

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = () => {

    const ingredients = data.ingredients;
    const buns = ingredients.find(item => item.type === 'bun');
    const other = ingredients.filter(item => item.type !== 'bun');

    const [isActive, setIsActive] = useState(false);

    const openModal = () => {
        setIsActive(true);
    };

    const closeModal = () => {
        setIsActive(false);
    };

    return (
        <section id="burger-constructor" className={`${styles.section} pt-25`}>
            <div className={`${styles.list} pr-2`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns.name} (верх)`}
                    price={buns.price}
                    thumbnail={buns.image}
                    extraClass="mr-5"
                />

                <ul className={`${styles.items} custom-scroll pr-2`}>
                    {other.map((item, index) => {
                        return (
                            <li key={index}>
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

                    )}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${buns.name} (низ)`}
                    price={buns.price}
                    thumbnail={buns.image}
                    extraClass="mr-5"
                />
            </div>
            <div className={`${styles.order} pt-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium pr-1">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                {isActive && (
                    <Modal onClose={closeModal}>
                        <OrderDetails />
                    </Modal>
                )}
                <Button htmlType="button" type="primary" size="large" onClick={openModal}>
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
    type: PropTypes.oneOf(['top', 'bottom', undefined]),
    isLocked: PropTypes.bool,
    extraClass: PropTypes.string,
    handleClose: PropTypes.func,
};

export default BurgerConstructor;