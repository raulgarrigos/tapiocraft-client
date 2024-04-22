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
      await service.post(`/checkout/${params.cartId}`, checkoutData);
      // !redirigir a una página de orders
      redirect(`/`);
      console.log("Order placed");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  // Styles
  const containerStyle = {
    maxWidth: "600px",
    backgroundColor: "grey",
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <div>
      <h3>Confirm your order </h3>
      <Container className="text-center" style={containerStyle}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUserName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formUserSurname">
            <Form.Label>Surname:</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formUserShippingAddress">
            <Form.Label>Shipping Address:</Form.Label>
            <Form.Control
              type="text"
              name="shippingAddress"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPaymentMethod">
            <Form.Label>Payment Method:</Form.Label>
            <Form.Control
              as="select"
              name="paymentMethod"
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled>
                Seleccionar método de pago
              </option>
              <option value="paypal">PayPal</option>
              <option value="creditCard">Tarjeta de crédito/débito</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="light"
            type="submit"
            style={{ backgroundColor: "#fdb14d" }}
          >
            Confirm changes
          </Button>

          <br />
        </Form>
      </Container>
    </div>
  );
}

export default Checkout;
