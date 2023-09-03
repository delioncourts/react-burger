import React from "react";
import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ ingredient }) => {
    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
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
    )
}

export default IngredientDetails;