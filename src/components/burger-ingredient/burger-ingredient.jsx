import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { MOVE_INGREDIENT, REMOVE_INGREDIENT } from '../../services/actions/burger-constructor';

import styles from './burger-ingredient.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

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

    //открыть модалку 
    const navigate = useNavigate();
    const location = useLocation();

    const openModal = useCallback(() => {
        navigate(`/ingredients/${item._id}`, {
            state: { background: location }
        });
    }, [dispatch, item._id, navigate, location]);

    return (
        <li className={styles.list} ref={ref} onClick={openModal}>
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
    index: PropTypes.number,
    idtd: PropTypes.number
};


export default BurgerIngredient;