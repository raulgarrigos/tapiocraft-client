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
          <Link to={`/store/${product.store}/${product._id}`}>
            <h3>{product.name}</h3>
          </Link>
          <p>Precio: {product.price}€</p>
          {/* Aquí puedes agregar la imagen del producto */}
        </div>
      ))}
    </div>
  );
}

export default Home;
