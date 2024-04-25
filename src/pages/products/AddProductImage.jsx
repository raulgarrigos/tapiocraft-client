import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function AddProductImage() {
  const [productData, setProductData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const redirect = useNavigate();
  const params = useParams();

  const { loggedUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const clone = JSON.parse(JSON.stringify(productData));
    clone[e.target.name] = e.target.value;
    setProductData(clone);
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    for (const file of e.target.files) {
      uploadData.append("images", file);
    }

    try {
      const response = await service.patch(
        `/store/${storeData._id}/products/${productData._id}/image`,
        uploadData
      );
      setImageUrls(response.data.imageUrls);
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
      const productResponse = await service.get(
        `/store/${params.storeId}/products/${params.productId}`
      );
      setProductData(productResponse.data);

      const storeResponse = await service.get(
        `/store/${params.storeId}/details`
      );
      setStoreData(storeResponse.data);

      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(
        `/store/${params.storeId}/products/${params.productId}`,
        productData
      );
      redirect(`/store/${params.storeId}/${params.productId}`);
      console.log("Product updated");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const isOwner = storeData && loggedUser && storeData.owner === loggedUser._id;

  // Styles
  const containerStyle = {
    maxWidth: "600px",
    backgroundColor: "grey",
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <div>
      {isOwner && (
        <>
          <h3>Add your image: </h3>
          <Container className="text-center" style={containerStyle}>
            <Form onSubmit={handleSubmit}>
              {imageUrls.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Imagen ${index}`}
                  width={200}
                />
              ))}

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

              {storeData.owner === loggedUser._id && (
                <Button
                  variant="light"
                  type="submit"
                  style={{ backgroundColor: "#fdb14d" }}
                >
                  Add
                </Button>
              )}
              <br />
            </Form>
          </Container>
        </>
      )}
      {loggedUser && !isOwner && (
        <div>
          <h3>
            You're not supposed to be here. Go back and edit your own product!
          </h3>
          <br />
          <Link to={`/store/${params.storeId}`}>
            <Button variant="danger">Back</Button>
          </Link>
        </div>
      )}
      {!loggedUser && (
        <div>
          <h3>Please log in to edit your own product.</h3>
          <br />
          <Link to="/login">
            <Button variant="primary">Log In</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AddProductImage;
