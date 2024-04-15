import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";

function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(
        `/store/${params.storeId}/products/${params.productId}`
      );
      console.log(response.data);
      setProductDetails(response.data);
      setIsLoading(false);
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
    </div>
  );
}
export default ProductDetails;
