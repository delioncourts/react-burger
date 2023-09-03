import React from "react";
import styles from "./ingredient-details.module.css";
import done from '../../images/done.svg';

const OrderDetails = () => {
    return (
        <div className={styles.popup}>
            <h2 className={`${styles.glow} text text_type_digits-large`}>034536</h2>
            <p className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</p>
            <img src={done} alt='Ваш заказ начали готовить' />
            <p className="text text_type_main-default pt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;