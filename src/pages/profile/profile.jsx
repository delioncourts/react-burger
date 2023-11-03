//import { Link } from 'react-router-dom';
//import styles from "./not-found-404.module.css";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

export const Profile = () => {
    return (
        <main>
            <h2>Login</h2>

            <NavLink to="/profile">Профиль</NavLink>
            <NavLink to="/profile/orders">История заказов</NavLink>
            <NavLink to="/profile/orders/:id">Выход</NavLink>
        </main>
    );
}; 