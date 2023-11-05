import { getCookie } from './cookie';

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
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess);
};

//загрузка списка ингредиентов
export const loadIngredients = () => request('ingredients');

//создание заказа
export const createOrderRequest = (items) =>
  request('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      ingredients: items.map((item) => item._id),
    }),
  });

//регистрация
export const register = (name, email, password) =>
  request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ name, email, password }),
  });

//авторизация = login
export const authorize = (email, password) =>
  request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  });

//восстановление пароля по имейлу
export const forgotPassword = (email) =>
  request('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email }),
  });

//сбросить пароль
export const resetPassword = (password, token) =>
  request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ password, token }),
  });

//выйти из профиля
export const logout = (token) =>
  request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify({ token }),
  });

//получить данные пользователя
export const getUserInfo = (accessToken) =>
  request('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken,
    },
  });

//обновить данные пользователя
export const updateUserInfo = (accessToken, email, password, name) =>
  request('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken,
    },
    body: JSON.stringify({ email, password, name }),
  });

//обновить токен
export const updateToken = (refreshToken) =>
  request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: refreshToken }),
  });
