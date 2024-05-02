import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";
import { Button } from "react-bootstrap";

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const redirect = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(
        `/orders/${params.userId}/${params.orderId}`
      );
      console.log(response.data);
      setOrderDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleCancelOrder = async () => {
    try {
      await service.put(`/orders/${params.userId}/${params.orderId}`);
      getData();
      console.log("Order cancelled");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="container my-4 px-4 py-8 bg-white rounded-lg shadow-md">
      {loggedUser && loggedUser._id === orderDetails?.user._id && (
        <div>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-200">
            <h4 className="text-3xl font-bold my-2">Datos del pedido</h4>
            <div>
              <p>Nº: {orderDetails._id}</p>
              <p>Estado del pedido: {orderDetails.status}</p>
              <p>Precio total: {orderDetails.orderPrice}€</p>
            </div>
          </div>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-200">
            <h4 className="text-3xl font-bold">Datos de contacto</h4>
            <div>
              <p>
                Nombre: {orderDetails.name} {orderDetails.surname}
              </p>
              <p>Nº de teléfono: {orderDetails.user.phoneNumber}</p>
              <p>Correo electrónico: {orderDetails.user.email}</p>
              <p>Dirección de envío: {orderDetails.shippingAddress}</p>
            </div>
            {orderDetails.status !== "cancelled" && (
              <button
                type="button"
                onClick={handleCancelOrder}
                className="my-forms-deleteButton"
              >
                Cancel order
              </button>
            )}
          </div>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-200">
            <h4 className="text-3xl font-bold my-2">Productos</h4>
            <div>
              {orderDetails.products.map((product) => (
                <div
                  key={product._id}
                  className=" my-4 px-4 py-8 bg-white rounded-lg shadow-md hover:scale-105 hover:border border-indigo-600"
                >
                  <Link
                    to={`/store/${product.product.store}/${product.product._id}`}
                  >
                    <p>Nombre: {product.product.name}</p>
                    <p>Precio: {product.product.price}€</p>
                    <p>Cantidad: {product.quantity}</p>
                    {orderDetails.stores.map((store) => {
                      return (
                        <p key={store._id}>
                          {product.product.store === store._id
                            ? `Tienda: ${store.name}`
                            : ""}
                        </p>
                      );
                    })}
                  </Link>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
