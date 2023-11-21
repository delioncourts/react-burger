import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import React, { FC, RefObject, useRef } from 'react';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { MOVE_INGREDIENT, REMOVE_INGREDIENT } from '../../services/actions/burger-constructor';

import styles from './burger-ingredient.module.css'

import { TIngredient } from '../../utils/types';
import type { XYCoord } from 'dnd-core'
interface IBurgerIngredient {
    item: TIngredient;
    id?: string;
    key: string;
    index: number;
    idtd: string;
  }

  type TDndIngredient =  {
    name: string; 
    price: number; 
    image: string; 
    idtd: string; 
    index: number;
}
//элемент в burger constructor - начинки и соусы
const BurgerIngredient: FC< IBurgerIngredient> = ({ item, index, idtd }) => {
    const { name, price, image } = item;

    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);

    function handleDeleteIngredient(id:string) {
        dispatch({
            type: REMOVE_INGREDIENT,
            idtd: id
        })
    }

    const [{ opacity }, dragRef] = useDrag({
        type: 'sorting',
        item: { index },
        collect: (monitor: any) => {
            return {
                opacity: monitor.isDragging() ? .5 : 1
            }
        }
    })

    //сортировка ингредиентов 
    const [, dropRef] = useDrop({
        accept: 'sorting',
        hover(itemToPush: TDndIngredient, monitor) {
            const hoverIndex = index;
            const dragIndex = itemToPush.index;
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect!.bottom - hoverBoundingRect!.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect!.top;

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
        <li className={styles.list} ref={ref}>
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


export default BurgerIngredient;