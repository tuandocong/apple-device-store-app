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
        className="row align-items-center justify-content-between"
        style={{ marginTop: "15px" }}
      >
        <div className={`col ${classes.order}`} style={{ color: "red" }}>
          {props.data._id}
        </div>
        <div
          className={`col ${classes.order}`}
          style={{ color: "green", margin: "0 15px" }}
        >
          {props.data.user._id}
        </div>
        <div className={`col ${classes.order}`}>{props.data.user.username}</div>
        <div className={`col ${classes.order}`}>{props.data.user.phone}</div>
        <div className={`col ${classes.order}`}>{props.data.user.address}</div>
        <div className={`col ${classes.order}`}>
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "VND",
          }).format(props.data.totalPrice)}
        </div>
        <div className={`col ${classes.order}`}>Waiting for progressing</div>
        <div className={`col ${classes.order}`}>{props.data.status}</div>
        <div className={`col ${classes.order}`}>
          <button onClick={viewOrderHandler}>
            View <FaLongArrowAltRight style={{ marginLeft: "7px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ItemOrder;
