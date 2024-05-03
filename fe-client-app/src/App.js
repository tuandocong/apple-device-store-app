import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import PopupChat from "./component/PopupChat";
import HistoryPage from "./pages/HistoryPage";
import DetailOrder from "./pages/DetailOrder";
import { useSelector } from "react-redux";

function App() {
  // ----------lay du lieu tu API--------------
  const [listProduct, setListProduct] = useState([]);
  const [trendingProds, setTrendingProds] = useState([]);
  const user = useSelector((state) => state.loginPage.user);

  //kiem tra thong tin user da dang nhap?
  const ProtectedRoute = ({ children }) => {
    // console.log("user:", user);
    // console.log(Object.values(user).length === 0);

    if (Object.values(user).length === 0) {
      //trung hop user = {}
      console.log("chua dang nhap!");
      return <Navigate to="/login" />;
    }
    //truong hop da co user dang nhap
    return children;
  };

  const fetchAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
    const data = await response.json();
    const products = [];

    setListProduct(data);
    for (let i = 0; i < 8; i++) {
      products.push(data[i]);
    }
    setTrendingProds(products);
    // console.log(products);
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ padding: "0 10vw" }}>
          <Navbar />

          {Object.values(user).length !== 0 && <PopupChat />}

          <Routes>
            <Route
              path="/"
              element={<HomePage data={trendingProds} />}
              exact
            ></Route>

            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <ShopPage data={listProduct} />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/detail/:productId"
              element={
                <ProtectedRoute>
                  <DetailPage data={listProduct} />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <DetailOrder />
                </ProtectedRoute>
              }
            ></Route>

            <Route path="/login" element={<LoginPage />}></Route>

            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
