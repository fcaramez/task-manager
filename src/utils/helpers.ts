import Router from "next/router";

export const storeToken = (token: string | undefined) => {
  if (window.localStorage && token) {
    const prevToken = localStorage.getItem("authToken");
    !prevToken && localStorage.setItem("authToken", token);
  }
};

export const authenticateUser = (data: {
  username: string;
  email: string;
  authToken: string;
}) => {
  const { username, email, authToken } = data;
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
};

export const logout = () => {
  localStorage.clear();
  Router.push("/");
};
