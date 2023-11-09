//import { Link } from 'react-router-dom';
import styles from "./ingredient-page.module.css";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export const IngredientPage = () => {
    return (
        <main className={styles.main}>
            <IngredientDetails/>
        </main>
    );
}; 