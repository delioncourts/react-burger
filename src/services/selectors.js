 //получение ингредиентов из стора 
export const AllIngredients = store => store.ingredients.ingredients;

//получаем текущий выбранный элемент из стора для модального окна
export const currentIngredientModal = store => store.modal.currentIngredient;