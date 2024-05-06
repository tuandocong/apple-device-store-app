import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ChatApp from "./pages/ChatApp";
import { useSelector } from "react-redux";
import ProductPage from "./pages/ProductPage";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

function App() {
  // ----------lay du lieu User--------------
  const user = useSelector((state) => state.loginPage.user);

  //kiem tra thong tin user da dang nhap?
  const ProtectedRoute = ({ children }) => {
    if (Object.values(user).length === 0) {
      console.log("Chưa có user đăng nhập!");
      return <Navigate to="/login" />;
    }

    //truong hop da co user dang nhap
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ padding: "0 10vw" }}>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
              exact
            ></Route>

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/edit-product/:productId"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatApp />
                </ProtectedRoute>
              }
            ></Route>

            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
