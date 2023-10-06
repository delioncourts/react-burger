import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerCard from '../burger-card/burger-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Loader from '../loader/loader'

import { getIngregients } from '../../services/actions/burger-ingredients';


const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bun');

    const [openModal, setOpenModal] = useState(false);
    const [activeIngredient, setActiveIngredient] = useState(null);

    //if (!data) {
    // return <Loader />;
    // }

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

    const onClickTabElement = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }

    function handleIngredientClick(item) {
        console.log(item);
        setActiveIngredient(item);
        setOpenModal(true);
    }

    function handleCloseModal() {
        setActiveIngredient({});
        setOpenModal(false);
    }

    return (
        <section id="order-line" className={styles.section}>
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
                <ul className={`${styles.list} pr-3`}>
                    {buns.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} __v={item.__V} onIngredientClick={() => handleIngredientClick(item)} />
                    ))}
                </ul>
                <h2 id="sauce" className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
                <ul className={`${styles.list} pr-3`}>
                    {sauces.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} __v={item.__V} onIngredientClick={() => handleIngredientClick(item)} />
                    ))}
                </ul>
                <h2 id="main" className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
                <ul className={`${styles.list} pr-3`}>
                    {mains.map((item) => (
                        <BurgerCard card={item} name={item.name} price={item.price} image={item.image} key={item._id} __v={item.__V} onIngredientClick={() => handleIngredientClick(item)} />
                    ))}
                </ul>

                {openModal && (
                    <Modal title={"Детали ингредиента"} onCloseModal={handleCloseModal}>
                        <IngredientDetails data={activeIngredient} />
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