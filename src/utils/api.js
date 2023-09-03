const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

function checkResponse(res) {   
    if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка: ${res.status}`);
}

function loadIngredients () {
    return fetch(BASE_URL)
    .then(checkResponse)
}

export default loadIngredients;
