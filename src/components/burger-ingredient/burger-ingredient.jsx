import { useDispatch } from 'react-redux';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerIngredient = ({ name, price, image, item, index }) => {
    const dispatch = useDispatch();

    return (
        <li>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                extraClass="ml-1"
            />
        </li>
    )
}

export default BurgerIngredient;