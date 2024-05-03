import banner from "../img/banner1.jpg";
import classes from "./Banner.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // chuyển trang Shoppage
  const bannerBtnHandler = () => {
    dispatch({ type: "SHOP_ACTIVE" });
    navigate("/shop");
  };
  return (
    <div className={classes.banner}>
      <img src={banner} alt="this is a img" style={{ width: "100%" }} />
      <div className={classes["banner-context"]}>
        <p>NEW INSPIRATION 2020</p>
        <h2> 20% OFF ON NEW SEASON</h2>
        <button onClick={bannerBtnHandler}>Browse collections</button>
      </div>
    </div>
  );
};
export default Banner;
