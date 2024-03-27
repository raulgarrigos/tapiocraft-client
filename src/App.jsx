import "./App.css";
import { Routes, Route } from "react-router";

// pages
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";
import Navbar from "./components/Navbar";
import ProfileEdit from "./pages/profile/ProfileEdit";
import IsPrivate from "./components/IsPrivate";
import StoreCreate from "./pages/store/StoreCreate";
import StoreEdit from "./pages/store/StoreEdit";
import AllStores from "./pages/store/AllStores";

// components

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

        <Route path="/all-stores" element={<AllStores />} />
        <Route path="/store/create" element={<StoreCreate />} />
        <Route path="/store/create" element={<StoreEdit />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
