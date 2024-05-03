import classes from "./CartTotal.module.css";
import { FaGift } from "react-icons/fa";
const CartTotal = (props) => {
  //ngăn chặn cơ chế mặc định tải lại trang
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.cart}>
      <header>CART TOTAL</header>
      <div className="d-flex justify-content-between">
        <div className={classes.text}>SUBTOTAL</div>
        <div className={classes.subtotal}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.total)}
        </div>
      </div>
      <div className={`d-flex justify-content-between ${classes.total}`}>
        <div className={classes.text}>TOTAL</div>
        <div className={classes["total-text"]}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.total)}
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Enter your coupon"></input>
        <button>
          <FaGift style={{ color: "white", marginRight: "6px" }} /> Apply coupon
        </button>
      </form>
    </div>
  );
};
export default CartTotal;
