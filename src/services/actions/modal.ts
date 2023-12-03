//Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
//Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.

import { GET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT } from "../constant/const";
import { TIngredient } from "../../utils/types";

export interface IGetViewedIngredientAction {
    readonly type: typeof GET_VIEWED_INGREDIENT;
    isOpen: true;
    currentIngredient: TIngredient[] | null;
}

export interface IRemoveViewedIngredientAction {
    readonly type: typeof REMOVE_VIEWED_INGREDIENT;
    currentIngredient: TIngredient[] | null;
    isOpen: false;
}


export type TModalActions = IGetViewedIngredientAction | IRemoveViewedIngredientAction;