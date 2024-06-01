import classes from "./ItemOrder.module.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ItemOrder = (props) => {
  const navigate = useNavigate();
  const viewOrderHandler = () => {
    // console.log(props.data._id);
    navigate(`/order/${props.data._id}`);
  };

  return (
    <div>
      <div
        className={`row align-items-center justify-content-between ${classes["row-table"]}`}
      >
        <div
          className={`col-2 ${classes.order} ${classes.overflow}`}
          style={{ color: "red" }}
        >
          {props.data._id}
        </div>
        <div
          className={`col-2 ${classes.order} ${classes.overflow}`}
          style={{ color: "green" }}
        >
          {props.data.user._id}
        </div>
        <div className={`col ${classes.order} ${classes.overflow}`}>
          {props.data.user.username}
        </div>
        <div className={`col ${classes.order} ${classes.overflow}`}>
          {props.data.user.phone}
        </div>
        <div className={`col-2 ${classes.order} ${classes.overflow}`}>
          {props.data.user.address}
        </div>
        <div className={`col ${classes.order} ${classes.overflow}`}>
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "VND",
          }).format(props.data.totalPrice)}
        </div>
        <div className={`col ${classes.order} ${classes.overflow}`}>
          Waiting for progressing
        </div>
        <div className={`col ${classes.order} ${classes.overflow}`}>
          {props.data.status}
        </div>
        <div className={`col ${classes.order} ${classes.overflow}`}>
          <button className={classes.overflow} onClick={viewOrderHandler}>
            View <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ItemOrder;
