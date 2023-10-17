import React from 'react';
import { useState, useMemo } from 'react';

import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

import styles from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = ({ data }) => {
    const [orderModalOpen, setOrderModalOpen] = useState(false);

    //const buns = data.find(item => item.type === 'bun');
    //const other = data.filter(item => item.type !== 'bun');

    const { buns, other } = useMemo(() => {
        return {
            buns: data.find(item => item.type === 'bun'),
            other: data.filter(item => item.type !== 'bun'),
        };
    }, [data]);

    function handleButtonClick() {
        setOrderModalOpen(true);
    }

    function handleCloseModal() {
        setOrderModalOpen(false);
    }

    return (
        data.length && <section id="burger-constructor" className={`${styles.section} pt-25`}>
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
                    {other.map(({ _id, name, price, image }) => {
                        return (
                            <li key={_id}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={name}
                                    price={price}
                                    thumbnail={image}
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

                {orderModalOpen && (<Modal onCloseModal={handleCloseModal}>
                    <OrderDetails />
                </Modal>
                )}
                <Button htmlType="button" type="primary" size="large" onClick={handleButtonClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired
}

export default BurgerConstructor;