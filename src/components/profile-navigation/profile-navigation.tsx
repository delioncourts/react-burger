import styles from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";
import { signout } from '../../services/actions/auth';
//import { useDispatch } from 'react-redux';
import { useDispatch } from '../../index';

const ProfileNavigation = ({ }) => {
    const dispatch = useDispatch();

    function handleSignOut() {
        dispatch<any>(signout());
    }
    
    return (
        <section className={styles.linkpanel}>
        <NavLink to="/profile" style={({ isActive }) => {
            return {
                color: isActive ? "#f2f2f3" : "#8585AD",
            };
        }}>
            <p className={`${styles.link} text text_type_main-medium`}>Профиль</p>
        </NavLink>

        <NavLink to="/profile/orders" style={({ isActive }) => {
            return {
                color: isActive ? "#f2f2f3" : "#8585AD",
            };
        }}>
            <p className={`${styles.link} text text_type_main-medium`}>История заказов</p>
        </NavLink>

        <p onClick={handleSignOut} className={`${styles.link} text text_type_main-medium`}>Выход</p>


        <p className="text text_type_main-default text_color_inactive pt-20">В этом разделе вы можете изменить свои персональные данные</p>
    </section>
    )
}
export default ProfileNavigation;