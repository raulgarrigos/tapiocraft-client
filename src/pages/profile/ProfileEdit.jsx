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
    <div className="my-forms-container">
      <h3 className="my-forms-title">Update your profile: </h3>
      <div className="my-forms-containerForm">
        <label className="my-forms-label">First name:</label>
        <input
          type="text"
          name="firstName"
          onChange={handleInputChange}
          defaultValue={userData.firstName}
          className="my-forms-input"
        />
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Last name:</label>
        <input
          type="text"
          name="lastName"
          onChange={handleInputChange}
          defaultValue={userData.lastName}
          className="my-forms-input"
        />
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Address:</label>
        <input
          type="text"
          name="address"
          onChange={handleInputChange}
          defaultValue={userData.address}
          className="my-forms-input"
        />
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Phone:</label>
        <input
          name="phoneNumber"
          onChange={handleInputChange}
          defaultValue={userData.phoneNumber}
          className="my-forms-input"
        />
      </div>

      <br />

      <img
        src={imageUrl ? imageUrl : userData.profilePicture}
        alt={userData.username}
        width={200}
        className="rounded-full mx-auto my-forms-containerForm"
      />

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="my-forms-input"
        />
      </div>

      {isUploading ? (
        <p className="my-forms-containerForm">... uploading image</p>
      ) : null}

      <button
        type="submit"
        style={{ backgroundColor: "#fdb14d" }}
        className="main-btn"
        onClick={handleSubmit}
      >
        Confirm changes
      </button>

      <br />
      <br />
      <Link to={`/profile/${userData._id}`}>
        <button className="back-btn">Back</button>
      </Link>
    </div>
  );
}

export default ProfileEdit;
