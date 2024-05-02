import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

function ProductEdit() {
  const [productData, setProductData] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = useNavigate();
  const params = useParams();

  const { loggedUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const clone = JSON.parse(JSON.stringify(productData));
    clone[e.target.name] = e.target.value;
    setProductData(clone);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const productResponse = await service.get(
        `/store/${params.storeId}/products/${params.productId}`
      );
      setProductData(productResponse.data);

      const storeResponse = await service.get(
        `/store/${params.storeId}/details`
      );
      setStoreData(storeResponse.data);

      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(
        `/store/${params.storeId}/products/${params.productId}`,
        productData
      );
      redirect(`/store/${params.storeId}/${params.productId}`);
      console.log("Product updated");
    } catch (error) {
      redirect("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(
        `/store/${params.storeId}/products/${params.productId}`
      );
      redirect(`/store/${params.storeId}`);
      console.log("Product deleted");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const isOwner = storeData && loggedUser && storeData.owner === loggedUser._id;

  return (
    <div className="my-forms-container">
      {isOwner && (
        <>
          <h3 className="my-forms-title">Update your product:</h3>
          <form onSubmit={handleSubmit}>
            <div className="my-forms-containerForm">
              <label className="my-forms-label">Product name:</label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                defaultValue={productData.name}
                className="my-forms-input"
              />
            </div>

            <div className="my-forms-containerForm">
              <label className="my-forms-label">Product description:</label>
              <textarea
                name="description"
                onChange={handleInputChange}
                defaultValue={productData.description}
                className="my-forms-input"
              />
            </div>

            <div className="my-forms-containerForm">
              <label className="my-forms-label">Product price:</label>
              <input
                type="number"
                name="price"
                onChange={handleInputChange}
                defaultValue={productData.price}
                className="my-forms-input"
              />
            </div>

            <div className="my-forms-containerForm">
              <label className="my-forms-label">Product stock:</label>
              <input
                type="number"
                name="stock"
                onChange={handleInputChange}
                defaultValue={productData.stock}
                className="my-forms-input"
              />
            </div>

            <div className="my-forms-containerForm">
              {storeData.owner === loggedUser._id && (
                <button type="submit" className="my-forms-button">
                  Confirm changes
                </button>
              )}

              {storeData.owner === loggedUser._id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="my-forms-deleteButton"
                >
                  Delete product
                </button>
              )}

              {storeData.owner === loggedUser._id && (
                <Link to={`/store/${params.storeId}/${params.productId}`}>
                  <button type="button" className="back-btn">
                    Back
                  </button>
                </Link>
              )}
            </div>
          </form>
        </>
      )}

      {loggedUser && !isOwner && (
        <div>
          <h3 className="text-xl">
            You're not supposed to be here. Go back and edit your own product!
          </h3>
          <Link to={`/store/${params.storeId}`}>
            <button className="back-btn">Back</button>
          </Link>
        </div>
      )}

      {!loggedUser && (
        <div>
          <h3 className="text-xl">Please log in to edit your own product.</h3>
          <Link to="/login">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductEdit;
