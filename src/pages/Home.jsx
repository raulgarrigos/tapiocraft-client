import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/config";

function Home() {
  const [allProducts, setAllProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const productsResponse = await service.get("/products");
      console.log(productsResponse.data);
      setAllProducts(productsResponse.data);
      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="container mx-auto mt-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allProducts.map((product) => (
          <Link
            key={product._id}
            to={`/store/${product.store}/${product._id}`}
            className="text-gray-800 hover:text-indigo-600"
          >
            <div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:border border-indigo-600">
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">
                {product.name}
              </h3>
              <span className="text-lg font-semibold text-gray-700">
                {product.price}€
              </span>
              {product.images && product.images.length > 0 ? (
                <div className="mt-2 w-full h-40 max-w-full mx-auto rounded-md overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={`Image ${product.images[0]}`}
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div className="mt-2 w-full h-40 max-w-full mx-auto rounded-md overflow-hidden">
                  <img
                    src="/public/images/image_1024.png"
                    alt="Imagen default"
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
