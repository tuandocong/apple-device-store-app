import classes from "./ListItemCart.module.css";
import ItemCart from "./ItemCart";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ListItemCart = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //chuyển trang ShopPage
  const continueShoppingBtn = () => {
    dispatch({ type: "SHOP_ACTIVE" });
    navigate("/shop");
  };

  //chuyển trang Checkout
  const checkoutBtn = () => {
    navigate("/checkout");
  };
  return (
    <div className="container">
      <div className={`row ${classes["header-table"]} justify-content-between`}>
        <div className="col-2">IMAGE</div>
        <div className="col-3">PRODUCT</div>
        <div className="col">PRICE</div>
        <div className="col">QUANTITY</div>
        <div className="col">TOTAL</div>
        <div className="col">REMOVE</div>
      </div>
      {props.listCart.length === 0 ? (
        <div className="row align-items-center">
          <div
            style={{ fontSize: "24px", padding: "30px", fontStyle: "italic" }}
          >
            Nothing...
          </div>
        </div>
      ) : (
        props.listCart.map((item) => (
          <div className="row" key={item._id}>
            <ItemCart data={item} reloadHandler={props.reloadHandler} />
          </div>
        ))
      )}
      <div
        className={`row ${classes["button-table"]} justify-content-between align-items-center`}
      >
        <div className="col " style={{ textAlign: "left" }}>
          <button onClick={continueShoppingBtn}>
            <FaLongArrowAltLeft style={{ marginRight: "7px" }} />
            Continue Shopping
          </button>
        </div>
        <div className="col" style={{ textAlign: "right" }}>
          <button onClick={checkoutBtn}>
            Proceed to checkout
            <FaLongArrowAltRight style={{ marginLeft: "7px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ListItemCart;
