import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import styles from "./profile-orders.module.css";

export const ProfileOrders = () => {

    const showStatus = (status: string) => {
        switch (status) {
            case "done":
                return "Выполнен";
            case "pending":
                return "Готовится";
            case "created":
                return "Создан";
            default:
                return "Выполнен";
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <ProfileNavigation />

                <p>Заказы пользователя</p>
            </div>
        </main>
    )
}