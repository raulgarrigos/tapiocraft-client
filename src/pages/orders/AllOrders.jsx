import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { all } from "axios";

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
      const response = await service.get(`/orders/${params.userId}/list`);
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
    <div className="my-forms-container">
      <div className="grid gap-4 grid-cols-1">
        <h3 className="my-forms-title">Orders</h3>
        {allOrders.map((order) => {
          return (
            <Link to={`/profile/${params.userId}/orders/${order._id}`}>
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md w-2/4 p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:border border-indigo-600 mx-auto"
              >
                <p className="font-bold">Pedido Nº:</p>
                <p className="text-indigo-600"> {order._id}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
