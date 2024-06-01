import classes from "./CartPage.module.css";
import ListItemCart from "../component/ListItemCart";
import CartTotal from "../component/CartTotal";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [totalCart, setTotalCart] = useState(0);
  const [arrItemsCart, setArrItemsCart] = useState([]);
  const token = useSelector((state) => state.loginPage.token);
  const [reloadCart, setReloadCart] = useState(false);

  const reloadCartPageHandler = () => {
    setReloadCart((prevState) => !prevState);
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/carts/getById`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setArrItemsCart(result.products);
        localStorage.setItem("arrItemsCart", JSON.stringify(result.products));
        const total = result.products.reduce(
          (acc, current) => acc + current.productId.price * current.quantity,
          0
        );
        setTotalCart(total);
        localStorage.setItem("totalCart", JSON.stringify(total));
      })
      .catch((error) => console.error(error));
  }, [token, reloadCart]);

  return (
    <div>
      <div className={classes.cart}>
        <div
          className={`row align-items-center justify-content-between ${classes.header}`}
        >
          <h2 className="col">CART</h2>
          <p className="col">CART PAGE</p>
        </div>
        <div className="row">
          <h2 className={classes["text-h2"]}>SHOPPING CART</h2>
        </div>
        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col-12 col-lg-9">
            <ListItemCart
              listCart={arrItemsCart}
              reloadHandler={reloadCartPageHandler}
            />
          </div>
          <div className="col12 col-lg-3">
            <CartTotal total={totalCart} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
