import { useMemo } from 'react';
import { useDrag } from "react-dnd";

import styles from './burger-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { bunsInCart, otherInCart } from '../../services/selectors';
import { Link, useLocation } from 'react-router-dom';

import { FC } from 'react';
import { TIngredient } from '../../utils/types';

interface IBurgerCard {
    card: TIngredient;
    name: string;
    price: number;
    image: string;
    onIngredientClick: () => void;
}
const BurgerCard: FC<IBurgerCard> = ({ card }) => {
    const { name, image, price } = card;
    const location = useLocation();

    //булочки и начинки с соусами
    const buns: TIngredient = useSelector(bunsInCart);
    const other: TIngredient[] = useSelector(otherInCart);

    //объединяем массив объектов булочек и начинок и соусов в один массив методом concat
    const ingredientsInConstructor: TIngredient[] = other.concat(buns, buns);

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


    //перенос ингредиента
    const [{ opacity }, dragRef] = useDrag({
        type: "ingredients",
        item: card,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? .5 : 1
        })
    });

    return (
        <li ref={dragRef}>
        <Link className={styles.card} to={`/ingredients/${card._id}`} style={{ opacity }} state={{ background: location, card: card }}>
            <Counter count={countingItems} size="default" extraClass="m-1" />
            <img className={styles.img} src={image} alt={name} />
            <div className={`${styles.container} pt-1`}>
                <p className="text text_type_main-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pt-1">{name}</p>
        </Link>
        </li>
    )
}

export default BurgerCard;