//Получение списка ингредиентов для конструктора бургера
//Добавить ингредиент, получить текущий ингредиент, убрать ингредиент, переместить ингредиент

import {
  ADD_INGREDIENT,
  GET_CURRENT_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../constant/const';

import { TIngredient } from '../../utils/types';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  item: TIngredient;
}

export interface IGetCurrentIngredientAction {
  readonly type: typeof GET_CURRENT_INGREDIENT
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly item: TIngredient;
  idtd: string;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TBurgerConstructorActions = IAddIngredientAction | IGetCurrentIngredientAction | IRemoveIngredientAction | IMoveIngredientAction;