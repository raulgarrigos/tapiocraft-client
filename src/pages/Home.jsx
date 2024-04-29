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
      {" "}
      {/* Agregamos la clase mt-8 para añadir margen en la parte superior */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Link
              to={`/store/${product.store}/${product._id}`}
              className="text-gray-800 hover:text-indigo-600"
            >
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600">Precio: {product.price}€</p>

              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={`Image ${product.images[0]}`}
                  className="mt-2 w-full rounded-md"
                />
              ) : (
                <img
                  src="/public/images/image_1024.png"
                  alt="Imagen default"
                  className="mt-2 w-full rounded-md"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
