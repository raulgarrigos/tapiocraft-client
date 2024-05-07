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
    <div className="my-forms-container">
      <h3 className="my-forms-title">Add your product</h3>
      <div className="my-forms-containerForm">
        <label className="my-forms-label">Product name:</label>
        <input
          type="text"
          name="name"
          onChange={handleProductName}
          className="my-forms-input"
        />
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Product description:</label>
        <textarea
          name="description"
          onChange={handleProductDescription}
          className="my-forms-textarea"
        />
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Product price:</label>
        <input
          type="number"
          name="price"
          onChange={handleProductPrice}
          className="my-forms-input"
        />
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Product category:</label>
        <select
          name="category"
          onChange={handleProductCategory}
          className="my-forms-select"
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
          <option value="Impresiones y láminas">Impresiones y láminas</option>
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
        </select>
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Product stock:</label>
        <input
          type="number"
          name="stock"
          onChange={handleProductStock}
          className="my-forms-input"
        />
      </div>

      <button type="submit" className="alt-btn" onClick={handleSubmit}>
        Create product{" "}
      </button>
    </div>
  );
}

export default ProductCreate;
