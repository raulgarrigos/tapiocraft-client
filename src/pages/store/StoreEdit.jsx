import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function StoreEdit() {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = useNavigate();
  const params = useParams();

  const { loggedUser } = useContext(AuthContext);

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
      setStoreData(response.data);
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
      console.log("Store updated");
    } catch (error) {
      redirect("/error");
    }
  };

  const handleDelete = async (e) => {
    try {
      await service.delete(`/store/${params.storeId}`);
      redirect(`/profile/${loggedUser._id}`);
      console.log("Store deleted");
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
              name="name"
              onChange={handleInputChange}
              defaultValue={storeData.name}
            />
          </Form.Group>

          <Form.Group controlId="formStoreDescription">
            <Form.Label>Store description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              onChange={handleInputChange}
              defaultValue={storeData.description}
            />
          </Form.Group>

          <Form.Group controlId="formStoreCategory">
            <Form.Label>Store category:</Form.Label>
            <Form.Select
              name="category"
              onChange={handleInputChange}
              defaultValue={storeData.category}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Bolsos y monederos">Bolsos y monederos</option>
              <option value="Collares">Collares</option>
              <option value="Anillos">Anillos</option>
              <option value="Pendientes">Pendientes</option>
              <option value="Pulseras">Pulseras</option>
              <option value="Joyería y bisutería corporal">
                Joyería y bisutería corporal
              </option>
              <option value="Impresiones y láminas">
                Impresiones y láminas
              </option>
              <option value="Fotografía">Fotografía</option>
              <option value="Pintura">Pintura</option>
              <option value="Escultura">Escultura</option>
              <option value="Arte en vidrio">Arte en vidrio</option>
              <option value="Dibujos e ilustraciones">
                Dibujos e ilustraciones
              </option>
              <option value="Soporte mixto y collage">
                Soporte mixto y collage
              </option>
              <option value="Arte en fibra">Arte en fibra</option>
              <option value="Muñecas y miniaturas">Muñecas y miniaturas</option>
            </Form.Select>
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
    </div>
  );
}

export default StoreEdit;
