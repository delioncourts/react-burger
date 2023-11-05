//Защищённые маршруты в приложении
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../loader/loader";

export const ProtectedRouteElement = ({ onlyUnAuth = false, children }) => {
    const location = useLocation();
    const [user, setUser] = useState('');
    const isAuthChecked = true;

    if (!isAuthChecked) {
        return <Loader />
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from} />

    }


    if (!onlyUnAuth && !user) {
        return <Navigate to={'/'} state={{ from: location }} />
    }

    return children;
}

ProtectedRouteElement.propTypes = {
    onlyUnAuth: PropTypes.bool,
    element: PropTypes.node.isRequired,
  };