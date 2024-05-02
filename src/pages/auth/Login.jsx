import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { authenticateUser } = useContext(AuthContext);
  const redirect = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = { username, password };
      const response = await service.post("/auth/login", credentials);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      redirect("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        redirect("/error");
      }
    }
  };

  return (
    <div className="my-forms-container">
      <h3 className="my-forms-title">Log In </h3>
      <div className="my-forms-containerForm">
        <label className="my-forms-label">Username:</label>
        <input
          type="text"
          name="firstName"
          onChange={handleUsernameChange}
          defaultValue={username}
          className="my-forms-input"
        />
      </div>

      <div className="containerForm">
        <label className="my-forms-label">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handlePasswordChange}
          defaultValue={password}
          className="my-forms-input"
        />
      </div>

      <button
        type="submit"
        style={{ backgroundColor: "#fdb14d" }}
        className="my-forms-button"
        onClick={handleLogin}
      >
        Enter
      </button>

      <br />
      <br />

      <p className="text-gray-800">
        Are you not registered yet?{" "}
        <Link to={"/register"} className="text-blue-500 hover:text-blue-700">
          Click here!
        </Link>
      </p>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
}

export default Login;
