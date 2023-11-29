//Получение списка ингредиентов для конструктора бургера
//Добавить ингредиент, получить текущий ингредиент, убрать ингредиент, переместить ингредиент

import {
  ADD_INGREDIENT,
  GET_CURRENT_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../constant/const';

import { TIngredientFull } from '../../utils/types';

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  item: TIngredientFull
}

export interface IGetCurrentIngredient {
  readonly type: typeof GET_CURRENT_INGREDIENT
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly item: TIngredientFull
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TBurgerConstructor = IAddIngredient | IGetCurrentIngredient | IRemoveIngredient | IMoveIngredient;