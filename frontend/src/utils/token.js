const TOKEN_KEY = "token";
const USER_KEY = "user";

/* =========================
   TOKEN
========================= */

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Unable to get token:", error);
    return null;
  }
};

export const saveToken = (token) => {
  try {
    if (!token) {
      console.warn("Attempted to save empty token.");
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Unable to save token:", error);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Unable to remove token:", error);
  }
};


/* =========================
   USER
========================= */

export const getUser = () => {
  try {
    const storedUser = localStorage.getItem(USER_KEY);

    // Nothing stored
    if (
      !storedUser ||
      storedUser === "undefined" ||
      storedUser === "null"
    ) {
      return null;
    }

    return JSON.parse(storedUser);

  } catch (error) {
    console.error("Invalid user data in localStorage.");

    // Remove corrupted data
    localStorage.removeItem(USER_KEY);

    return null;
  }
};

export const saveUser = (user) => {
  try {
    if (!user) {
      localStorage.removeItem(USER_KEY);
      return;
    }

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );

  } catch (error) {
    console.error("Unable to save user:", error);
  }
};

export const removeUser = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Unable to remove user:", error);
  }
};