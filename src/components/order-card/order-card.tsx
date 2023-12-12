//карточки для ленты заказа 

import { Link, useLocation } from "react-router-dom";
import { TOrderFeed } from "../../utils/types";
import React from "react";
import { FC } from "react";
import { useSelector } from "../../index";
import { AllIngredients } from "../../services/selectors";
import styles from "./order-card.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderCard {
    order: TOrderFeed;
    status: boolean;
}

const OrderCard: FC<IOrderCard> = ({ order, status }) => {
    const location = useLocation();
    const path = location.pathname;

    const { number, createdAt, name } = order;

    const ingredients = useSelector(AllIngredients);

    const totalPrice = 7;

   /* function date() {
        return <FormattedDate date={new Date(createdAt)} />
    }*/

    return (
        <Link
        to={`${path}/${order.number}`}
        className={styles.link}
        state={{ background: location }}
        key={order?._id}
      >
            <div className={`${styles.card} pt-6 pb-6`}>
                <div className={`${styles.orderdate} pb-6`}>
                    <p className="text text_type_main-small"></p>
                    <p className="text text_type_main-default text_color_inactive"></p>
                </div>

                <p className="text text_type_main-medium pb-6"></p>

                <div className={styles.ordercontent}>
                    <div className={styles.price}>
                        <p className="text text_type_digits-medium pr-1">{totalPrice || 0}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderCard;