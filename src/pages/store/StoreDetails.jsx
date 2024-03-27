import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../services/config";

function StoreDetails() {
  const [storeDetails, setStoreDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const responseStore = await service.get(`/store/${params.storeId}`);

      setStoreDetails(responseStore.data);
      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading..</h3>;
  }

  // ! AGREGAR BOTÓN PARA EDITAR TIENDA
  // ! AGREGAR BOTÓN PARA AÑADIR PRODUCTOS
  // ! RENDERIZAR PRODUCTOS AÑADIDOS
  // ! AGREGAR CONDICIONAL IF DE ADDRESS, REFUNDPOLICY

  return (
    <div>
      <p>Nombre: {storeDetails.name}</p>
      <p>Descripción de la tienda: {storeDetails.description}</p>
      <p>Categoría: {storeDetails.category}</p>
    </div>
  );
}

export default StoreDetails;
