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

  // Styles
  const containerStyle = {
    maxWidth: "600px",
    backgroundColor: "grey",
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <div>
      <h3>Update your profile: </h3>
      <Container className="text-center" style={containerStyle}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First name:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              onChange={handleInputChange}
              defaultValue={userData.firstName}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              onChange={handleInputChange}
              defaultValue={userData.lastName}
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              onChange={handleInputChange}
              defaultValue={userData.address}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              name="phoneNumber"
              onChange={handleInputChange}
              defaultValue={userData.phoneNumber}
            />
          </Form.Group>

          <br />

          <img
            src={imageUrl ? imageUrl : userData.profilePicture}
            alt={userData.username}
            width={200}
          />

          <Form.Group controlId="formImage">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Form.Group>

          {isUploading ? <h3>... uploading image</h3> : null}

          <br />

          <Button
            variant="light"
            type="submit"
            style={{ backgroundColor: "#fdb14d" }}
          >
            Confirm changes
          </Button>
          <br />
          <br />
          <Link to={`/profile/${userData._id}`}>
            <Button variant="danger">Back</Button>
          </Link>
        </Form>
      </Container>
    </div>
  );
}

export default ProfileEdit;
