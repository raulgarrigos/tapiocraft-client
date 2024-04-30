import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

// Importaciones de bootstrap-datepicker
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.css";
import $ from "jquery";
import "bootstrap-datepicker";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { authenticateUser } = useContext(AuthContext);
  const redirect = useNavigate();

  useEffect(() => {
    // Inicializar bootstrap-datepicker
    $("#datepicker").datepicker({
      weekStart: 1, // Configurar el inicio de la semana en Lunes
    });
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,
      dateOfBirth,
    };

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      console.log(newUser);
      await service.post("/auth/register", newUser);

      const credentials = { username, password, dateOfBirth };
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
      <h3 className="text-xl font-semibold mb-4">Create your account</h3>
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
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleEmailChange}
          defaultValue={email}
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

      <div className="mb-4">
        <label className="block text-gray-700">Confirm password:</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleConfirmPasswordChange}
          defaultValue={confirmPassword}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date of Birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        style={{ backgroundColor: "#fdb14d" }}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleSignup}
      >
        Sign up
      </button>

      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
}

export default Register;
