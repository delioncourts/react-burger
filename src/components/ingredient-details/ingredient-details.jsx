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
                        <p className="text text_type_main-default">Калории,ккал</p>
                        <p className="text text_type_digits-default pt-2">{ingredient.calories}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default">Белки, г</p>
                        <p className="text text_type_digits-default pt-2">{ingredient.proteins}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default">Жиры, г</p>
                        <p className="text text_type_digits-default pt-2">{ingredient.fat}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default">Углеводы, г</p>
                        <p className="text text_type_digits-default pt-2">{ingredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default IngredientDetails;