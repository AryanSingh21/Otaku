import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Cart from "./components/cart/cart";
import { loadUser } from "./actions/userActions";
import { useEffect, useState } from "react";
import store from "./store";
import Profile from "./components/user/Profile";
// import ProtectedRoute from "./components/route/ProtectedRoute";
import Shipping from "./components/cart/shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";

//payment stripe
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import AdminProducts from "./components/admin/AdminProducts";
import CreateProduct from "./components/admin/CreateProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import UpdateOrder from "./components/admin/UpdateOrder";
import AllUsers from "./components/admin/AllUsers";
import AllReviews from "./components/admin/AllReviews";

function App() {
  const [stripeApi, setStripeApi] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApi() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApi(data.stripeapi);
    }
    getStripeApi();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="conatiner container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/me" element={<Profile />} />

            {stripeApi && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApi)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route path="/checkout" element={<Shipping />} />
            <Route path="/confirmOrder" element={<ConfirmOrder />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/order/me" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/product/new" element={<CreateProduct />} />
            <Route path="/admin/products/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrdersList />} />
            <Route path="/admin/order/:id" element={<UpdateOrder />} />
            <Route path="/admin/users" element={<AllUsers />} />
            <Route path="/reviews" element={<AllReviews />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
