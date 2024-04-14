import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../config/apiConfig";
import { useNavigate } from "react-router-dom"; // Add this import at the top

// Create a context
export const ApiContext = createContext();

export function apiHelper() {
  return useContext(ApiContext);
}

// Provider component
export const ApiProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiData, setApiData] = useState(null); // State to store user data
  const [navData, setNavData] = useState(null);

  const BASE_URL = "https://";


  const fetchNav = async () => {

    if (navData) {
      return null;
    }

    axios
      .get(`${BASE_URL}/${ENDPOINTS.NAV}`
      )
      .then((response) => {
        setNavData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching navigation data", error);
        
      });
  };
  //FETCH DATA - DOESNT NEED AUTHENTICATION TO ACCESS PAGE - DATA WILL BE MISSING
  const fetchOptional = async (url) => {
    try {


      console.log(`trying: ${url}`);
      //PASSPORT JWS WILL THROW AN ERROR IF THE JWT IS EMPTY (SO I NEED TO)
      let tokenVal = localStorage.getItem("token")?.trim();

      if (!tokenVal || tokenVal === "Bearer") {
        console.log("Token is empty or invalid. Using default token.");
        tokenVal =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MDNkM2VkYTEzYTMwZjg0NTUyNDI0OCIsImZpcnN0TmFtZSI6IkNhc2V5IiwibGFzdE5hbWUiOiJUYXlsb3IiLCJ1c2VybmFtZSI6IlRheWxvcm5hdG9yIiwiaGFzaCI6IiQyYSQxMCQyWkl2N0xwb2F5Y0ExSjBUdm9lZy5Pc3FxS0tSbURGQmpHTENKSWlUbUU4aWpmcC9WeVc3YSIsIl9fdiI6MH0sImlhdCI6MTcxMTY5NjI4MX0.Fgfs9G03OVM_JjqjXnOyhqn_jRM7WAJNVYaA1wEZ5o4";
      } else {
        console.log("Token found in localStorage.");
      }


  
      const response = await axios.get(`${BASE_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      });

      if (response.data.isAuth) {
        setIsLoggedIn(true);
        setApiData(response.data);
      } else {
        setIsLoggedIn(false);
        setApiData(response.data);
        console.log("popo");
        localStorage.removeItem("token");
      }

      if (!navData) {
         fetchNav();
       }

      
    } catch (error) {
      console.log("remove token");
      localStorage.removeItem("token");
      console.error("Error checking auth status", error);
    }
  };

  //FETCH DATA - DOES NEED AUTHENTICATION TO ACCESS DATA
  const fetchAuth = async (url) => {
    console.log(`trying: ${url}`);
    console.log(`Logged in checker (before fetch): ${isLoggedIn}`);



    try {
      const response = await axios.get(`${BASE_URL}/${url}`
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.isAuth) {
        setIsLoggedIn(true);
        setApiData(response.data);
        console.log("Winning");
      } else {
        console.log("papa");
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }

      if (!navData) {
        fetchNav();
      }
    } catch (error) {
      console.log("remove token");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      console.error("Error checking auth status", error);
    }
  };

  const logout = () => {
    console.log("poopie");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setApiData(false);
    const navigate = useNavigate();
    navigate("/");
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, credentials);
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      setApiData(response.data);
    } catch (error) {
      console.error("Login failed", error);
      setIsLoggedIn(false);
    }
  };

  const updateLoginStatus = (val) => {
    setIsLoggedIn(val);
  };

  const updateApiData = (val) => {
    setApiData(val);
  };

  return (
    <ApiContext.Provider
      value={{
        isLoggedIn,
        apiData,
        fetchOptional,
        fetchAuth,
        logout,
        login,
        updateApiData,
        updateLoginStatus,
        navData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
