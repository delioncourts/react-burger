import React from 'react';
import styles from './app.module.css';
import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { loadIngredients } from '../../utils/api';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const [ingredients, setIngredients] = useState([]);

    //загружаем ингредиенты
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
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients data={ingredients} />
                    <BurgerConstructor data={ingredients} />
                </DndProvider>
            </main>
        </>
    );
}

export default App;
