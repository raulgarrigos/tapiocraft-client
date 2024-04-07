import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";

function StoreEdit() {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = useNavigate();
  const params = useParams();

  const handleInputChange = (e) => {
    const clone = JSON.parse(JSON.stringify(storeData));
    clone[e.target.name] = e.target.value;
    setStoreData(clone);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/store/${params.storeId}`);
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/store/${params.storeId}`, storeData);
      redirect(`/store/${params.storeId}`);
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
      <h3>Update your store: </h3>
      <Container className="text-center" style={containerStyle}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formStoreName">
            <Form.Label>Store name:</Form.Label>
            <Form.Control
              type="text"
              name="storeName"
              onChange={handleInputChange}
              defaultValue={storeData.name}
            />
          </Form.Group>

          <Button
            variant="light"
            type="submit"
            style={{ backgroundColor: "#fdb14d" }}
          >
            Confirm changes
          </Button>
          <br />
        </Form>
      </Container>
    </div>
  );
}

export default StoreEdit;
