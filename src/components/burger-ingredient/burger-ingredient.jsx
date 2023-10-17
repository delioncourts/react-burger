import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { MOVE_INGREDIENT, REMOVE_INGREDIENT } from '../../services/actions/burger-constructor';

//элемент в burger constructor - начинки и соусы
const BurgerIngredient = ({ item, index, idtd }) => {
    const { name, price, image } = item;

    const dispatch = useDispatch();
    const ref = useRef(null)

    function handleDeleteIngredient(id) {
        dispatch({
            type: REMOVE_INGREDIENT,
            idtd: id
        })
    }

    const [{ opacity }, dragRef] = useDrag({
        type: 'sorting',
        item: { index },
        collect: (monitor) => {
            return {
                opacity: monitor.isDragging() ? .5 : 1
            }
        }
    })

    //сортировка ингредиентов 
    const [, dropRef] = useDrop({
        accept: 'sorting',
        hover(itemToPush, monitor) {
            const hoverIndex = index;
            const dragIndex = itemToPush.index;
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch({
                type: MOVE_INGREDIENT,
                dragIndex,
                hoverIndex
            });
            itemToPush.index = hoverIndex;
        }
    })

    dragRef(dropRef(ref));

    return (
        <li ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                extraClass="ml-1"
                handleClose={(() => handleDeleteIngredient(idtd))}
            />
        </li>
    )
}

BurgerIngredient.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.string, 
    idtd: PropTypes.number
};


export default BurgerIngredient;