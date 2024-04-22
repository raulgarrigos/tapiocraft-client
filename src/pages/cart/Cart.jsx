import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../services/config";

// Bootstrap
import Button from "react-bootstrap/Button";

function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const redirect = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (cartItems) {
      // Calcular el precio total del carrito
      const total = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [cartItems]);

  const getData = async () => {
    try {
      const response = await service.get(`/cart`);
      console.log(response.data.cart);
      setCartDetails(response.data.cart);
      console.log(response.data.cart.items);
      setCartItems(response.data.cart.items);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // El carrito aún no existe, establecer datos vacíos
        setCartItems([]);
        setCartDetails(null);
        setIsLoading(false);
      } else {
        // Otro error, redirigir a la página de error
        redirect("/error");
      }
    }
  };

  const handleDelete = async (productId) => {
    try {
      await service.delete(`/cart/products/${productId}`);
      getData();
      console.log("Product removed from cart");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.product._id}>
            <span>
              <p>
                {item.product.name} | {item.product.price}€ | Cantidad:{" "}
                {item.quantity} | Total: {item.product.price * item.quantity}€
              </p>
              <Button
                variant="danger"
                onClick={() => handleDelete(item.product._id, item.quantity)}
              >
                Eliminar
              </Button>
            </span>
          </div>
        ))
      ) : (
        <p>No hay productos en el carrito todavía.</p>
      )}
      <p>Total del carrito: {totalPrice}€</p>
      {cartDetails && cartItems.length > 0 && (
        <Link to={`/cart/checkout/${cartDetails._id}`}>
          <Button>Realizar pedido</Button>
        </Link>
      )}
    </div>
  );
}

export default Cart;
