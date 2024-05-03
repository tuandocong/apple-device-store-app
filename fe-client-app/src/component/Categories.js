import classes from "./Categories.module.css";
import imgIphone from "../img/product_1.png";
import imgMac from "../img/product_2.png";
import imgIpad from "../img/product_3.png";
import imgWatch from "../img/product_4.png";
import imgAirPods from "../img/product_5.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.loginPage.user);
  // chuyển trang ShopPage:
  const goToShopHandler = () => {
    if (Object.values(user).length === 0) {
      dispatch({ type: "LOGIN_ACTIVE" });
      navigate("/login");
    } else {
      dispatch({ type: "SHOP_ACTIVE" });
      navigate("/shop");
    }
  };

  return (
    <div>
      <header className={classes.header}>
        <p>CAREFULY CREATED COLLECTIONS</p>
        <div>BROWSE OUR CATEGORIES</div>
      </header>
      <div className={`container ${classes.categories}`}>
        <div className="row justify-content-between ">
          <div className="col">
            <button onClick={goToShopHandler}>
              <img src={imgIphone} alt="this is Iphone img" width={"100%"} />
            </button>
          </div>
          <div className="col">
            <button onClick={goToShopHandler}>
              <img src={imgMac} alt="this is a img" width={"100%"} />
            </button>
          </div>
        </div>
        <div className="row justify-content-between ">
          <div className="col">
            <button onClick={goToShopHandler}>
              <img src={imgIpad} alt="this is a img" width={"100%"} />
            </button>
          </div>
          <div className="col">
            <button onClick={goToShopHandler}>
              <img src={imgWatch} alt="this is a img" width={"100%"} />
            </button>
          </div>
          <div className="col">
            <button onClick={goToShopHandler}>
              <img src={imgAirPods} alt="this is a img" width={"100%"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categories;
