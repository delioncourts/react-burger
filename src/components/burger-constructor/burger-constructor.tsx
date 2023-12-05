import React from 'react';
import { FC } from 'react';
import { useState, useMemo } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../../index';


import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import styles from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../modal/modal";
import OrderDetails from '../order-details/order-details';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import { bunsInCart, otherInCart, receiveOrderNumber } from '../../services/selectors';
import { sendOrder } from '../../services/actions/order-details';
import { loggedIn } from '../../services/selectors';
import { ADD_INGREDIENT } from '../../services/constant/const';
import { TIngredient, TIngredientFull } from '../../utils/types';

const BurgerConstructor: React.FC = () => {
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(loggedIn);
    const navigate = useNavigate();

    const orderNumber = useSelector(receiveOrderNumber);

    const buns = useSelector(bunsInCart);
    const other = useSelector(otherInCart);

    function handleCloseModal() {
        setOrderModalOpen(false);
    }

    //генерируем уникальный id для ингредиента
    const uniqueId = (obj: TIngredientFull) => {
        const id = uuidv4();
        return {
            ...obj,
            idtd: id
        }
    }

    //переносим ингредиенты в конструктор 
    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop(item: TIngredientFull) {
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
        const otherPrice = other.reduce((acc: number, item: TIngredientFull) => acc + item.price, 0);
        return bunsPrice * 2 + otherPrice;
    }, [buns, other]);

    //блокируем кнопку отправки заказа если нет начинок и булок
    const checkDisabled = () => {
        return other.length > 0 && buns;
    };

    //отправляем заказ на сервер
    const handleButtonClick = () => {
        //создаем массив булочек и ингредиентов 
        //проверяем есть ли булочки - если да, то совмещаем булочки с начинками и соусами 
        //если полльзователь залогинен, то создаем заказ. иначе отправляем на страницу регистрации
        if (isLoggedIn) {
            const arrBunsAndOther = buns ? [buns, ...other, buns] : [...other];
            dispatch(sendOrder(arrBunsAndOther));
            setOrderModalOpen(true);
        } else navigate('/login')
    }

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
                    {other.map((item: TIngredientFull, index:number) => {
                        return (
                            <BurgerIngredient
                                item={item}
                                index={index}
                                key={item.idtd}  />
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

                {orderModalOpen && (<Modal onCloseModal={handleCloseModal} title={''}>
                    <OrderDetails orderNubmer={orderNumber} />
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