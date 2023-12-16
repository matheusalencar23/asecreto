import * as date from "../utils/date";

export const validatePassword = (password: string): boolean => {
  const currentPassword = date.getToday().split("/").join("");
  return currentPassword === password;
};

export const createToken = () => {
  const currentPassword = date.getToday().split("/").join("");
  return `${process.env.DEFAULT_TOKEN}_${currentPassword}`;
};

export const validateToken = (token: string): boolean => {
  const currentToken = createToken();
  return token === currentToken;
};
