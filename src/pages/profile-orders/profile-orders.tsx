import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import styles from "./profile-orders.module.css";
import { WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_DISCONNECT } from "../../services/actions/ws-actions";
import { useDispatch, useSelector } from "../../index";
import { useEffect, useMemo } from "react";
import OrderCard from "../../components/order-card/order-card";
import { TOrderFeed } from "../../utils/types";

export const ProfileOrders = () => {
    const dispatch = useDispatch();
    
    const profileOrders = useSelector((store) => store.profileOrders.orders);

    useEffect(() => {
        dispatch({
            type: WS_ORDERS_CONNECTION_START,
            url: 'wss://norma.nomoreparties.space/orders',
        });

        return () => {
            dispatch({
                type: WS_ORDERS_CONNECTION_DISCONNECT
            });
        }
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <ProfileNavigation />

                <div className={`${styles.feed} custom-scroll`}>

                    {profileOrders?.orders.map((order) => {
                        return (
                            <OrderCard key={order._id} order={order} status={true} />
                        );
                    })}
                </div>
            </div>
        </main>
    )
}


