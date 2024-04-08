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
    <div>
      {allStores.map((store) => {
        return (
          <div key={store._id}>
            <Link to={`/store/${store._id}`}>
              <h3>{store.name}</h3>
            </Link>
            <p>{store.category}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AllStores;
