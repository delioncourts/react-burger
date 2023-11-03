import React from 'react';
import { Routes, Route } from 'react-router-dom';

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

function App() {

    return (
        <>
            <AppHeader />

            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ingredients/:id" element={<IngredientPage />} />

                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </>
    );
}

export default App;
