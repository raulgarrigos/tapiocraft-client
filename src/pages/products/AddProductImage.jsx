import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";

function AddProductImage() {
  const [productData, setProductData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const redirect = useNavigate();
  const params = useParams();

  const { loggedUser } = useContext(AuthContext);

  const handleFileUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    for (const file of e.target.files) {
      uploadData.append("images", file);
    }

    try {
      const response = await service.patch(
        `/store/${storeData._id}/products/${productData._id}/image`,
        uploadData
      );
      setImageUrls(response.data.imageUrls);
      setIsUploading(false);
    } catch (error) {
      redirect("/error");
    }
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

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const isOwner = storeData && loggedUser && storeData.owner === loggedUser._id;

  return (
    <div className="my-forms-container">
      {isOwner && (
        <>
          <h3 className="my-forms-title">Add your image:</h3>
          <form onSubmit={handleSubmit}>
            <div className="my-forms-containerForm">
              <label className="my-forms-label">Image:</label>
              <input
                type="file"
                name="image"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="my-forms-input"
              />
            </div>

            {isUploading ? <h3>... uploading image</h3> : null}

            <div className="my-forms-containerForm">
              {storeData.owner === loggedUser._id && (
                <div>
                  <button type="submit" className="main-btn">
                    Add
                  </button>

                  <Link to={`/store/${params.storeId}/${params.productId}`}>
                    <button type="button" className="back-btn">
                      Back
                    </button>
                  </Link>
                </div>
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
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
              Back
            </button>
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

export default AddProductImage;
