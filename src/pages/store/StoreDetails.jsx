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
    <div className="container mx-auto mt-8">
      <div className="flex  lg:flex-row gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          {storeDetails && (
            <div key={storeDetails._id}>
              <p className="text-3xl font-bold">{storeDetails.name}</p>
              <p className="text-gray-700 my-4">{storeDetails.description}</p>
              <p className="text-gray-700 my-4">{storeDetails.category}</p>
            </div>
          )}

          {loggedUser?._id === storeDetails?.owner && (
            <div className="mt-4">
              <Link
                to={`/store/${storeDetails._id}/edit`}
                className="mr-2 inline-block"
              >
                <button className="main-btn">Edit store</button>
              </Link>

              <Link
                to={`/store/${storeDetails._id}/add-product`}
                className="ml-2 inline-block"
              >
                <button className="alt-btn">Add a product</button>
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 className="text-3xl font-bold">Productos</h2>
          {products.map((product) => (
            <div
              key={product._id}
              className="mb-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-customBlue my-4"
            >
              <Link
                to={`/store/${params.storeId}/${product._id}`}
                className="text-2xl font-semibold text-customBlue hover:text-customBlue"
              >
                <p>
                  {product.name} | {product.price}€
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoreDetails;
