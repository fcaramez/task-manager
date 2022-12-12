export const storeToken = (token: string | undefined) => {
  if (window.localStorage && token) {
    const prevToken = localStorage.getItem("authToken");
    !prevToken && localStorage.setItem("authToken", token);
  }
};

export const authenticateUser = (data: {
  username: string | undefined;
  email: string | undefined;
  authToken: string | undefined;
}) => {
  const { username, email, authToken } = data;
  if (window.localStorage && authToken && username && email) {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
  }
};
