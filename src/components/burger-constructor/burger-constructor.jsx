import React from 'react';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

import styles from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../modal/modal";
import OrderDetails from '../order-details/order-details';

import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from "../../services/actions/burger-constructor";

import bun_image from '../../images/bun.png'
const BurgerConstructor = () => {
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const dispatch = useDispatch();

    /* const { buns, other } = useMemo(() => {
         return {
             buns: data.find(item => item.type === 'bun'),
             other: data.filter(item => item.type !== 'bun'),
         };
     }, [data]);*/

    const orderNumber = useSelector(store => store.order.number);

    const buns = useSelector(store => store.cart.buns);
    const other = useSelector(store => store.cart.otherItems)
    console.log(buns)

    function handleButtonClick() {
        setOrderModalOpen(true);
    }

    function handleCloseModal() {
        setOrderModalOpen(false);
    }

    return (
        <section id="burger-constructor" className={`${styles.section} pt-25`}>
            <div className={`${styles.list} pr-2`}>
                {buns ? (<ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns.name} (верх)`}
                    price={buns.price}
                    thumbnail={buns.image}
                    extraClass="mr-5"
                />) : (
                    <p className="text text_type_main-medium pr-1">Перетащите булочку</p>)
                }

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

                <ul className={`${styles.items} pr-2`}>
                    <li>
                        <ConstructorElement
                            text={`Перетащите начинку или соус`}
                            price={0}
                            thumbnail={bun_image}
                            extraClass="ml-1"
                        />
                        <p className="text text_type_main-medium pr-1">Перетащите начинку или соус</p>
                    </li>
                </ul>

                {buns ? (<ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${buns.name} (низ)`}
                    price={buns.price}
                    thumbnail={buns.image}
                    extraClass="mr-5"
                />
                ) : (
                    <p className="text text_type_main-medium pr-1">Перетащите булочку</p>
                )
                }
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