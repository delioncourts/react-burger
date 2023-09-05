import React from 'react';
import styles from './app.module.css';
import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { loadIngredients } from '../../utils/api';

function App() {
    const [ingredients, setIngredients] = useState([]);

    //загружаем ингридиенты
    useEffect(() => {
        loadIngredients()
            .then(res => {
                setIngredients(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients data={ingredients} />
                <BurgerConstructor data={ingredients} />
            </main>
        </>
    );
}

export default App;
