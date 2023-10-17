//объявляем базовый урл
export const BASE_URL = 'https://norma.nomoreparties.space/api/';

// создаем функцию проверки ответа на `ok`
// добавляем проверку на ошибку, чтобы она попала в `catch`
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
// добавляем проверку на ошибку, чтобы она попала в `catch`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
const request = (endpoint, options) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options)
  .then(checkResponse)
  .then(checkSuccess);
};

//загрузка списка ингредиентов
export const loadIngredients = () => request('ingredients');

//создание заказа
export const createOrderRequest = (items) => {
  return fetch(`${BASE_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      ingredients: items.map((item) => item._id),
    }),
  })
  .then((res) => {
    return checkResponse(res);
  });
};


//создание заказа c request 
/*export const createOrderRequest = (items) => request('orders), {
   method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      ingredients: items.map((item) => item._id),
    }),
}*/