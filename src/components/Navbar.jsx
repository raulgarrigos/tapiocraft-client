import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

function AppNavbar() {
  const { isLoggedIn, authenticateUser, loggedUser } = useContext(AuthContext);

  const redirect = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    redirect("/");
  };

  if (isLoggedIn) {
    return (
      <div className="Navbar">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href={`/profile/${loggedUser._id}`}>Profile</Nav.Link>
        <Button
          variant="outline-danger"
          size="sm"
          style={{ marginLeft: "15px" }}
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </div>
    );
  } else {
    return (
      <div className="Navbar">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Create Account</Nav.Link>
      </div>
    );
  }
}

export default AppNavbar;
