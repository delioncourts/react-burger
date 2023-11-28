import React from 'react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerCard from '../burger-card/burger-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Loader from '../loader/loader';

import { getIngregients } from '../../services/actions/burger-ingredients';
import { AllIngredients, currentIngredientModal } from '../../services/selectors';
import { TIngredient } from '../../utils/types';

import { GET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT } from '../../services/constant/const';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState<string>('bun');

  //получение ингредиентов из стора
  const ingredients = useSelector(AllIngredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getIngregients());
  }, [dispatch]);

  const [buns, sauces, mains] = useMemo<TIngredient[][]>(() => [
      ingredients.filter((item: { type: string; }) => item.type === 'bun'),
      ingredients.filter((item: { type: string; }) => item.type === 'sauce'),
      ingredients.filter((item: { type: string; }) => item.type === 'main')
    ]
    , [ingredients])


  //из предыдущего спринта - плавный скролл до раздела по клику по табу
  //в этом спринте, к сожалению, сломался и не знаю как починить :(
  //скролл приисходит, но черточка только по второму клику доезжает до активного таба
  const onClickTabElement = (tab: string) => {
    setCurrent(tab);
    const element = document.getElementById(tab) as HTMLElement;
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  //При помощи observer меняется таб при прокрутке
  const containerRef = useRef<HTMLDivElement>(null);
  const [bunsRef, bunsInView] = useInView({
    threshold: 0,
    root: containerRef.current,
  });

  const [saucesRef, saucesInView] = useInView({
    threshold: 0,
    root: containerRef.current,
  });

  const [mainsRef, mainsInView] = useInView({
    threshold: 0,
    root: containerRef.current,
  });

  useEffect(() => {
    bunsInView ? setCurrent('bun') : saucesInView ? setCurrent('sauce') : setCurrent('main');
  }, [bunsInView, mainsInView, saucesInView]);

  function handleIngredientClick(item: TIngredient) {
    dispatch<any>({
      type: GET_VIEWED_INGREDIENT,
      currentIngredient: item,
    });
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
        <h2 id="bun" className="text text_type_main-medium pt-10 pb-6">
          Булки
        </h2>
        <ul ref={bunsRef} className={`${styles.list} pr-3`}>
          {buns.map((item) => (
            <BurgerCard
              card={item}
              name={item.name}
              price={item.price}
              image={item.image}
              key={item._id}
              onIngredientClick={() => handleIngredientClick(item)}
            />
          ))}
        </ul>
        <h2 id="sauce" className="text text_type_main-medium pt-10 pb-6">
          Соусы
        </h2>
        <ul ref={saucesRef} className={`${styles.list} pr-3`}>
          {sauces.map((item) => (
            <BurgerCard
              card={item}
              name={item.name}
              price={item.price}
              image={item.image}
              key={item._id}
              onIngredientClick={() => handleIngredientClick(item)}
            />
          ))}
        </ul>
        <h2 id="main" className="text text_type_main-medium pt-10 pb-6">
          Начинки
        </h2>
        <ul ref={mainsRef} className={`${styles.list} pr-3`}>
          {mains.map((item) => (
            <BurgerCard
              card={item}
              name={item.name}
              price={item.price}
              image={item.image}
              key={item._id}
              onIngredientClick={() => handleIngredientClick(item)}
            />
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
