import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

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

  return (
    <div className="my-forms-container">
      <h3 className="my-forms-title">Create your store:</h3>
      <div className="my-forms-containerForm">
        <label className="my-forms-label">Store name:</label>
        <input
          type="text"
          name="name"
          onChange={handleStoreName}
          defaultValue={name}
          required
          className="my-forms-input"
        />
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Description:</label>
        <input
          as="textarea"
          rows={3}
          value={description}
          onChange={handleStoreDescription}
          required
          className="my-forms-input"
        />
      </div>

      <div className="my-forms-containerForm">
        <label className="my-forms-label">Category:</label>
        <select
          value={category}
          onChange={handleStoreCategory}
          required
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

      <br />

      <button type="submit" className="main-btn" onClick={handleSubmit}>
        Confirm changes
      </button>
    </div>
  );
}

export default StoreCreate;
