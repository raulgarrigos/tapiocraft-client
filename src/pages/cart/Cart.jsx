import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";

function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const redirect = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (cartDetails) {
      // Calcular el precio total del carrito
      const total = cartDetails.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [cartDetails]);

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
      {cartDetails &&
        cartDetails.map((item) => (
          <div key={item.product._id}>
            <span>
              <p>
                {item.product.name} | {item.product.price}€ | Cantidad:{" "}
                {item.quantity} | Total: {item.product.price * item.quantity}€
              </p>
            </span>
          </div>
        ))}
      <p>Total del carrito: {totalPrice}€</p>
    </div>
  );
}

export default Cart;
