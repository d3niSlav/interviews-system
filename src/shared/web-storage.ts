export const JWT_TOKEN_COOKIE_NAME = process.env.REACT_APP_JWT_COOKIE_NAME || '';

export const getCookie = (cookieName: string): string => {
  if (typeof document === 'undefined') {
    return '';
  }

  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(';');

  for (let index = 0; index < cookiesArray.length; index += 1) {
    let currentCookie = cookiesArray[index];
    while (currentCookie.charAt(0) === ' ') {
      currentCookie = currentCookie.substring(1);
    }

    if (currentCookie.indexOf(name) === 0) {
      return currentCookie.substring(name.length, currentCookie.length);
    }
  }

  return '';
};

export const setCookie = (name: string, value: string): void => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=${value};path=/`;
  }
};

export const deleteCookie = (cookieName: string): void => {
  if (typeof document !== 'undefined') {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
};

export const getJWTToken = (): string => {
  const cookieToken = getCookie(JWT_TOKEN_COOKIE_NAME);
  return cookieToken || '';
};
