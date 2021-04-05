import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import { useAuthContext } from "@contexts/AuthContext";
import "./login.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useUserContext();
  const { setAuth } = useAuthContext();
  let history = useHistory();

  const handleSubmit = () => {
    if (username && password) {
      axios
        .post("/api/login", { username: username, password: password })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            setAuth(true);
            if (props.location.state !== undefined) {
              history.replace(props.location.state.prevPath);
            } else {
              history.replace("/");
            }
            // ^ It's rendering home page for some reason. NEED TO FIGURE IT OUT LATER!!
            //history.goBack();
          } else {
            setErrorMessage("Username or Password is incorrect. Try Again.");
          }
        });
    }
  };

  const handleForgotPassword = () => {
    if (username) {
      history.push("/resetpassword/" + username);
    } else {
      setErrorMessage("Please provide username.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`,
        height: "95.7vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="form">
        {user && user.username}
        <h1 className="loginHeader">Login</h1>
        <p className="error-msg">{errorMessage}</p>

        <div className="login-inputs">
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            className="login-input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="login-inputs">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="btn-container">
          <button className="login-input-btn" onClick={handleSubmit}>
            Login
          </button>
        </div>

        <div className="signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
        <div
          className="signup"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          <a onClick={handleForgotPassword}>Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}
