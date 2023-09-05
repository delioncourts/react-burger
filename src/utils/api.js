const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const loadIngredients = () => {
  return fetch(BASE_URL).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    }
  });
};
