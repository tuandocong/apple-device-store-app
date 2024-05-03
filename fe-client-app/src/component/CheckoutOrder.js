import classes from "./CheckoutOrder.module.css";
import ItemCheckout from "./ItemCheckout";
const CheckoutOrder = (props) => {
  return (
    <div className={classes.order}>
      <header>YOUR ORDER</header>
      {props.data.map((i) => (
        <ItemCheckout key={i._id} item={i} />
      ))}
      <div className={`d-flex justify-content-between ${classes.total}`}>
        <div className={classes.text}>TOTAL</div>
        <div className={classes["total-text"]}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.total)}
        </div>
      </div>
    </div>
  );
};
export default CheckoutOrder;
