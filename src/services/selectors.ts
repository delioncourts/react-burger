 //получение ингредиентов из стора 
export const AllIngredients = (store: { ingredients: { ingredients: any; }; })=> store.ingredients.ingredients;

//получаем текущий выбранный элемент из стора для модального окна
export const currentIngredientModal = (store: { modal: { currentIngredient: any; }; }) => store.modal.currentIngredient;

//булочки и другие ингридиенты в корзинке 
export const bunsInCart = (store: { cart: { buns: any; }; }) => store.cart.buns;
export const otherInCart = (store: { cart: { otherItems: any; }; }) => store.cart.otherItems;

//номер заказа
export const receiveOrderNumber = (store: { order: { number: any; }; }) => store.order.number;

//авторизация
export const loggedIn = (store: { user: { isLoggedIn: any; }; }) => store.user.isLoggedIn;
export const userNameData = (store: { user: { name: any; }; }) => store.user.name;
export const userEmailData = (store: { user: { email: any; }; }) => store.user.email;
export const userPasswordData = (store: { user: { password: any; }; }) => store.user.password;
export const passwordForgot = (store: { user: { isPasswordReset: any; }; }) => store.user.isPasswordReset;