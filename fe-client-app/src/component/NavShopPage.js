import classes from "./NavShopPage.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
const NavShopPage = () => {
  const dispatch = useDispatch();

  //-----   trạng thái chứa giá trị active trên navbar   -----
  const [btnActive, setBtnActive] = useState("all");

  //------   Khi click vào 1 giá trị trên Navbar   -----

  // 1. All
  const allCategoryFn = () => {
    setBtnActive("all");
    dispatch({ type: "FILTER_CATEGORY", payload: "all" });
  };
  // 2. iphone
  const iphoneCategoryFn = () => {
    setBtnActive("iphone");
    dispatch({ type: "FILTER_CATEGORY", payload: "iphone" });
  };
  // 3. ipad
  const ipadCategoryFn = () => {
    setBtnActive("ipad");
    dispatch({ type: "FILTER_CATEGORY", payload: "ipad" });
  };
  // 4.  mac
  const macCategoryFn = () => {
    setBtnActive("macbook");
    dispatch({ type: "FILTER_CATEGORY", payload: "macbook" });
  };
  // 5. airpod
  const airPodCategoryFn = () => {
    setBtnActive("airpod");
    dispatch({ type: "FILTER_CATEGORY", payload: "airpod" });
  };
  // 6. watch
  const watchCategoryFn = () => {
    setBtnActive("watch");
    dispatch({ type: "FILTER_CATEGORY", payload: "watch" });
  };
  // 7. mouse
  const mouseCategoryFn = () => {
    setBtnActive("mouse");
    dispatch({ type: "FILTER_CATEGORY", payload: "mouse" });
  };
  // 8. keyboard
  const keyCategoryFn = () => {
    setBtnActive("keyboard");
    dispatch({ type: "FILTER_CATEGORY", payload: "keyboard" });
  };
  // 9. orther
  const ortherCategoryFn = () => {
    setBtnActive("orther");
    dispatch({ type: "FILTER_CATEGORY", payload: "orther" });
  };

  return (
    <div className={classes["nav-shop"]}>
      <header>CATEGORIES</header>
      <div className={classes.contain}>
        <div className={classes.apple}>APPLE</div>
        <ul>
          <li>
            <button
              className={`${btnActive === "all" ? classes["active-btn"] : ""}`}
              onClick={allCategoryFn}
            >
              All
            </button>
          </li>
        </ul>

        <div className={classes.categories}>IPHONE & MAC</div>
        <ul>
          <li>
            <button
              className={`${
                btnActive === "iphone" ? classes["active-btn"] : ""
              }`}
              onClick={iphoneCategoryFn}
            >
              Iphone
            </button>
          </li>
          <li>
            <button
              className={`${btnActive === "ipad" ? classes["active-btn"] : ""}`}
              onClick={ipadCategoryFn}
            >
              Ipad
            </button>
          </li>
          <li>
            <button
              className={`${
                btnActive === "macbook" ? classes["active-btn"] : ""
              }`}
              onClick={macCategoryFn}
            >
              Macbook
            </button>
          </li>
        </ul>
        <div className={classes.categories}>WIRELESS</div>
        <ul>
          <li>
            <button
              className={`${
                btnActive === "airpod" ? classes["active-btn"] : ""
              }`}
              onClick={airPodCategoryFn}
            >
              Airpod
            </button>
          </li>
          <li>
            <button
              className={`${
                btnActive === "watch" ? classes["active-btn"] : ""
              }`}
              onClick={watchCategoryFn}
            >
              Watch
            </button>
          </li>
        </ul>
        <div className={classes.categories}>OTHER</div>
        <ul>
          <li>
            <button
              className={`${
                btnActive === "mouse" ? classes["active-btn"] : ""
              }`}
              onClick={mouseCategoryFn}
            >
              Mouse
            </button>
          </li>
          <li>
            <button
              className={`${
                btnActive === "keyboard" ? classes["active-btn"] : ""
              }`}
              onClick={keyCategoryFn}
            >
              Keyboard
            </button>
          </li>
          <li>
            <button
              className={`${
                btnActive === "orther" ? classes["active-btn"] : ""
              }`}
              onClick={ortherCategoryFn}
            >
              Orther
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavShopPage;
