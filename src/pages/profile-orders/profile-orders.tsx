import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import styles from "./profile-orders.module.css";

export const ProfileOrders = () => {

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <ProfileNavigation />

                <p>Заказы пользователя</p>
            </div>
        </main>
    )
}