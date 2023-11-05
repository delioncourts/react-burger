//Защищённые маршруты в приложении
//Доступно только для авторизованных пользователей

import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../loader/loader";
import { useSelector } from "react-redux";
import { loggedIn } from '../../services/selectors';

export const ProtectedRouteElementAuth = ({ element }) => {
    const isLoggedIn = useSelector(loggedIn);

    if (isLoggedIn) {
        return (
            <Navigate
                to={'/'}
            />
        );
    } else {
        return (element);
    }
    
}

ProtectedRouteElementAuth.propTypes = {
    element: PropTypes.node.isRequired,
};