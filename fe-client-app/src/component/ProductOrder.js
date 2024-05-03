import classes from "./ProductOrder.module.css";

const ProductOrder = (props) => {
  return (
    <div>
      <div
        className="row align-items-center justify-content-between"
        style={{ marginTop: "15px" }}
      >
        <div className={`col-3 ${classes.product}`}>{props.data.productId}</div>

        <div className="col-3">
          <img src={props.data.img} alt={"this is a img"} width={"100%"} />
        </div>

        <div className={`col-3 ${classes.product}`}>
          {props.data.productName}
        </div>

        <div className={`col ${classes.product}`}>
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "VND",
          }).format(props.data.price)}
        </div>

        <div className={`col ${classes.product}`}>{props.data.quantity}</div>
      </div>
    </div>
  );
};
export default ProductOrder;
