//карточка с подробной информацией о заказе 
import { TOrderFeed, TIngredient } from "../../utils/types";

import styles from "./order-modal-details.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch, } from "../../index";
import { AllIngredients } from "../../services/selectors";
import { sendOrder } from "../../services/actions/order-details";
import { getOrdersByNumber } from "../../utils/api";

const OrderModalDetails: FC = () => {
    //const location = useLocation();
    const dispatch = useDispatch();

    const { id } = useParams<{ id: string }>();
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const profileOrders = useSelector(store => store.profileOrders);
    const feedOrders = useSelector(store => store.feedOrders);
    const [currentOrder, setCurrentOrder] = useState<TOrderFeed | undefined>();

    useEffect(() => {
        if (profileOrders.orders?.orders.length) {
            const currentOrder = profileOrders?.orders?.orders.find(({ number }) => number.toString() === id);
            if (currentOrder) {
                setCurrentOrder(currentOrder);
                return;
            };
        }
        if (feedOrders.orders?.orders.length) {
            const currentOrder = feedOrders?.orders?.orders.find(({ number }) => number.toString() === id);
            if (currentOrder) {
                setCurrentOrder(currentOrder);
                return;
            };
        }
    }, [profileOrders, feedOrders])


    useEffect(() => {
        if (!currentOrder) {
            dispatch(getOrdersByNumber(number))
        }
    }, [dispatch, currentOrder, number])

    const currentInredients = useMemo(() => {
        return currentOrder?.ingredients
            ? currentOrder.ingredients.map((id: string) =>
                ingredients.find(item => String(id) === String(item._id)) as TIngredient
            )
            : [];
    }, [currentOrder?.ingredients, ingredients]);


    const countedIngredients: TIngredient[] = useMemo(() =>
        currentInredients.reduce((arr: TIngredient[], item) => {
            const currentItem = arr.find((element) => element.name === item.name);
            if (currentItem !== undefined && currentItem.count !== undefined) {
                currentItem.count += 1;
            } else {
                arr.push({ ...item, count: 1 });
            }
            return arr;
        }, []),
        [currentInredients]
    );

    const getCreatedDate = () => {
        const date = currentOrder?.createdAt;
        return <FormattedDate date={new Date(date!)} />;
    };

    const totalPrice = (ingredients: TIngredient[]) => {
        return currentInredients?.reduce((acc, item) => acc + item?.price, 0);
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <p className={`${styles.number} text text_type_digits-default`}>#{currentOrder?.number}</p>

                <h1 className="text text_type_main-medium pt-10">{currentOrder?.name}</h1>
                <p className={`${styles.status} text text_type_main-small pt-3`}>{currentOrder?.status === "done"
                    ? "Выполнен"
                    : currentOrder?.status === "pending"
                        ? "Готовится"
                        : currentOrder?.status === "created"
                            ? "Создан"
                            : "Выполнен"}</p>
                <p className="text text_type_main-medium pt-15 pb-6">Состав:</p>
                <div className={`${styles.ingredients} custom-scroll`}>

                    <ul className={styles.card_list}>
                        {countedIngredients?.map((item) => {
                            return (
                                <li className={styles.card_item} key={item._id}>

                                    <div className={styles.image_name}>
                                        <img className={styles.card_icon} src={item?.image} alt={item?.image} />
                                        <p className="text text_type_main-small pl-4">{item?.name}</p>
                                    </div>

                                    <div className={styles.counting_order}>
                                        <p className="text text_type_digits-default pl-4 pr-1">{item?.count}</p>
                                        <p className="text text_type_main-small pr-1">x</p>
                                        <p className="text text_type_digits-default pr-1">{item?.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                </div>

                <div className={`${styles.timeandmoney} pt-10`}>
                    <p className="text text_type_main-default text_color_inactive">{getCreatedDate()}</p>

                    <div className={styles.price}>
                        <p className="text text_type_digits-default pr-1">{totalPrice(countedIngredients)}</p>
                        <CurrencyIcon type="primary" />
                    </div>

                </div>

            </div>
        </main>
    )
}

export default OrderModalDetails;