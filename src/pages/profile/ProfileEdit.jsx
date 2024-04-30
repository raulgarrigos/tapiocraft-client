import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import service from "../../services/config";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function ProfileEdit() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { loggedUser } = useContext(AuthContext);
  const redirect = useNavigate();

  const handleInputChange = (e) => {
    const clone = JSON.parse(JSON.stringify(userData));
    clone[e.target.name] = e.target.value;
    setUserData(clone);
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    try {
      const response = await service.patch("/profile/image", uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/profile/${loggedUser._id}/details`);
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.put(`/profile/${loggedUser._id}/update`, userData);
      redirect(`/profile/${loggedUser._id}`);
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container my-4 px-4 py-8 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Update your profile: </h3>
      <div className="mb-4">
        <label className="block text-gray-700">First name:</label>
        <input
          type="text"
          name="firstName"
          onChange={handleInputChange}
          defaultValue={userData.firstName}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Last name:</label>
        <input
          type="text"
          name="lastName"
          onChange={handleInputChange}
          defaultValue={userData.lastName}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Address:</label>
        <input
          type="text"
          name="address"
          onChange={handleInputChange}
          defaultValue={userData.address}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone:</label>
        <input
          name="phoneNumber"
          onChange={handleInputChange}
          defaultValue={userData.phoneNumber}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <br />

      <img
        src={imageUrl ? imageUrl : userData.profilePicture}
        alt={userData.username}
        width={200}
        className="rounded-full mx-auto mb-4"
      />

      <div className="mb-4">
        <label className="block text-gray-700">Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {isUploading ? <p className="mb-4">... uploading image</p> : null}

      <button
        type="submit"
        style={{ backgroundColor: "#fdb14d" }}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Confirm changes
      </button>

      <br />
      <br />
      <Link to={`/profile/${userData._id}`}>
        <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          Back
        </button>
      </Link>
    </div>
  );
}

export default ProfileEdit;
