import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AppNavbar() {
  const { isLoggedIn, authenticateUser, loggedUser } = useContext(AuthContext);
  const redirect = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    redirect("/");
  };

  return (
    <nav className="bg-pistachoGreen p-2">
      <div className="container mx-auto flex justify-between items-center font-bold">
        <a href="/">
          <img
            src="/images/TapioCraft Green_Tail_Smol.png"
            alt="Logo"
            className="h-16"
          />
        </a>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white hover:text-gray-300">
              Inicio
            </a>
          </li>
          <li>
            <a href="/all-stores" className="text-white hover:text-gray-300">
              Tiendas
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a
                  href={`/profile/${loggedUser._id}`}
                  className="text-white hover:text-gray-300"
                >
                  Perfil
                </a>
              </li>
              <li>
                <a href="/cart" className="text-white hover:text-gray-300">
                  Carrito
                </a>
              </li>
              <li>
                <button
                  className="text-white hover:text-gray-300"
                  onClick={handleLogOut}
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="text-white hover:text-gray-300">
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a href="/register" className="text-white hover:text-gray-300">
                  Crear Cuenta
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default AppNavbar;
