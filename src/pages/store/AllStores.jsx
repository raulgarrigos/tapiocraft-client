import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../services/config";

function AllStores() {
  const [allStores, setAllStores] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/store");
      console.log(response.data);
      setAllStores(response.data);
      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="container my-4 px-4 py-8 bg-white rounded-lg shadow-md">
      {allStores.map((store) => {
        return (
          <div
            key={store._id}
            className="mb-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-indigo-600"
          >
            <Link
              to={`/store/${store._id}`}
              className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <h3>{store.name}</h3>
            </Link>
            <p className="text-gray-700">{store.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AllStores;
