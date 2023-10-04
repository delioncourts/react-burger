const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }
}

 // принимает два аргумента: урл и объект опций, как и `fetch`
/*function request(url, options) {
  return fetch(url, options).then(checkResponse)
}*/

export const loadIngredients = () => {
  return fetch(BASE_URL).then((res) => {
    return checkResponse(res);
  });
};

export const createOrderRequest = (items) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: items.map((item) => item._id),
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};
