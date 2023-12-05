//карточка с подробной информацией о заказе 

import styles from "./order-modal-details.module.css";

const OrderModalDetails = ({ }) => {

    return (
        <main className={styles.main}>
            <div className={styles.container}>
            <p className={`${styles.number} text text_type_digits-default`}>#123</p>

            <h1 className="text text_type_main-medium pt-10">Название</h1>
            <p className={`${styles.status} text text_type_main-small pt-3`}>123</p>

            <p className="text text_type_main-medium pt-15 pb-6">Состав:</p>
            <div className={`${styles.ingredients} custom-scroll`}></div>

            </div>

            <div className={styles.timeandmoney}>

                <p className="text text_type_main-default">22</p>

                <div></div>
            </div>
        </main>
    )
}

export default OrderModalDetails;