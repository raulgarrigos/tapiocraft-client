import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const handleDelete = async (orderId) => {
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
    <div>
      {loggedUser && loggedUser._id === orderDetails?.user._id && (
        <div>
          <h4>Pedido</h4>
          <div>
            <p>Nº de pedido: {orderDetails._id}</p>
            <p>Estado del pedido: {orderDetails.status}</p>
            <p>Precio total: {orderDetails.orderPrice}€</p>
          </div>
          <h4>Productos</h4>
          <div>
            {orderDetails.products.map((product) => (
              <div key={product._id}>
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
                <br />
              </div>
            ))}
          </div>

          <h4> Datos de contacto</h4>
          <div>
            <p>
              Nombre: {orderDetails.name} {orderDetails.surname}
            </p>
            <p>Nº de teléfono: {orderDetails.user.phoneNumber}</p>
            <p>Correo electrónico: {orderDetails.user.email}</p>
            <p>Dirección de envío: {orderDetails.shippingAddress}</p>
          </div>
          {orderDetails.status !== "cancelled" && (
            <Button variant="danger" onClick={() => handleDelete()}>
              Cancelar pedido
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
