//карточки для ленты заказа 

import { Link, useLocation } from "react-router-dom";
import { TOrderFeed } from "../../utils/types";
import React from "react";
import { FC } from "react";
import { useSelector } from "../../index";
import { AllIngredients } from "../../services/selectors";
import styles from "./order-card.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";

interface IOrderCard {
    order: TOrderFeed;
    status: boolean | undefined;
}

const OrderCard: FC<IOrderCard> = ({ order, status }) => {
    const location = useLocation();
    const path = location.pathname;

    const { number, createdAt, name } = order;

    const ingredientsInConstructor = useSelector(AllIngredients);
    const maxQuantityIngredients = 5;

    const getCreatedDate = () => {
        const date = createdAt;
        return <FormattedDate date={new Date(date)} />;
    };

    const ingredients = order.ingredients.map((i: string) => {
        return ingredientsInConstructor.find((item: { _id: string; }) => item._id === i);
    })

    const totalPrice = (ingredientsInConstructor: TIngredient[]) => {
        return ingredientsInConstructor.reduce((acc, item) => acc + item?.price, 0);
    };

    //показываем или скрываем статус заказа 
    const showStatus = (status: string) => {
        const statusMap: { [key: string]: string } = {
            "done": "Выполнен",
            "pending": "Готовится",
            "created": "Создан"
        };
        return statusMap[status] || "Выполнен";
    };

    return (
        <Link
            to={`${path}/${order.number}`}
            className={styles.link}
            state={{ background: location }}
            key={order?._id}
        >
            <div className={`${styles.card} pt-6 pb-6 pl-6 pr-6`}>
                <div className={`${styles.orderdate} pb-6`}>
                    <p className="text text_type_main-default">#{number}</p>
                    <p className="text text_type_main-default text_color_inactive">{getCreatedDate()}</p>
                </div>

                <p className="text text_type_main-medium">{name}</p>

                {status &&
                 <p className={`${styles.status} text text_type_main-default pt-2`}>{showStatus(order.status)}</p>}

                <div className={`${styles.ordercontent} text text_type_main-default pt-6`}>

                    <ul className={styles.order_list}>
                        {ingredients.slice(0, 6).map((item, index: number) => {
                            return (
                                <li className={styles.card_item} key={`${index}-${item?._id}`} style={{ zIndex: 100 - index }}>
                                    {index === maxQuantityIngredients && ingredients.length !== index + 1 && <span className={`text text_type_main-default ${styles.overlay}`}>+{ingredients.length - 5}</span>}
                                    <img className={styles.card_icon} src={item?.image} alt={item?.name} />
                                </li>
                            )
                        })}
                    </ul>
                    <div className={styles.price}>
                        <p className="text text_type_digits-medium pr-1">{totalPrice(ingredients)}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderCard;