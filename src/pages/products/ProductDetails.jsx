import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
import { Carousel } from "react-responsive-carousel";
import { Rating } from "react-simple-star-rating";

function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [storeDetails, setStoreDetails] = useState(null);
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
      const productResponse = await service.get(
        `/store/${params.storeId}/products/${params.productId}`
      );
      setProductDetails(productResponse.data);

      const storeResponse = await service.get(
        `/store/${params.storeId}/details`
      );
      setStoreDetails(storeResponse.data);

      const reviewsResponse = await service.get(
        `/products/${params.productId}/reviews`
      );
      console.log(reviewsResponse.data);
      setReviews(reviewsResponse.data);

      // Verificar si el usuario ha comprado el producto
      if (loggedUser) {
        const orderResponse = await service.get(
          `/orders/${loggedUser._id}/list`
        );
        const hasPurchased = orderResponse.data.some((order) =>
          order.products.some((product) => product.product === params.productId)
        );
        console.log("Has purchased:", hasPurchased);
        setHasPurchased(hasPurchased);
      }

      setIsLoading(false);
    } catch (error) {
      redirect("/error");
    }
  };

  const addToCart = async () => {
    try {
      await service.post(`/cart/products/${params.productId}`);
      getData();
    } catch (error) {
      redirect("/error");
    }
  };

  const handleDeleteImage = async (imagePath) => {
    try {
      await service.delete(
        `/store/${params.storeId}/products/${params.productId}/image`,
        { data: { imagePath } }
      );
      getData();
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
      await service.post(`/products/${params.productId}/review`, {
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
      await service.delete(`/products/${params.productId}/reviews/${reviewId}`);
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

  return (
    <div>
      {/* Ficha del producto */}
      <div className="flex font-sans bg-white rounded-lg shadow-md mt-3 py-3 px-3">
        <div className="flex-none w-56 relative">
          <Carousel showArrows={true} showStatus={false} showIndicators={false}>
            {productDetails.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {loggedUser && loggedUser._id === storeDetails?.owner && (
                  <button
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded text-sm"
                    onClick={() => handleDeleteImage(image)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </Carousel>
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex justify-start font-medium mb-3 text-slate-900 text-2xl">
              {productDetails.name}
            </h1>
            <div className="flex-auto text-sm font-medium text-slate-400 text-right">
              {productDetails.stock > 1 ? "In stock" : "Out of stock"}
            </div>
          </div>
          <div className=" flex justify-start w-full text-3xl mb-3 font-bold text-violet-600">
            {productDetails.price}€
          </div>
          <div className="flex justify-start font-medium mb-3 text-slate-900 text-lg">
            <h3>Description</h3>
          </div>
          <div className="flex justify-start font-medium mb-3 text-slate-600 text-base">
            <p>{productDetails.description}</p>
          </div>
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
          <div className="flex space-x-4 mb-5 text-sm font-medium">
            {(!loggedUser ||
              (loggedUser && loggedUser._id !== storeDetails?.owner)) && (
              <button
                className="alt-btn"
                type="button"
                onClick={addToCart}
                disabled={productDetails.stock === 0}
              >
                Add to bag
              </button>
            )}
            {loggedUser && loggedUser._id === storeDetails?.owner && (
              <>
                <Link
                  to={`/store/${params.storeId}/${productDetails._id}/edit`}
                >
                  <button className="main-btn">Edit Product</button>
                </Link>
                <Link
                  to={`/store/${params.storeId}/${productDetails._id}/image`}
                >
                  <button className="alt-btn">Add Image</button>
                </Link>
              </>
            )}
          </div>
          <p className="flex justify-start text-sm text-slate-500">
            Free shipping on all european orders.
          </p>
        </form>
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
                  {review.rating === 5 && <span>⭐⭐⭐⭐⭐</span>}
                  {review.rating === 4 && <span>⭐⭐⭐⭐</span>}
                  {review.rating === 3 && <span>⭐⭐⭐</span>}
                  {review.rating === 2 && <span>⭐⭐</span>}
                  {review.rating === 1 && <span>⭐</span>}
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
      {loggedUser && loggedUser._id !== storeDetails?.owner && hasPurchased && (
        <div className="font-sans bg-white rounded-lg shadow-md mt-3 py-3 px-3 max-w-lg mx-auto">
          <form className="p-6" onSubmit={handleReviewSubmit}>
            <div className="mb-6">
              <h2 className="font-medium mb-3 text-lg">Your opinion matters</h2>
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
  );
}

export default ProductDetails;
