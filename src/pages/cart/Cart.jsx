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
    <div className="container mx-auto mt-8">
      <div className="grid gap-4 grid-cols-1">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:border border-customBlue flex items-center"
            >
              <div className="mr-4">
                {item.product.images && item.product.images.length > 0 ? (
                  <div className="w-40 h-40 max-w-full mx-auto rounded-md overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={`Image ${item.product.images[0]}`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 max-w-full mx-auto rounded-md overflow-hidden">
                    <img
                      src="/public/images/image_1024.png"
                      alt="Imagen default"
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <p className="text-lg font-semibold mb-2 text-customBlue">
                  {item.product.name} | {item.product.price}€ | Cantidad:{" "}
                  {item.quantity} | Total: {item.product.price * item.quantity}€
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleDelete(item.product._id, item.quantity)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-center">
                No hay productos en el carrito todavía.
              </h3>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out inline-block mt-2">
        <p className="font-bold mx-1">Total del carrito: {totalPrice}€</p>
      </div>
      <div className="mt-2">
        {cartDetails && cartItems.length > 0 && (
          <Link to={`/cart/checkout/${cartDetails._id}`}>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 my-2 rounded"
            >
              Realizar pedido
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
