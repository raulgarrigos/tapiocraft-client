import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

// Bootstrap

import Nav from "react-bootstrap/Nav";

function AppNavbar() {
  const redirect = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    redirect("/");
  };

  return (
    <div className="Navbar">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Create Account</Nav.Link>
    </div>
  );
}

export default AppNavbar;
