const TOKEN_NAME = 'user-token';
export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(TOKEN_NAME);
  return token ?? '';
};

export const setToken = (token: Token): void => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_NAME);
};
