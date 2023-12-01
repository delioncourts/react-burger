//Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
//Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.

import { GET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT } from "../constant/const";
import { TIngredient } from "../../utils/types";

export interface IGetViewedIngredientAction {
    readonly type: typeof GET_VIEWED_INGREDIENT;
}

export interface IRemoveViewedIngredientAction {
    readonly type: typeof REMOVE_VIEWED_INGREDIENT;
    readonly ingredient: TIngredient[];
}


export type TModalActions = IGetViewedIngredientAction | IRemoveViewedIngredientAction;