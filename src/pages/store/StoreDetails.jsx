import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

// Bootstrap
import Button from "react-bootstrap/Button";

function StoreDetails() {
  const [storeDetails, setStoreDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const redirect = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/store/${params.storeId}/details`);
      console.log(response.data);
      setStoreDetails(response.data);

      const productsResponse = await service.get(
        `/store/${params.storeId}/products`
      );
      console.log(productsResponse.data);
      setProducts(productsResponse.data);

      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading..</h3>;
  }

  // ! AGREGAR CONDICIONAL IF DE ADDRESS, REFUNDPOLICY

  return (
    <div>
      {storeDetails && (
        <div key={storeDetails._id}>
          <p>Nombre: {storeDetails.name}</p>
          <p>Descripción de la tienda: {storeDetails.description}</p>
          <p>Categoría: {storeDetails.category}</p>
        </div>
      )}

      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/store/${params.storeId}/${product._id}`}>
            <p>
              {product.name}, {product.price}€
            </p>
          </Link>
        </div>
      ))}

      {loggedUser?._id === storeDetails?.owner && (
        <div>
          <Link to={`/store/${storeDetails._id}/edit`}>
            <Button
              variant="light"
              type="submit"
              style={{ backgroundColor: "#fdb14d" }}
            >
              Edit store
            </Button>
          </Link>

          <Link to={`/store/${storeDetails._id}/add-product`}>
            <Button type="submit" style={{ backgroundColor: "violet" }}>
              Add a product
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default StoreDetails;
