import React from 'react';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
//import { loadIngredients } from '../../utils/api';
import { getIngregients } from '../../services/actions/burger-ingredients';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.burgerIngredients.ingredients);
    

    useEffect(() => {
        dispatch(getIngregients());
      }, [dispatch]);


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
    }, []);*/

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients data={ingredients} />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </>
    );
}

export default App;
