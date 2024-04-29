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
      setProductDetails(productResponse.data);

      const storeResponse = await service.get(
        `/store/${params.storeId}/details`
      );
      setStoreDetails(storeResponse.data);

      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const addToCart = async () => {
    try {
      await service.post(`/cart/products/${params.productId}`);
      redirect("/cart");
    } catch (error) {
      redirect("/error");
    }
  };

  const handleDeleteImage = async (imagePath) => {
    try {
      await service.delete(
        `/store/${params.storeId}/products/${params.productId}/image`,
        { data: { imagePath } }
      );
      getData();
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading..</h3>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4 text-left">
        {productDetails.name}
      </h2>
      <p className="text-lg mb-4 text-left">{productDetails.description}</p>
      <p className="text-lg mb-4 text-left">Price: {productDetails.price}€</p>
      <p className="text-lg mb-4 text-left">
        Stock: {productDetails.stock} unit/s
      </p>

      <div className="flex flex-wrap gap-4 mb-8">
        {productDetails.images.map((image, index) => (
          <div key={index} className="relative w-40">
            <img
              src={image}
              alt={`Image ${index}`}
              className="w-full rounded"
            />
            {loggedUser && loggedUser._id === storeDetails?.owner && (
              <button
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded text-sm"
                onClick={() => handleDeleteImage(image)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {loggedUser && loggedUser._id !== storeDetails?.owner && (
        <Button
          variant="primary"
          onClick={addToCart}
          disabled={productDetails.stock === 0}
        >
          Add to Cart
        </Button>
      )}

      {loggedUser && loggedUser._id === storeDetails?.owner && (
        <div className="mt-4">
          <Link
            to={`/store/${params.storeId}/${productDetails._id}/edit`}
            className="mr-2 inline-block bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg"
          >
            <button className="focus:outline-none">Edit Product</button>
          </Link>
          <Link
            to={`/store/${params.storeId}/${productDetails._id}/image`}
            className="mr-2 inline-block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            <button className="focus:outline-none">Add Image</button>
          </Link>
          <Link
            to={`/store/${params.storeId}`}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            <button className="focus:outline-none">Back</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
