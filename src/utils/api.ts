import { TIngredient, TIngredientFull } from './types';
//объявляем базовый урл
export const BASE_URL = 'https://norma.nomoreparties.space/api/';

//получаем данные о пользователе
export const USER_INFO_URL = 'https://norma.nomoreparties.space/api/auth/user';

type TServerResponse<T> = {
  success: boolean
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>

interface IBaseResponse {
  success: boolean;
}

interface TIngredietnsRequest {
  status: number;
  data: TIngredient[];
  success: boolean;
}

// создаем функцию проверки ответа на `ok`
// добавляем проверку на ошибку, чтобы она попала в `catch`
const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
// добавляем проверку на ошибку, чтобы она попала в `catch`
const checkSuccess = <T extends IBaseResponse>(res: T): Promise<T> => {
  if (res?.success) {
    return Promise.resolve(res)
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
const request = <T extends IBaseResponse>(endpoint: string, options: RequestInit) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options).then(res => checkResponse<T>(res));
};

//проверяем что токен не истек и если истек, то тогда мы его обновляем
const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err: any) {
    if ((err as { message: string }).message === 'jwt expired') {
      console.log('jwt expired');
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      //options.headers.authorization = refreshData.accessToken;
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken
      }
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const refreshToken = (): Promise<TRefreshResponse> => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then((res) => checkResponse<TRefreshResponse>(res))
}

//загрузка списка ингредиентов
export const loadIngredients = async () => {
  return await request<TIngredietnsRequest>('ingredients', {});
};

//создание заказа
export const createOrderRequest = async (items: TIngredient[]) => {
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
export const registerRequest = (name?: string, email?: string, password?: string) =>
  request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ name, email, password }),
  });

//авторизация = login
export const authorizeRequest = async (email?: string, password?: string) => {
  return await request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  });
};

//восстановление пароля по имейлу
export const forgotPasswordRequest = async (email?: string) => {
  return await request('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email }),
  });
};

//сбросить пароль
export const resetPasswordRequest = async (password?: string, token?: string) => {
  return await request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ password, token }),
  });
};

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

export type TUser = {
  email: string;
  name: string;
}

type TUserResponse = TServerResponse<{ user: TUser }>;

//получить данные пользователя
export const getUserInfoRequest = () => {
  return fetchWithRefresh<TUserResponse>(USER_INFO_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
  });
};

//обновить данные пользователя
export const updateUserInfoRequest = async (email?: string, password?: string, name?: string) => {
  return await request(USER_INFO_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
    body: JSON.stringify({ email, password, name }),
  });
};
