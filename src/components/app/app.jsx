import React from 'react';
//import { useEffect, useState } from 'react';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

    //загружаем ингредиенты
    //const [ingredients, setIngredients] = useState([]);
    /*useEffect(() => {
        loadIngredients()
            .then(res => {
                setIngredients(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    
    <BurgerConstructor />
    */

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </>
    );
}

export default App;
