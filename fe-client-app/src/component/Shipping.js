import classes from "./Shipping.module.css";
const Shipping = () => {
  return (
    <div className={`container ${classes["content-grid"]}`}>
      <div className="row justify-content-around">
        <div className="col">
          <h2>FREE SHIPPING</h2>
          <p>Free shipping worlwide</p>
        </div>
        <div className="col">
          <h2>24 x 7 SERVICE</h2>
          <p>Free shipping worlwide</p>
        </div>
        <div className="col">
          <h2>FESTIVAL OFFER</h2>
          <p>Free shipping worlwide</p>
        </div>
      </div>
    </div>
  );
};
export default Shipping;
