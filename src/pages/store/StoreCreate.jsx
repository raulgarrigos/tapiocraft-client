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
        </select>
      </div>

      <br />

      <button type="submit" className="my-forms-button" onClick={handleSubmit}>
        Confirm changes
      </button>
    </div>
  );
}

export default StoreCreate;
