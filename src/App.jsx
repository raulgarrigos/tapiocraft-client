import "./App.css";
import { Routes, Route } from "react-router";

// pages
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/ProfileEdit";

import AllStores from "./pages/store/AllStores";
import StoreCreate from "./pages/store/StoreCreate";
import StoreEdit from "./pages/store/StoreEdit";
import StoreDetails from "./pages/store/StoreDetails";

import AllProducts from "./pages/products/AllProducts";
import ProductCreate from "./pages/products/ProductCreate";
import ProductEdit from "./pages/products/ProductEdit";
import ProductDetails from "./pages/products/ProductDetails";

import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";

// components
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/cart/Checkout";
import AllOrders from "./pages/orders/AllOrders";
import OrderDetails from "./pages/orders/OrderDetails";
import AddProductImage from "./pages/products/AddProductImage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/profile/:userId" element={<Profile />} />

        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <ProfileEdit />
            </IsPrivate>
          }
        />
        <Route path="/profile/:userId/orders" element={<AllOrders />} />
        <Route
          path="/profile/:userId/orders/:orderId"
          element={<OrderDetails />}
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout/:cartId" element={<Checkout />} />

        <Route path="/all-stores" element={<AllStores />} />
        <Route path="/store/create" element={<StoreCreate />} />
        <Route path="/store/:storeId" element={<StoreDetails />} />
        <Route path="/store/:storeId/edit" element={<StoreEdit />} />

        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/store/:storeId/add-product" element={<ProductCreate />} />
        <Route path="/store/:storeId/:productId" element={<ProductDetails />} />
        <Route
          path="/store/:storeId/:productId/edit"
          element={<ProductEdit />}
        />
        <Route
          path="/store/:storeId/:productId/image"
          element={<AddProductImage />}
        />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
