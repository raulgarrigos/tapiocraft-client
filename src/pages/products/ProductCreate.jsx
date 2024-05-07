import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../services/config";

//Bootstrap
import { Container, Form, Button } from "react-bootstrap";

function ProductCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(1);

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

  return (
    <Container className="my-4 px-4 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Añade tu producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-4">
          <Form.Label className="block text-gray-700">Nombre:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleProductName}
            required
            className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-customBlue"
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-4">
          <Form.Label className="block text-gray-700">Descripción:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={handleProductDescription}
            required
            className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-customBlue"
          />
        </Form.Group>

        <Form.Group controlId="price" className="mb-4">
          <Form.Label className="block text-gray-700">Precio:</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={handleProductPrice}
            required
            className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-customBlue"
          />
        </Form.Group>

        <Form.Group controlId="category" className="mb-4">
          <Form.Label className="block text-gray-700">Categoría:</Form.Label>
          <Form.Select
            value={category}
            onChange={handleProductCategory}
            required
            className="form-select mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-customBlue"
          >
            <option value="">Selecciona una categoría</option>
            <option value="bolsos_y_monederos">Bolsos y monederos</option>
            <option value="collares">Collares</option>
            <option value="anillos">Anillos</option>
            <option value="pendientes">Pendientes</option>
            <option value="pulseras">Pulseras</option>
            <option value="joyeria_y_bisuteria_corporal">
              Joyería y bisutería corporal
            </option>
            <option value="impresiones_y_laminas">Impresiones y láminas</option>
            <option value="fotografia">Fotografía</option>
            <option value="pintura">Pintura</option>
            <option value="escultura">Escultura</option>
            <option value="arte_en_vidrio">Arte en vidrio</option>
            <option value="dibujos_e_ilustraciones">
              Dibujos e ilustraciones
            </option>
            <option value="soporte_mixto_y_collage">
              Soporte mixto y collage
            </option>
            <option value="arte_en_fibra">Arte en fibra</option>
            <option value="munecas_y_miniaturas">Muñecas y miniaturas</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="stock" className="mb-4">
          <Form.Label className="block text-gray-700">
            Nº de productos:
          </Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={handleProductStock}
            required
            className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-customBlue"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Crear producto
        </Button>
      </Form>
    </Container>
  );
}

export default ProductCreate;
