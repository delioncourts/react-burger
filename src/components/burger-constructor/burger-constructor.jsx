import React from 'react';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

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
        const bunsPrice = buns?.price || 0;
        const otherPrice = other.reduce((acc, item) => acc + item.price, 0);
        return bunsPrice * 2 + otherPrice;
    }, [buns, other]);

    //блокируем кнопку отправки заказа если нет начинок и булок
    const checkDisabled = () => {
        return other.length > 0 && buns;
    };

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
                                key={item.idtd} />
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
                <Button htmlType="button" type="primary" size="large" onClick={handleButtonClick} disabled={!checkDisabled()} >
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;