import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export const checkToken = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpirationTime = decodedToken.exp;

    return tokenExpirationTime > currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};
