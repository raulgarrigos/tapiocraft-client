import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

function ProductEdit() {
  const [productData, setProductData] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = useNavigate();
  const params = useParams();

  const { loggedUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const clone = JSON.parse(JSON.stringify(productData));
    clone[e.target.name] = e.target.value;
    setProductData(clone);
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

      const storeResponse = await service.get(`/store/${params.storeId}`);
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

  const handleDelete = async () => {
    try {
      await service.delete(
        `/store/${params.storeId}/products/${params.productId}`
      );
      redirect(`/store/${params.storeId}`);
      console.log("Product deleted");
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
          <h3>Update your product: </h3>
          <Container className="text-center" style={containerStyle}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  defaultValue={productData.name}
                />
              </Form.Group>

              <Form.Group controlId="formProductDescription">
                <Form.Label>Product description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  defaultValue={productData.description}
                />
              </Form.Group>

              <Form.Group controlId="formProductPrice">
                <Form.Label>Product price:</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleInputChange}
                  defaultValue={productData.price}
                />
              </Form.Group>

              <Form.Group controlId="formProductstock">
                <Form.Label>Product stock:</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  onChange={handleInputChange}
                  defaultValue={productData.stock}
                />
              </Form.Group>

              {storeData.owner === loggedUser._id && (
                <Button
                  variant="light"
                  type="submit"
                  style={{ backgroundColor: "#fdb14d" }}
                >
                  Confirm changes
                </Button>
              )}
              <br />
            </Form>
            {storeData.owner === loggedUser._id && (
              <Button variant="danger" type="submit" onClick={handleDelete}>
                Delete store
              </Button>
            )}
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

export default ProductEdit;
