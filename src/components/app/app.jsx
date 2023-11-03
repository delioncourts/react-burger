import React from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';

import MainPage from '../../pages/main-page/main-page';
import { NotFound404 } from '../../pages/not-found-404/not-found-404';

function App() {

    return (
        <>
            <AppHeader />

            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </>
    );
}

export default App;
