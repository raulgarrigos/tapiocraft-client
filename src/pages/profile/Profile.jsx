import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../../services/config";

// Bootstrap
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Profile() {
  const [userData, setUserData] = useState(null);
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
      </div>
    </div>
  );
}

export default Profile;
