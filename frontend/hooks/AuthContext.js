import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const existingUser = await AsyncStorage.getItem("userToken");

      if (existingUser) {
        setUser(existingUser);
      }
    };

    loadUser();
  }, []);

  const signIn = async (token) => {
    await AsyncStorage.setItem("userToken", JSON.stringify(token));
    setUser(token);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("userToken");
    setUser(null);
  };

  const getUserData = async () => {
    try {
      console.log("call");
      const tokenString = await AsyncStorage.getItem("userToken");
      // if (tokenString !== null) {
      const token = await JSON.parse(tokenString);
      return token;
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, getUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};
