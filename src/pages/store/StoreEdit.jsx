import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

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
      const response = await service.get(`/store/${params.storeId}/details`);
      setStoreData(response.data);
      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/store/${params.storeId}/edit`, storeData);
      redirect(`/store/${params.storeId}`);
      console.log("Store updated");
    } catch (error) {
      redirect("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/store/${params.storeId}/delete`);
      redirect(`/profile/${loggedUser._id}`);
      console.log("Store deleted");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const isOwner = storeData && loggedUser && storeData.owner === loggedUser._id;

  return (
    <div className="container my-4 px-4 py-8 bg-white rounded-lg shadow-md">
      {isOwner && (
        <>
          <h3 className="text-xl font-semibold mb-4">Update your store:</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Store name:</label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              defaultValue={storeData.name}
              className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Store description:</label>
            <textarea
              name="description"
              onChange={handleInputChange}
              defaultValue={storeData.description}
              className="form-input mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Store category:</label>
            <select
              name="category"
              onChange={handleInputChange}
              defaultValue={storeData.category}
              className="form-select mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
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
            </select>
          </div>

          {storeData.owner === loggedUser._id && (
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Confirm changes
            </button>
          )}

          {storeData.owner === loggedUser._id && (
            <button
              type="button"
              onClick={handleDelete}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Delete store
            </button>
          )}
        </>
      )}

      {loggedUser && !isOwner && (
        <div>
          <h3 className="text-xl">
            You're not supposed to be here. Go back and edit your own store!
          </h3>
          <Link to={`/store/${params.storeId}`}>
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
              Back
            </button>
          </Link>
        </div>
      )}

      {!loggedUser && (
        <div>
          <h3 className="text-xl">Please log in to edit your own store.</h3>
          <Link to="/login">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default StoreEdit;
