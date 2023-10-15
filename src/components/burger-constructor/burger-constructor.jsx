import React from 'react';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

import styles from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../modal/modal";
import OrderDetails from '../order-details/order-details';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { ADD_INGREDIENT } from "../../services/actions/burger-constructor";
import { bunsInCart, otherInCart, receiveOrderNumber } from '../../services/selectors';

const BurgerConstructor = () => {
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const dispatch = useDispatch();

    /* const { buns, other } = useMemo(() => {
         return {
             buns: data.find(item => item.type === 'bun'),
             other: data.filter(item => item.type !== 'bun'),
         };
     }, [data]);*/

    const orderNumber = useSelector(receiveOrderNumber);

    const buns = useSelector(bunsInCart);
    const other = useSelector(otherInCart);
    console.log(buns);
    console.log(other);

    function handleButtonClick() {
        setOrderModalOpen(true);
    }

    function handleCloseModal() {
        setOrderModalOpen(false);
    }

    //генерируем уникальный id для ингредиента
    const uniqueId = (obj) => {
        const id = uuidv4();
        return {
            ...obj,
            idtd: id
        }
    }

    //переносим ингредиенты в конструктор 
    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop(item) {
            dispatch({
                type: ADD_INGREDIENT,
                item: uniqueId(item)
            });
        },
        collect: ((monitor) => ({
            isOver: monitor.isOver(),
            droppedItem: monitor.getItem(),
            canDrop: monitor.canDrop(),
        }))
    });

    //посчитать финальную стоимость - в useMemo чтобы перерисовывать только если есть изменения
    //стоимость булочек считается по 2 булочки
    const totalPrice = useMemo(() => {
        return (buns ? buns.price * 2 : 0) + other.reduce((acc, item) => acc + item.price, 0);
    }, [buns, other])

    return (
        <section ref={dropTarget} id="burger-constructor" className={`${styles.section} pt-25`}>
            <div className={`${styles.list} pr-2`}>
                {buns ? (<ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns.name} (верх)`}
                    price={buns.price}
                    thumbnail={buns.image}
                    extraClass="mr-5"
                />) : (
                    <p className="text text_type_main-medium pr-1 pb-4">Перетащите булочку</p>)
                }

                {other.length === 0 && <p className="text text_type_main-medium pr-1">Перетащите начинку или соус</p>}

                <ul className={`${styles.items} custom-scroll pr-2`}>
                    {other.map((item, index) => {
                        return (
                            <BurgerIngredient
                                item={item}
                                index={index}
                                key={item.uniqueId} />
                        )
                    }
                    )}
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
                    <p className="text text_type_digits-medium pr-1">{totalPrice || 0}</p>
                    <CurrencyIcon type="primary" />
                </div>

                {orderModalOpen && (<Modal onCloseModal={handleCloseModal}>
                    <OrderDetails orderNumber={orderNumber} />
                </Modal>
                )}
                <Button htmlType="button" type="primary" size="large" onClick={handleButtonClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

/*(BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired
}*/

export default BurgerConstructor;