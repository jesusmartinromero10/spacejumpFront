import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "./client";
import storage from "../layout/utils/storage.js";

export const login = (credentials, isChecked) => {
  return client.post("/login", credentials).then((response) => {
    if (response?.status === 400) {
      throw response.error;
    }
    setAuthorizationHeader(response.jwt); //pone el token en la cabecera por defecto
    if (isChecked) {
      storage.set("auth", response.jwt); //guarda el token en el localStorage
    }
    return response.userId;
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("auth");
  });
};

export const rememberPassword = (credentials) => {
  return client.post("/password", credentials).then((response) => {
    if (response?.status === 400) {
      throw response.error;
    }
    return response;
  });
};

export const signUp = (user, headers) => {
  const signUp_URL = process.env.REACT_APP_API_SIGNUP_URL;
  return client.post(signUp_URL, user, headers);
};

export const deleteUser = (user, headers) => {
  const delete_URL = process.env.REACT_APP_API_DELETE_USER_URL;
  return client.post(delete_URL, user, headers);
};

export const getMe = (token) => {
  const me_URL = "/api/jwtWeb";
  const data = {
    token,
  };
  return client.post(me_URL, data);
};
