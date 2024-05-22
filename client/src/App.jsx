import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillsPage from "./pages/BillsPage";
import CustomersPage from "./pages/CustomersPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/card"
          element={
            <RouteControl>
              <CartPage />
            </RouteControl>
          }
        />
        <Route
          path="/bills"
          element={
            <RouteControl>
              <BillsPage />
            </RouteControl>
          }
        />
        <Route
          path="/customers"
          element={
            <RouteControl>
              <CustomersPage />
            </RouteControl>
          }
        />
        <Route
          path="/statistic"
          element={
            <RouteControl>
              <StatisticPage />
            </RouteControl>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <RouteControl>
              <ProductPage />
            </RouteControl>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("postUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
