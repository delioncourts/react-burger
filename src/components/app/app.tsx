import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from '../../index';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';

import MainPage from '../../pages/main-page/main-page';
import { NotFound404 } from '../../pages/not-found-404/not-found-404';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { Profile } from '../../pages/profile/profile';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import Modal from '../modal/modal';
import { Feed } from '../../pages/feed/feed';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders';

import { getUserInfo } from '../../services/actions/auth';
import { useEffect } from 'react';

import ProtectedRoute from '../protected-route-element/protected-route';

import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngregients } from '../../services/actions/burger-ingredients';
import { Location } from 'react-router-dom';
import OrderModalDetails from '../order-modal-details/order-modal-details';
function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const locationState = location.state as { background: Location };
    const background = locationState && locationState.background;

    const handleClose = () => {
        navigate(-1);
    };

    //отключить типизацию можно также правилом 
    useEffect(() => {
        dispatch<any>(getUserInfo());
    }, [dispatch]);


    //получаем все ингредиенты для отображения на странице ингредиента 
    useEffect(() => {
        dispatch<any>(getIngregients());
    }, [dispatch]);


    return (
        <>
            <AppHeader />

            <Routes location={background || location}>
                <Route path="/" element={<MainPage />} />
                <Route path="*" element={<NotFound404 />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/feed/:id" element={<OrderModalDetails />} />
                
                {/* доступно для не авторизованных пользователей*/}
                <Route path="/login" element={<ProtectedRoute onlyUnAuth element={<Login />} />} />
                <Route path="/register" element={<ProtectedRoute onlyUnAuth element={<Register />} />} />
                <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />} />
                <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />} />

                {/* доступно для авторизованных пользователей */}
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/profile/orders" element={<ProtectedRoute element={<ProfileOrders />} />} />
                <Route path="/profile/orders/:id" element={<ProtectedRoute element={<OrderModalDetails  />} />} />

                {/* Ингредиент*/}
                <Route path="/ingredients/:id" element={<IngredientPage />} />
            </Routes>


            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal title={"Детали ингредиента"} onCloseModal={handleClose}>
                            <IngredientDetails />
                        </Modal>
                    }
                    />
                    <Route path="/profile/orders/:id" element={<ProtectedRoute element={
                    <Modal title={"Детали заказа"} onCloseModal={handleClose}>
                        <OrderModalDetails />
                    </Modal>} />
                    }
                    />
                    <Route path="/feed/:id" element={
                        <Modal title={"Детали заказа"} onCloseModal={handleClose}>
                            <OrderModalDetails />
                        </Modal>
                    }
                    />
                </Routes>
            )}


        </>
    );
}

export default App;
