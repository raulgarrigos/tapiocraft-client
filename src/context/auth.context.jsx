import { createContext, useEffect, useState } from "react";
import service from "../services/config";
import { BeatLoader } from "react-spinners";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  const authenticateUser = async () => {
    try {
      const response = await service.get("auth/verify");
      setIsLoggedIn(true);
      setIsLoading(false);
      setLoggedUser(response.data.payload);
    } catch (error) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setLoggedUser(null);
    }
  };
  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = { authenticateUser, isLoggedIn, loggedUser };

  if (isLoading) {
    return (
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BeatLoader color="orange" size={25} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
