import React from "react";
import { useSelector } from "react-redux";

import styles from "./order-details.module.css";
import done from '../../images/done.svg';

import { receiveOrderNumber } from "../../services/selectors";

const OrderDetails = () => {

    const orderNumber = useSelector(receiveOrderNumber);
    console.log(orderNumber)

    return (
        <div className={`${styles.popup} pt-15 pb-25`}>
            <h2 className={`${styles.glow} text text_type_digits-large`}>{orderNumber}</h2>
            <p className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</p>
            <img className={styles.image} src={done} alt='Ваш заказ начали готовить' />
            <p className="text text_type_main-default pt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;