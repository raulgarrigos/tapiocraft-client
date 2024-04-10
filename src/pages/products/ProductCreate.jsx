import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

//Bootstrap
import { Container, Form, Button } from "react-bootstrap";

function ProductCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(1);

  const { loggedUser } = useContext(AuthContext);

  const redirect = useNavigate();
  const params = useParams();

  const handleProductName = (e) => {
    setName(e.target.value);
  };

  const handleProductDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleProductPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleProductCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleProductStock = (e) => {
    setStock(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, description, price, category, stock };

    try {
      await service.post(`/store/${params.storeId}/product`, newProduct);
      redirect(`/store/${params.storeId}`);
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
      <h2>Añade tu producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleProductName}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={handleProductDescription}
            required
          ></Form.Control>
        </Form.Group>

        {/*  mirar si se puede poner de manera automática en euros */}
        <Form.Group controlId="price">
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={handleProductPrice}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Categoría:</Form.Label>
          <Form.Select
            value={category}
            onChange={handleProductCategory}
            required
          >
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

        {/* mirar si se puede poner stock negativo y, en tal caso, bloquearlo */}
        <Form.Group controlId="stock">
          <Form.Label>Nº de productos:</Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={handleProductStock}
            required
          ></Form.Control>
        </Form.Group>

        <br />

        <Button variant="primary" type="submit">
          Crear producto
        </Button>
      </Form>
    </Container>
  );
}

export default ProductCreate;
