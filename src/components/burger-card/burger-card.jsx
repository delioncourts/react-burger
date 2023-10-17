import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";

import styles from './burger-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { bunsInCart, otherInCart } from '../../services/selectors';

const BurgerCard = ({ card, onIngredientClick }) => {
    const { name, image, price } = card;

    //булочки и начинки с соусами
    const buns = useSelector(bunsInCart);
    const other = useSelector(otherInCart);

    //объединяем массив объектов булочек и начинок и соусов в один массив методом concat
    const ingredientsInConstructor = other.concat(buns, buns);

    //используем цикл for..of, чтобы пройти обойти каждый элемент в массиве ingredientsInConstructor.
    //сравниваем id элемента и id card, если они равны, то добавляем 1
    const countingItems = useMemo(() => {
        let count = 0;
        for (let item of ingredientsInConstructor) {
            if (item?._id === card._id) {
                count++;
            }
        }
        return count;
    }, [ingredientsInConstructor]);

    function handleIngredientClick() {
        onIngredientClick();
    }

    //перенос ингредиента
    const [{ opacity }, dragRef] = useDrag({
        type: "ingredients",
        item: card,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? .5 : 1
        })
    });

    return (
        <li ref={dragRef} className={styles.card} onClick={handleIngredientClick} style={{ opacity }}>
            <Counter count={countingItems} size="default" extraClass="m-1" />
            <img className={styles.img} src={image} alt={name} />
            <div className={`${styles.container} pt-1`}>
                <p className="text text_type_main-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pt-1">{name}</p>
        </li>
    )
}

BurgerCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerCard;