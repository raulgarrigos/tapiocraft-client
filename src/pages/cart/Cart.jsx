import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const redirect = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/cart`);
      console.log(response.data.cart.items);
      setCartDetails(response.data.cart.items);
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
      {cartDetails.map((product) => (
        <div key={product.product._id}>
          <span>
            <p>
              {product.product.name} | {product.product.price}€ | Cantidad:{" "}
              {product.quantity}
            </p>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Cart;
