import classes from "./Popup.module.css";
import img from "../img/product_2.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Popup = (props) => {
  // console.log(props.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginPage.user);

  // default data
  const [data, setData] = useState({
    _id: "",
    img1: img,
    name: "Iphone",
    price: 1000000,
    short_desc: "nothing",
  });

  //lấy data
  useEffect(() => {
    if (props.data.length !== 0) {
      setData(props.data);
    }
  }, [props.data]);

  // click X button:
  const hidePopupHandler = () => {
    dispatch({ type: "HIDE_POPUP" });
    console.log("Click hide popup");
  };

  const detailBtnHandler = () => {
    // console.log(data);
    if (Object.values(user).length === 0) {
      dispatch({ type: "LOGIN_ACTIVE" });
      navigate("/login");
    } else {
      dispatch({ type: "HIDE_POPUP" });
      dispatch({ type: "SHOP_ACTIVE" });
      navigate(`/detail/${data._id}`);
    }
  };

  return (
    <div>
      <div className={classes.backdrop}></div>
      <div className={classes.popup}>
        <div className={`container ${classes["grid-contain"]}`}>
          <div className="row g-5">
            <div className="col">
              <img
                src={data.img1}
                alt="this is a product"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col">
              <div className={classes.name}>{data.name}</div>
              <div className={classes.price}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.price)}
              </div>
              <div className={classes["short-desc"]}>{data.short_desc}</div>
              <button
                type="button"
                className="btn btn-dark"
                style={{ borderRadius: "0", padding: "7px 40px" }}
                onClick={detailBtnHandler}
              >
                View Detail
              </button>
            </div>
            <button onClick={hidePopupHandler} className={classes["btn-x"]}>
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popup;
