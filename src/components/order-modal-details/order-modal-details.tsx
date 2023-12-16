//карточка с подробной информацией о заказе 
import { TOrderFeed } from "../../utils/types";

import styles from "./order-modal-details.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../../index";
import { AllIngredients } from "../../services/selectors";
import { sendOrder } from "../../services/actions/order-details";
import { TIngredient } from "../../utils/types";

const OrderModalDetails:FC = () => {
    //const { number, createdAt, name } = order;
 
    const location = useLocation();
    const dispatch = useDispatch();

    const { id } = useParams<{ id: string }>();

   // const ingredients: TIngredient[] = useSelector(store => store.ingredients.ingredients);



    const getCreatedDate = () => {
        let createdAt = 22;
        const date = createdAt;
        return <FormattedDate date={new Date(date)} />;
    };


    const totalPrice = 9;

    /*  const totalPrice = (currentOrder: TIngredient[]) => {
        return currentOrder.reduce((acc, item) => acc + item.price, 0);
    };*/

    const showStatus = (status: string) => {
        const statusMap: { [key: string]: string } = {
            "done": "Выполнен",
            "pending": "Готовится",
            "created": "Создан"
        };
        return statusMap[status] || "Выполнен";
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <p className={`${styles.number} text text_type_digits-default`}>#{id}</p>

                <h1 className="text text_type_main-medium pt-10">Название</h1>
                <p className={`${styles.status} text text_type_main-small pt-3`}>{showStatus('done')}</p>

                <p className="text text_type_main-medium pt-15 pb-6">Состав:</p>
                <div className={`${styles.ingredients} custom-scroll`}>

                    <ul className={styles.card_list}>
                        <li className={styles.card_item}>

                            <div className={styles.image_name}>
                                <img className={styles.card_icon} />
                                <p className="text text_type_digits-default pl-4">111</p>
                            </div>

                            <div className={styles.counting_order}>
                                <p className="text text_type_digits-default pr-1">{1 || 0}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    </ul>

                </div>



                <div className={`${styles.timeandmoney} pt-10`}>

                    <p className="text text_type_main-default text_color_inactive">{getCreatedDate()}</p>

                    <div className={styles.price}>
                        <p className="text text_type_digits-default pr-1">{1 || 0}</p>
                        <CurrencyIcon type="primary" />
                    </div>

                </div>

            </div>
        </main>
    )
}

export default OrderModalDetails;