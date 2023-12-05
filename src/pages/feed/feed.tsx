import styles from "./feed.module.css";
import { useDispatch, useSelector } from "../../index";
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from "../../services/actions/ws-feed";
import { FC, useEffect } from "react";
import { useMemo } from "react";
import { TOrderFeed } from "../../utils/types";
import { RootState } from "../../index";
import OrderCard from "../../components/order-card/order-card";
import { useParams } from "react-router";

export const Feed:FC = () => {
    const dispatch = useDispatch();
    const feedOrders = useSelector((store) => store.feedOrders.orders);
    const { id } = useParams();

    useEffect(() => {
        dispatch({
            type: WS_FEED_CONNECTION_START,
            url: 'wss://norma.nomoreparties.space/orders/all',
        });

        return () => {
            dispatch({ type: WS_FEED_CONNECTION_CLOSED });
        }
    }, [dispatch]);

    //заказы готовятся
    const inProcess = useMemo(() => {
        if (feedOrders) {
            return feedOrders.orders.filter((order: TOrderFeed) => order.status !== 'done');
        } else {
            return [];
        }
    }, [feedOrders]);

    //заказы готовы
    const final = useMemo(() => {
        if (feedOrders) {
            return feedOrders.orders.filter((order: TOrderFeed) => order.status === 'done');
        } else {
            return [];
        }
    }, [feedOrders]);

    return (
        <main className={styles.main}>
            <p className="text text_type_main-medium pt-4">Лента заказов</p>

            
            <section className={styles.content}>
            <section className={styles.feed}>

            {feedOrders?.orders.map((order:TOrderFeed) => {
                        return (
                            <OrderCard key={order._id} order={order} status={false}/>
                        );
                    })}
            </section>

            <section className={styles.orders}>
                <div className={styles.orders_status}>
                    <article>
                        <h2 className='text text_type_main-medium'>Готовы</h2>
                        <ul className={`mt-6 ${styles.counting}`}>
                            {final?.slice(0, 10).map((card: TOrderFeed) => (
                                <li className={`text text_type_digits-default ${styles.numbers_ready}`} key={card._id}>{card.number}</li>
                            ))}
                        </ul>
                    </article>

                    <article>
                        <h2 className='text text_type_main-medium'>В работе:</h2>
                        <ul className={`mt-6 ${styles.counting_final}`}>
                            {inProcess?.slice(0, 10).map((card: TOrderFeed) => (
                                <li className='text text_type_digits-default' key={card._id}>{card.number}</li>
                            ))}
                        </ul>
                    </article>
                </div>
                <article className='mt-15'>
                    <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                    <p className={`${styles.glow} text text_type_digits-large`}>{feedOrders?.total}</p>
                </article>

                <article className='mt-15'>
                    <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                    <p className={`${styles.glow} text text_type_digits-large`}>{feedOrders?.totalToday}</p>
                </article>
            </section>

            </section>
        </main>
    );
}; 