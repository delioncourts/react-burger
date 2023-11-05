//Защищённые маршруты в приложении
//Доступно только для не авторизованных пользователей
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../loader/loader";
import { useSelector } from "react-redux";
import { loggedIn } from '../../services/selectors';

export const ProtectedRouteElementNotAuth = ({ element }) => {
    /*const location = useLocation();
    const [user, setUser] = useState('');
    const isAuthChecked = true;
    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from} />

    }
    if (!onlyUnAuth && !user) {
        return <Navigate to={'/'} state={{ from: location }} />
    }

    return children;*/

    const isLoggedIn = useSelector(loggedIn);

    if (!isLoggedIn) {
        return <Loader />
    }

    if (isLoggedIn) {
        return element;
    } else {
        <Navigate to={'/login'} />
    }
}

ProtectedRouteElementNotAuth.propTypes = {

    element: PropTypes.node.isRequired,
};