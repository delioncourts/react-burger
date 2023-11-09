import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

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

import { getUserInfo } from '../../services/actions/auth';
import { useEffect } from 'react';

import ProtectedRoute from '../protected-route-element/protected-route';

import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    const background = location.state && location.state.background;

    const handleClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);


    return (
        <>
            <AppHeader />

            <Routes location={background || location}>
                <Route path="/" element={<MainPage />} />
                <Route path="*" element={<NotFound404 />} />

                {/* доступно для не авторизованных пользователей*/}
                <Route path="/login" element={<ProtectedRoute onlyUnAuth element={<Login />} />} />
                <Route path="/register" element={<ProtectedRoute onlyUnAuth element={<Register />} />} />
                <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />} />
                <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />} />

                {/* доступно для авторизованных пользователей */}
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />

                            {/* Ингредиент*/}
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            </Routes>

           
            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal title={"Детали ингредиента"} handleClose={handleClose}>
                            <IngredientDetails />
                        </Modal>
                    }
                    />
                </Routes>
            )}


        </>
    );
}

export default App;
