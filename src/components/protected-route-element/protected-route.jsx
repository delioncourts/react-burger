//универсальный защищенный роут
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { loggedIn } from "../../services/selectors";

export default function ProtectedRoute({ onlyUnAuth = false, children }) {
    const isLoggedIn = useSelector(loggedIn);

    const location = useLocation();
    const from = location.state?.from || '/';

    // Пользователь авторизован + не нужна авторизация => отправляем на предыдущую страницу
    if (onlyUnAuth && isLoggedIn) {
        return <Navigate to={from} />;
    }

    // Пользователь неавторизован + нужна авторизация => отправляем на станицу логин
    if (!onlyUnAuth && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    
    return children;
}