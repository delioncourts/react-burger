 //получение ингредиентов из стора 
export const AllIngredients = store => store.ingredients.ingredients;

//получаем текущий выбранный элемент из стора для модального окна
export const currentIngredientModal = store => store.modal.currentIngredient;

//булочки и другие ингридиенты в корзинке 
export const bunsInCart = store => store.cart.buns;
export const otherInCart = store => store.cart.otherItems;

//номер заказа
export const receiveOrderNumber = store => store.order.number;

//авторизация
