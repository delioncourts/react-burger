//import { Link } from 'react-router-dom';
import styles from "./profile.module.css";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

export const Profile = () => {
    return (
        <main className={styles.main}>

<section className={styles.linkpanel}>
            <NavLink to="/profile">Профиль</NavLink>
            <NavLink to="/profile/orders">История заказов</NavLink>
            <NavLink to="/profile/orders/:id">Выход</NavLink>

            <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
            </section>

            <section className={styles.inputpanel}>
<h1>Profile</h1>
            </section>
        </main>
    );
}; 