import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { ENDPOINTS } from "../config/apiConfig";
import { apiHelper } from "../context/ApiContext";
import { useNavigate } from "react-router-dom"; // Add this import at the top



function SignupPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoggedIn, apiData, fetchOptional, fetchAuth, logout, login } =
    apiHelper();

    const navigate = useNavigate();

  useEffect(() => {
    fetchOptional(ENDPOINTS.SIGNUP);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {

    try {
      const response = await axios.post(ENDPOINTS.SIGNUP, {
        username,
        firstName,
        lastName,
        password,
        confirmPassword,
      });
      console.log("Signup successful");
      localStorage.setItem("token", response.data.token);
      // Redirect or update UI accordingly
      navigate('/account/login');
    } catch (error) {
      console.error("Signup failed", error);
      // Handle error (e.g., show error message)
    }
  } else {
    console.log("Passwords dont match");
  }
  };

  return (
    <MainLayout>
      {isLoggedIn ? (
        <div>
          Already logged in as {apiData.user.username} - Not you?{" "}
          <span onClick={logout}>Logout</span>
        </div>
      ) : (
        <>
          <form className="signup-form login-form" onSubmit={handleSignup}>
        
            <div>
              <label className="input" htmlFor="username">
                <input
                  id="username"
                  type="text"
                  value={username}
                  className="input__field"
                  onChange={(e) => setUsername(e.target.value)}
                  min="3" max="20"
                  required
                />
                <span className="input__label">Username</span>
              </label>
            </div>
            <div>
              <label className="input" htmlFor="firstName">
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  className="input__field"
                  onChange={(e) => setFirstName(e.target.value)}
                  min="3" max="20"
                  required
                />
                <span className="input__label">First Name</span>
              </label>
            </div>
            <div>
              <label className="input" htmlFor="lastName">
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  className="input__field"
                  onChange={(e) => setLastName(e.target.value)}
                  min="3" max="20" required
                />
                <span className="input__label">Last Name</span>
              </label>
            </div>
            <div>
              <label className="input" htmlFor="password">
                <input
                  id="password"
                  type="password"
                  value={password}
                  className="input__field"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input__label">Password</span>
              </label>
            </div>
            <div>
              <label className="input" htmlFor="confirmPassword">
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  className="input__field"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="input__label">Confirm Password</span>
              </label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </>
      )}
    </MainLayout>
  );
}

export default SignupPage;
