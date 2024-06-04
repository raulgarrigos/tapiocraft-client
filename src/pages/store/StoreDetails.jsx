import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config";
import { Rating } from "react-simple-star-rating";

function StoreDetails() {
  const [storeDetails, setStoreDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(false);

  const params = useParams();
  const redirect = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/store/${params.storeId}/details`);
      console.log(response.data);
      setStoreDetails(response.data);

      const productsResponse = await service.get(
        `/store/${params.storeId}/products`
      );
      console.log(productsResponse.data);
      setProducts(productsResponse.data);

      const reviewsResponse = await service.get(
        `/store/${params.storeId}/reviews`
      );
      console.log(reviewsResponse.data);
      setReviews(reviewsResponse.data);

      // Verificar si el usuario ha comprado el producto
      if (loggedUser) {
        const orderResponse = await service.get(
          `/orders/${loggedUser._id}/list`
        );
        console.log(orderResponse.data);
        const hasPurchased = orderResponse.data.some((order) =>
          order.stores.includes(params.storeId)
        );
        console.log("Has purchased:", hasPurchased);
        setHasPurchased(hasPurchased);
      }

      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      await service.post(`/store/${params.storeId}/review`, {
        rating,
        comment,
      });
      getData();
      setRating(0);
      setComment("");
    } catch (error) {
      redirect("/error");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await service.delete(`/store/${params.storeId}/reviews/${reviewId}`);
      // Actualizar la lista de reseñas después de eliminar la reseña
      const updatedReviews = reviews.filter(
        (review) => review._id !== reviewId
      );
      setReviews(updatedReviews);
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading..</h3>;
  }

  // ! AGREGAR CONDICIONAL IF DE ADDRESS, REFUNDPOLICY

  return (
    <div className="container mx-auto mt-8">
      <div className="flex  lg:flex-row gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          {storeDetails && (
            <div key={storeDetails._id}>
              <p className="text-3xl font-bold">{storeDetails.name}</p>
              <p className="text-gray-700 my-4">{storeDetails.description}</p>
              <p className="text-gray-700 my-4">{storeDetails.category}</p>
            </div>
          )}

          {loggedUser?._id === storeDetails?.owner && (
            <div className="mt-4">
              <Link
                to={`/store/${storeDetails._id}/edit`}
                className="mr-2 inline-block"
              >
                <button className="main-btn">Edit store</button>
              </Link>

              <Link
                to={`/store/${storeDetails._id}/add-product`}
                className="ml-2 inline-block"
              >
                <button className="alt-btn">Add a product</button>
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 className="text-3xl font-bold">Productos</h2>
          {products.map((product) => (
            <div
              key={product._id}
              className="mb-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-pistachoGreen my-4"
            >
              <Link
                to={`/store/${params.storeId}/${product._id}`}
                className="text-2xl font-semibold text-pistachoGreen hover:text-pistachoGreen"
              >
                <p>
                  {product.name} | {product.price}€
                </p>
              </Link>
            </div>
          ))}
        </div>

        {/* Sección de reviews */}
        <div className="font-sans bg-white rounded-lg shadow-md mt-3 py-3 px-3">
          <div className="p-6">
            <div>
              <h2 className="font-medium mb-3 text-lg">Reviews</h2>
              {reviews.length === 0 && <p>No reviews yet.</p>}
              {reviews.map((review, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm font-medium text-slate-600">
                    Rating: {review.rating}
                  </p>
                  <p className="text-sm text-slate-600">{review.comment}</p>
                  <p className="text-sm text-slate-600">
                    Written by: {review.user.username}
                  </p>
                  {/* Agregar botón para eliminar la reseña */}
                  {loggedUser && loggedUser._id === review.user._id && (
                    <button
                      className="text-sm text-red-600"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      Delete Review
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Escribir una review */}
        {loggedUser &&
          loggedUser._id !== storeDetails?.owner &&
          hasPurchased && (
            <div className="font-sans bg-white rounded-lg shadow-md mt-3 py-3 px-3 max-w-lg mx-auto">
              <form className="p-6" onSubmit={handleReviewSubmit}>
                <div className="mb-6">
                  <h2 className="font-medium mb-3 text-lg">
                    Your opinion matters
                  </h2>
                  <label
                    htmlFor="rating"
                    className="block mb-1 text-sm font-medium text-slate-600"
                  >
                    Rating:
                  </label>
                  <div>
                    <Rating
                      onClick={handleRating}
                      initialValue={rating}
                      ratingValue={rating}
                      required
                    />
                  </div>
                  <label
                    htmlFor="comment"
                    className="block mb-1 text-sm font-medium text-slate-600"
                  >
                    Comment:
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border rounded py-1 px-2 mb-3 w-full max-w-full"
                    style={{ maxWidth: "500px" }}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="main-btn text-white py-2 px-4 rounded"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}
      </div>
    </div>
  );
}

export default StoreDetails;
