import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../../services/config";

// Bootstrap
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const redirect = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/profile/${params.userId}`);
      console.log(response.data);
      setUserData(response.data);

      const storesResponse = await service.get(`/store/user/${params.userId}`);
      console.log(storesResponse.data);
      setStores(storesResponse.data);

      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h4>{userData.username}</h4>
        <img
          src={userData.profilePicture}
          alt={userData.username}
          width={200}
        />
        {userData.firstName && userData.lastName && (
          <p>
            {userData.firstName} {userData.lastName}
          </p>
        )}
        {userData.firstName && !userData.lastName && (
          <p>{userData.firstName}</p>
        )}
        {!userData.firstName && userData.lastName && <p>{userData.lastName}</p>}

        {userData.address && (
          <p>
            <strong>Address:</strong> {userData.address}
          </p>
        )}

        {userData.phoneNumber && <p>{userData.phoneNumber}</p>}

        <br />
        {loggedUser?._id === params.userId && (
          <Link to={"/profile/edit"}>
            <Button
              variant="light"
              type="submit"
              style={{ backgroundColor: "#fdb14d" }}
            >
              Edit profile
            </Button>
          </Link>
        )}

        <br />
        <br />

        {loggedUser?._id === params.userId && (
          <Link to={"/store/create"}>
            <Button
              variant="light"
              type="submit"
              style={{ backgroundColor: "#fdb14d" }}
            >
              Create store
            </Button>
          </Link>
        )}

        <h5>Tiendas creadas por {userData.username}:</h5>
        <ul>
          {stores.map((store) => (
            <Link key={store._id} to={`/store/${store._id}`}>
              <p>{store.name}</p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
