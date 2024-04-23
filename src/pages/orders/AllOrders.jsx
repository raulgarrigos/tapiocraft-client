import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";

function Orders() {
  const [allOrders, setAllOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = useNavigate();
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/orders/${params.userId}`);
      console.log(response.data);
      setAllOrders(response.data);
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
      {allOrders.map((order) => {
        return (
          <div key={order._id}>
            <br />
            <p>
              Pedido Nº:{" "}
              <Link to={`/profile/${params.userId}/orders/${order._id}`}>
                {order._id}
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
