import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../../services/config";

// Bootstrap
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
      const response = await service.get(`/profile/${params.userId}/details`);
      console.log(response.data);
      setUserData(response.data);

      const storesResponse = await service.get(`/store/${params.userId}/list`);
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
    <div className="flex justify-center items-start h-screen p-8">
      <div className="profile-container w-1/2 mr-4 bg-white rounded-lg shadow-md p-4">
        <div className="profile-content">
          <h1 className="text-3xl font-bold">{userData.username}</h1>
          <div className="flex justify-center my-4">
            <img
              src={userData.profilePicture}
              alt={userData.username}
              width={200}
              className="rounded-full"
            />
          </div>
          {userData.firstName && userData.lastName && (
            <p>
              {userData.firstName} {userData.lastName}
            </p>
          )}
          {userData.firstName && !userData.lastName && (
            <p>{userData.firstName}</p>
          )}
          {!userData.firstName && userData.lastName && (
            <p>{userData.lastName}</p>
          )}

          {userData.address && (
            <p>
              <strong>Address:</strong> {userData.address}
            </p>
          )}

          {userData.phoneNumber && (
            <p>
              <strong>Contact: </strong>
              {userData.phoneNumber}
            </p>
          )}

          <br />
          {loggedUser?._id === params.userId && (
            <Link to={"/profile/edit"} className="inline-block mr-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
                Edit profile
              </button>
            </Link>
          )}

          {loggedUser?._id === params.userId && (
            <Link
              to={`/profile/${params.userId}/orders`}
              className="inline-block mr-2"
            >
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
                Orders
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="stores-container w-1/2 bg-white rounded-lg shadow-md p-4">
        <h1 className="text-3xl font-bold">
          Tiendas creadas por {userData.username}:
        </h1>
        <ul>
          {stores.map((store) => (
            <div
              key={store._id}
              className="mb-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-indigo-600 my-4"
            >
              <Link
                to={`/store/${store._id}`}
                className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <p>{store.name}</p>
              </Link>
            </div>
          ))}
        </ul>

        {loggedUser?._id === params.userId && (
          <Link to={"/store/create"}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">
              Create store
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Profile;
