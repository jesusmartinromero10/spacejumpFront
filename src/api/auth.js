import client from './client';

export const signUp = (user,headers) => {
  const signUp_URL = process.env.REACT_APP_API_SIGNUP_URL;
  console.log(user)
  return client.post(signUp_URL, user, headers);
};

