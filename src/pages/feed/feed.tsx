import styles from "./feed.module.css";
import { useDispatch, useSelector } from "../../index";
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from "../../services/actions/ws-feed";
import { useEffect } from "react";
import { useMemo } from "react";
import { TOrderFeed } from "../../utils/types";
import { RootState } from "../../index";

export const Feed = () => {
    const dispatch = useDispatch();
    const feedOrders = useSelector((store:RootState) => store.feedOrders.orders);

    useEffect(() => {
        dispatch({
            type: WS_FEED_CONNECTION_START,
            url: 'wss://norma.nomoreparties.space/orders/all',
        });

        return () => {
            dispatch({ type: WS_FEED_CONNECTION_CLOSED });
        }
    }, [dispatch]);

    const inProcess = useMemo(() => {
        if (feedOrders) {
            return feedOrders.orders.filter((order: TOrderFeed) => order.status !== 'done');
        } else {
            return [];
        }
    }, [feedOrders]);

    const final = useMemo(() => {
        if (feedOrders) {
            return feedOrders.orders.filter((order: TOrderFeed) => order.status === 'done');
        } else {
            return [];
        }
    }, [feedOrders]);

    return (
        <main className={styles.main}>

            <section className={styles.feed}>
                <p className="text text_type_main-medium">Лента заказов</p>
            </section>

            <section className={styles.orders}>
                <div className={styles.orders_status}></div>
                <article>
                    <h2 className='text text_type_main-medium'>Готовы</h2>
                    <ul className={`mt-6 ${styles.counting} ${styles.numbers_ready}`}>
                        {final?.slice(0, 10).map((card: TOrderFeed) => (
                            <li className='text text_type_digits-default' key={card._id}>{card.number}</li>
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

                <article className='mt-15'>
                    <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                    <p className='text text_type_digits-large'>{feedOrders.total}</p>
                </article>

                <article className='mt-15'>
                    <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                    <p className='text text_type_digits-large'>{feedOrders.totalToday}</p>
                </article>
            </section>


        </main>
    );
}; 