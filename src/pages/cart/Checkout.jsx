import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import service from "../../services/config";

function Checkout() {
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    surname: "",
    shippingAddress: "",
    paymentMethod: "",
  });

  const [isLoading, setIsLoading] = useState(null);

  const redirect = useNavigate();
  const params = useParams();

  const { loggedUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.post(`/checkout/${params.cartId}/order`, checkoutData);
      redirect(`/profile/${loggedUser._id}/orders`);
      console.log("Order placed");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="my-forms-container">
      <h3 className="my-forms-title">Confirm your order </h3>
      <div className="my-forms-containerForm">
        <label className="my-forms-label">Name:</label>
        <input
          type="name"
          name="name"
          onChange={handleInputChange}
          className="my-forms-input"
        />
      </div>

      <div className="containerForm">
        <label className="my-forms-label">Surname:</label>
        <input
          type="name"
          name="surname"
          onChange={handleInputChange}
          className="my-forms-input"
        />
      </div>

      <div className="containerForm">
        <label className="my-forms-label">Shipping Address:</label>
        <input
          type="name"
          name="shippingAddress"
          onChange={handleInputChange}
          className="my-forms-input"
        />
      </div>

      <div className="containerForm">
        <label className="my-forms-label">Payment Method:</label>
        <select
          name="paymentMethod"
          defaultValue=""
          onChange={handleInputChange}
          className="my-forms-select"
        >
          <option value="" disabled>
            Seleccionar método de pago
          </option>
          <option value="paypal">PayPal</option>
          <option value="creditCard">Tarjeta de crédito/débito</option>
        </select>
      </div>
      <button type="submit" className="my-forms-button" onClick={handleSubmit}>
        Confirm order
      </button>
    </div>
  );
}

export default Checkout;
