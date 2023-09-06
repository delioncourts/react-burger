import React from "react";
import PropTypes from 'prop-types';

import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ data, image_large, name, calories, fat, proteins, carbohydrates }) => {
    return (
        <div className={styles.container}>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <div className={styles.container}>
            <div className={styles.content}>
                <img src={image_large} alt={name} />
                <p className="text text_type_main-medium">{name}</p>

                <ul className={styles.list}>
                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive pt-2">{calories}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive pt-2">{proteins}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive pt-2">{fat}</p>
                    </li>

                    <li className={styles.itemslist}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive pt-2">{carbohydrates}</p>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}

export default IngredientDetails;