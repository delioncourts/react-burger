//cохраняем токен в куки: нормализует работу с временем жизни куки и обрабатывает те случаи, когда время жизни куки не было передано

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  // Set it expire in 7 days
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

//получаем нужную куки
export function getCookie(name: string) {
 return new RegExp(`${name}=([^;]+);`).exec(document.cookie)?.[1];
}

//удаляем
export function deleteCookie(name: string) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
