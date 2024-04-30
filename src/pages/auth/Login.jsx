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
    <div className="container my-4 px-4 py-8 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Log In </h3>
      <div className="mb-4">
        <label className="block text-gray-700">Username:</label>
        <input
          type="text"
          name="firstName"
          onChange={handleUsernameChange}
          defaultValue={username}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handlePasswordChange}
          defaultValue={password}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        style={{ backgroundColor: "#fdb14d" }}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        Enter
      </button>

      <br />
      <br />

      <p className="text-gray-800">
        Are you still not registered yet?
        <Link to={"/register"} className="text-blue-500 hover:text-blue-700">
          {" "}
          Click here!
        </Link>
      </p>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
}

export default Login;
