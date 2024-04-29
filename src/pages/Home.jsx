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
    <div>
      {allProducts.map((product) => (
        <div key={product._id} className="product-card">
          <Link
            to={`/store/${product.store}/${product._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h3 className="text-3xl font-bold underline">{product.name}</h3>
            <p>Precio: {product.price}€</p>

            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={`Image ${product.images[0]}`}
                width={200}
              />
            ) : (
              <img
                src="/public/images/image_1024.png"
                alt="Imagen default"
                width={200}
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
