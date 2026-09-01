import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import authService from "../services/authService";

import {
  getToken,
  saveToken,
  removeToken,
  getUser,
  saveUser,
  removeUser,
} from "../utils/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  /*
   * Authentication is determined by the token.
   *
   * We don't need a separate setIsAuthenticated state.
   */
  const isAuthenticated = Boolean(getToken());

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = getToken();

        if (!token) {
          setUser(null);
          return;
        }

        const storedUser = getUser();

        if (storedUser) {
          setUser(storedUser);
        } else {
          removeToken();
          removeUser();
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Auth initialization failed:",
          error
        );

        removeToken();
        removeUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const login = async (credentials) => {
    const response =
      await authService.login(credentials);

    console.log(
      "LOGIN API RESPONSE:",
      response.data
    );

    const authData =
      response.data?.data;

    if (!authData) {
      throw new Error(
        "Login succeeded but authentication information was not returned."
      );
    }

    const token = authData.token;

    const loggedInUser = {
      id: authData.id,
      name: authData.name,
      email: authData.email,
      role: authData.role,
    };

    if (!token) {
      throw new Error(
        "Login succeeded but token was not returned."
      );
    }

    if (!loggedInUser.email) {
      throw new Error(
        "Login succeeded but user information was not returned."
      );
    }

    saveToken(token);
    saveUser(loggedInUser);

    setUser(loggedInUser);

    console.log(
      "LOGGED IN USER:",
      loggedInUser
    );

    return loggedInUser;
  };

  const register = async (payload) => {
    return authService.register(payload);
  };

  const logout = () => {
    console.log("Logging out...");

    removeToken();
    removeUser();

    setUser(null);
  };
  const updateUser = (updatedData) => {
  const currentUser = getUser();

  const updatedUser = {
    ...currentUser,
    ...updatedData,
  };

  saveUser(updatedUser);
  setUser(updatedUser);
};

  const value = useMemo(
  () => ({
    user,
    loading,
    login,
    logout,
    updateUser,
    register,
    isAuthenticated,
  }),
  [
    user,
    loading,
    isAuthenticated,
  ]
);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default useAuth;