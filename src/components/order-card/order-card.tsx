//карточки для ленты заказа 
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router";
import { TOrderFeed } from "../../utils/types";
import React from "react";
import { FC } from "react";
import { useSelector } from "../../index";
import { AllIngredients } from "../../services/selectors";
interface IOrderCard {
    order: TOrderFeed;
    status: boolean;
}

const OrderCard: FC<IOrderCard> = ({ order, status }) => {
    const location = useLocation();
    const path = location.pathname;

    const { number, createdAt, name } = order;

    const ingredients = useSelector(AllIngredients);

    const date = () => {
        //return <FormattedDate date={new Date(el?.createdAt)} />
    };

    return (
        <>
            <p>la bla bla</p>b
        </>
    )
}

export default OrderCard;