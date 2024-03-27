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

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

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

  // Styles
  const containerStyle = {
    maxWidth: "600px",
    backgroundColor: "grey",
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <div>
      <h1>Create your account</h1>
      <br />

      <Container className="text-center" style={containerStyle}>
        <Form onSubmit={handleSignup}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Group>

          <br />

          <Form.Group controlId="formDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>

            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </Form.Group>

          <br />

          <Button
            variant="light"
            type="submit"
            style={{ backgroundColor: "#fdb14d" }}
          >
            Sign up
          </Button>

          <p style={{ color: "red" }}>{errorMessage}</p>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
