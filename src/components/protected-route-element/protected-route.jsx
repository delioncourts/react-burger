//универсальный защищенный роут
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { loggedIn } from "../../services/selectors";
import PropTypes from 'prop-types';
import { useState } from "react";
import Loader from "../loader/loader";

export default function ProtectedRoute({ onlyUnAuth = false, element }) {
    const isLoggedIn = useSelector(loggedIn);

    const location = useLocation();
    const from = location.state?.from || '/';

    const [isLoading, setIsLoading] = useState(true);

    // Пользователь авторизован + не нужна авторизация => отправляем на предыдущую страницу
    if (onlyUnAuth && isLoggedIn) {
        return <Navigate to={from} />;
    }

    // Пользователь неавторизован + нужна авторизация => отправляем на станицу логин
    if (!onlyUnAuth && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    
    return element;
}

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
    onlyUnAuth: PropTypes.bool
  };