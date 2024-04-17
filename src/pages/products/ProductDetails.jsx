import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
import { Button } from "react-bootstrap";

function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [storeDetails, setStoreDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const redirect = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const productResponse = await service.get(
        `/store/${params.storeId}/products/${params.productId}`
      );
      console.log("Producto", productResponse.data);
      setProductDetails(productResponse.data);

      const storeReponse = await service.get(`/store/${params.storeId}`);
      console.log("Tienda", storeReponse.data);
      setStoreDetails(storeReponse.data);

      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const addToCart = async () => {
    try {
      await service.post(`/cart/products/${params.productId}`);
      console.log("Product added to cart");
      redirect("/cart");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading..</h3>;
  }

  return (
    <div>
      <h4>Product Details</h4>
      <p>{productDetails.name}</p>
      <p>{productDetails.description}</p>
      <p>{productDetails.price}€</p>
      <p>{productDetails.stock} unidad/es</p>
      <p>{productDetails.images}</p>

      {loggedUser && loggedUser._id !== storeDetails?.owner ? (
        productDetails.stock > 0 ? (
          <Button variant="light" type="submit" onClick={addToCart}>
            Añadir al carrito
          </Button>
        ) : (
          <h3>We're out of stock!</h3>
        )
      ) : null}

      {loggedUser && loggedUser._id === storeDetails?.owner && (
        <div>
          <Link to={`/store/${params.storeId}/${productDetails._id}/edit`}>
            <Button
              variant="light"
              type="submit"
              style={{ backgroundColor: "#fdb14d" }}
            >
              Editar producto
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
export default ProductDetails;
