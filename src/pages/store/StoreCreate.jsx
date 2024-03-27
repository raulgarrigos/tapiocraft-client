import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

//Bootstrap
import { Container, Form, Button } from "react-bootstrap";

function StoreCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const { loggedUser } = useContext(AuthContext);

  const redirect = useNavigate();

  const handleStoreName = (e) => {
    setName(e.target.value);
  };

  const handleStoreDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleStoreCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStore = { name, description, category };

    try {
      await service.post("/store/create", newStore);
      redirect(`/profile/${loggedUser._id}`);
    } catch (error) {
      redirect("/error");
    }
  };

  //Styles
  const containerStyle = {
    maxWidth: "600px",
    backgroundColor: "grey",
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <Container style={containerStyle}>
      <h2>Crea tu tienda</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleStoreName}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={handleStoreDescription}
            required
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Categoría:</Form.Label>
          <Form.Select value={category} onChange={handleStoreCategory} required>
            <option value="">Selecciona una categoría</option>
            <option value="bags_and_purses">Bolsos y monederos</option>
            <option value="necklaces">Collares</option>
            <option value="rings">Anillos</option>
            <option value="earrings">Pendientes</option>
            <option value="bracelets">Pulseras</option>
            <option value="body_jewelry">Joyería y bisutería corporal</option>
            <option value="prints_and_printing">Impresiones y láminas</option>
            <option value="photography">Fotografía</option>
            <option value="painting">Pintura</option>
            <option value="sculpture">Escultura</option>
            <option value="glass_art">Arte en vidrio</option>
            <option value="drawings_and_illustrations">
              Dibujos e ilustraciones
            </option>
            <option value="mixed_media_and_collage">
              Soporte mixto y collage
            </option>
            <option value="fiber_arts">Arte en fibra</option>
            <option value="dolls_and_miniatures">Muñecas y miniaturas</option>
          </Form.Select>
        </Form.Group>

        <br />

        <Button variant="primary" type="submit">
          Crear Tienda
        </Button>
      </Form>
    </Container>
  );
}

export default StoreCreate;
