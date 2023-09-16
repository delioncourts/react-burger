const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }
}

export const loadIngredients = () => {
  return fetch(BASE_URL).then((res) => {
    return checkResponse(res);
  });
};
