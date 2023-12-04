import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import styles from "./profile-orders.module.css";
import { WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_CLOSED } from "../../services/actions/ws-actions";
import { useDispatch } from "../../index";
import { useEffect } from "react";

export const ProfileOrders = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type: WS_ORDERS_CONNECTION_START,
            url: 'wss://norma.nomoreparties.space/orders',
        });

        return () => {
            dispatch({ 
                type: WS_ORDERS_CONNECTION_CLOSED  });
        }
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <ProfileNavigation />

                <p>Заказы пользователя</p>
            </div>
        </main>
    )
}


