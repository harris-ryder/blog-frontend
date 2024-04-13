import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { ENDPOINTS } from "../config/apiConfig";
import { useNavigate } from "react-router-dom"; // Add this import at the top
import { apiHelper } from "../context/ApiContext";
import { Link } from 'react-router-dom';
import "./LoginPage.css";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });


  const [autoLogin, setAutoLogin] = useState(false);

  const [failedLogin, setFailedLogin] = useState(false);

  const { isLoggedIn, apiData, fetchOptional, logout, updateLoginStatus, updateApiData} =
    apiHelper();
  const navigate = useNavigate(); // Initialize the navigate function


  const login = async (credentials) => {
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, credentials);

      if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      updateLoginStatus(true);
      updateApiData(response.data);
      setFailedLogin(false); // Ensure failed login is reset on success
      console.log(response.data);
      navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      updateLoginStatus(false);
      setFailedLogin(true);
      localStorage.removeItem("token");
      console.log('Error', error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(credentials); // Use await here
  };


  useEffect(() => {
    fetchOptional(ENDPOINTS.LOGIN);

    const footerElement = document.querySelector('.footer');

    if (!footerElement.classList.contains('clamp')) {
      footerElement.classList.add('clamp');
    }
    return () => {

      if (!footerElement.classList.contains('clamp')) {
        footerElement.classList.remove('clamp');

      }
    };
  }, []);

  useEffect(()=>{
    let index = 0;
    const username = "fakeuser";
    const password = "letmein";
    const inputUsername = document.getElementById("username");
    const passUsername = document.getElementById("password");

// elements is a collection of elements with the specified class name
// You can access individual elements by index, e.g., elements[0]

    const typeUsername = () => {
      if (index < username.length) {
        inputUsername.value = inputUsername.value + username[index];
        inputUsername.focus();
        index++;
        setTimeout(typeUsername, 100); // Delay for typing username
      } else {
        index = 0; // Reset index for password
        setTimeout(typePassword, 500); // Start typing password after finishing username
      }
    };

    const typePassword = () => {
      if (index < password.length) {
        passUsername.value = passUsername.value + password[index];
        passUsername.focus();

        index++;
        setTimeout(typePassword, 100); // Delay for typing password
      } else {
        login({username: username, password: password}); // Submit the form after typing password
      }
    };

  

    if (autoLogin) { 
      inputUsername.value = "";
      passUsername.value = "";


      typeUsername(); }


  },[autoLogin])


 function loginSimulator(e) {
  e.preventDefault();
  setAutoLogin(true);
 }





  return (
    <MainLayout>
      {isLoggedIn ? (
        <div>
          Already logged in as {apiData.user.username} - Not you?{" "}
          <span onClick={logout}>Logout</span>{" "}
        </div>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label className="input" htmlFor="username">
              <input
                id="username"
                type="text"
                value={credentials.username}
                className="input__field"
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <span className="input__label">Username</span>
            </label>
          </div>
          <div>
            <label className="input" htmlFor="password">
            <input
              id="password"
              type="password"
              value={credentials.password}
              className="input__field"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <span className="input__label">Password</span>
            </label>
          </div>
          <button type="submit">Login</button>
          <button onClick={loginSimulator}>Test Account Login</button>

          {failedLogin ? <p>Incorrect username or password - Try again</p> : <p> Not a member? <Link to="/account/signup">Sign up!</Link></p>}

        </form>

        
      )}
    </MainLayout>
  );
}

export default LoginPage;
