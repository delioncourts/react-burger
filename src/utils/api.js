import { getCookie, setCookie } from './cookie'; //объявляем базовый урл
export const BASE_URL = 'https://norma.nomoreparties.space/api/';

//получаем данные о пользователе
export const USER_INFO_URL = 'https://norma.nomoreparties.space/api/auth/user';

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

//проверяем что токен не истек и если истек, то тогда мы его обновляем
const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      console.log('jwt expired');
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

//обновляем токен
export const refreshToken = () =>
  request('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });

//загрузка списка ингредиентов
export const loadIngredients = async () => {
  return await request('ingredients');
};

//создание заказа
export const createOrderRequest = async (items) => {
  return await request('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      ingredients: items.map((item) => item._id),
    }),
  });
};

//регистрация
export const registerRequest = (name, email, password) =>
  request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ name, email, password }),
  });

//авторизация = login
export const authorizeRequest = async (email, password) => {
  return await request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  });
};

//восстановление пароля по имейлу
export const forgotPasswordRequest = async (email) =>{
 return await request('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(email),
  });}

//сбросить пароль
export const resetPasswordRequest = async (password, token) =>{
  return await request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ password, token }),
  });}

//выйти из профиля
export const logoutRequest = async () => {
  return await request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });
};

//получить данные пользователя
export const getUserInfoRequest = () => {
  return fetchWithRefresh(USER_INFO_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': localStorage.getItem('accessToken'),
    },
  });
};

//обновить данные пользователя
export const updateUserInfoRequest = async (email, password, name) => {
  return await request(USER_INFO_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({ email, password, name }),
  });
};
