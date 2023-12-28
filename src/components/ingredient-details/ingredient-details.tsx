import React from "react";

//import { useSelector } from 'react-redux';
import { useSelector } from '../../index';

import { useParams } from "react-router-dom";
import { AllIngredients } from "../../services/selectors";
import styles from "./ingredient-details.module.css";
import Loader from "../loader/loader";

const IngredientDetails = () => {
    const { id } = useParams<{ id: string }>();

    const ingredients = useSelector(AllIngredients);
    const ingredient = ingredients.find((ingredient: { _id: string | undefined; }) => ingredient._id === id);

    if (!ingredient) {
        return <Loader />
     }

    return (
        ingredient ? <div className={styles.container}>
            <div className={styles.content}>
                <img src={ingredient.image_large} alt={ingredient.name} />
                <p className="text text_type_main-medium">{ingredient.name}</p>

                <ul className={styles.list}>
                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive pt-2">{ingredient.calories}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive pt-2">{ingredient.proteins}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive pt-2">{ingredient.fat}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive pt-2">{ingredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </div>
            : null
    )
}

export default IngredientDetails;