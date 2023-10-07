import React from 'react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerCard from '../burger-card/burger-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Loader from '../loader/loader'

import { getIngregients } from '../../services/actions/burger-ingredients';
import { GET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT } from '../../services/actions/modal';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bun');

    //модальное окно
    const [openModal, setOpenModal] = useState(false);
    const [activeIngredient, setActiveIngredient] = useState(null);

    //if (!data) {
    // return <Loader />;
    // }

    //все ингредиенты из стора 
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngregients());
    }, [dispatch]);

    const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
    const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

    //const buns = ingredients.filter(item => item.type === 'bun');
    // const sauces = ingredients.filter(item => item.type === 'sauce');
    // const mains = ingredients.filter(item => item.type === 'main');

    //const buns = data.filter(item => item.type === 'bun');
    //const sauces = data.filter(item => item.type === 'sauce');
    //const mains = data.filter(item => item.type === 'main');


    //При помощи observer меняется таб при прокрутке 
    const containerRef = useRef(null);
    const [bunsRef, bunsInView] = useInView({
        threshold: 0,
        root: containerRef.current
    });

    const [saucesRef, saucesInView] = useInView({
        threshold: 0,
        root: containerRef.current
    });

    const [mainsRef, mainsInView] = useInView({
        threshold: 0,
        root: containerRef.current
    });

    useEffect(() => {
        bunsInView
            ? setCurrent('bun')
            : saucesInView
                ? setCurrent('sauce')
                : setCurrent('main')
    }, [bunsInView, mainsInView, saucesInView])

    const onClickTabElement = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }

    //получаем текущий выбранный элемент из стора для модального окна
    const currentIngr = useSelector(store => store.modal.currentIngredient);

    function handleIngredientClick(item) {
        console.log(item);
        //  setActiveIngredient(item);
        setOpenModal(true);

        dispatch({
            type: GET_VIEWED_INGREDIENT,
            currentIngredient: item
        })
    }

    function handleCloseModal() {
        dispatch({
            type: REMOVE_VIEWED_INGREDIENT
        })
        //setActiveIngredient({});
        setOpenModal(false);
    }

    return (
        <section ref={containerRef} id="order-line" className={styles.section}>
            <h1 className="text text_type_main-medium pb-5 pt-10">Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={current === 'bun'} onClick={onClickTabElement}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={onClickTabElement}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={onClickTabElement}>
                    Начинки
                </Tab>
            </div>

            <ul className={`${styles.ingredients} custom-scroll`}>

                <h2 id="bun" className="text text_type_main-medium pt-10 pb-6">Булки</h2>
                <ul ref={bunsRef} className={`${styles.list} pr-3`}>
                    {buns.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} __v={item.__V} onIngredientClick={() => handleIngredientClick(item)} />
                    ))}
                </ul>
                <h2 id="sauce" className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
                <ul ref={saucesRef} className={`${styles.list} pr-3`}>
                    {sauces.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} __v={item.__V} onIngredientClick={() => handleIngredientClick(item)} />
                    ))}
                </ul>
                <h2 id="main" className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
                <ul ref={mainsRef} className={`${styles.list} pr-3`}>
                    {mains.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} __v={item.__V} onIngredientClick={() => handleIngredientClick(item)} />
                    ))}
                </ul>

                {currentIngr && (
                    <Modal title={"Детали ингредиента"} onCloseModal={handleCloseModal}>
                        <IngredientDetails item={currentIngr} />
                    </Modal>
                )}
            </ul>
        </section>
    )
}

/*BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired
}*/

export default BurgerIngredients;