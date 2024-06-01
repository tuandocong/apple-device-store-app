import classes from "./Navbav.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaSearchPlus } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  //---------  lay du lieu tu localStorage
  let isLogin = false; // trạng thái Login/out
  const userLogin = JSON.parse(localStorage.getItem("curUser"));
  if (
    localStorage.getItem("curUser") &&
    Object.values(userLogin).length !== 0
  ) {
    // console.log(Object.values(curUser).length === 0);    //  kiem tra doi tuong tra ve === {} ?
    isLogin = true;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //hiển thị trạng thái Active phù hợp:
  const isActive = useSelector((state) => state.mainNavbar.isActiveState);

  const [isOpen, setIsOpen] = useState(false);

  //khi click vào btn:
  const homeButtonHandler = () => {
    dispatch({ type: "HOME_ACTIVE" });
    navigate("/");
  };
  const shopButtonHandler = () => {
    dispatch({ type: "SHOP_ACTIVE" });
    navigate("/shop");
  };
  const historyButtonHandler = () => {
    dispatch({ type: "HISTORY_ACTIVE" });
    navigate("/history");
  };
  const cartButtonHandler = () => {
    dispatch({ type: "CART_ACTIVE" });
    navigate("/cart");
  };
  const loginButtonHandler = () => {
    dispatch({ type: "LOGIN_ACTIVE" });
    navigate("/login");
  };
  const logoutButtonHandler = () => {
    localStorage.setItem("curUser", JSON.stringify({}));
    localStorage.setItem("token", JSON.stringify(""));
    localStorage.setItem("totalCart", JSON.stringify(""));
    localStorage.setItem("arrItemsCart", JSON.stringify([]));

    dispatch({ type: "ON_LOGOUT" });
    dispatch({ type: "LOGIN_ACTIVE" });
    navigate("/login");
  };

  const btnToggleHandler = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div>
      <div className={classes["text-header"]}>BOUTIQUE</div>

      <div className={classes["context-navbar"]}>
        {isLogin && (
          <div>
            <button className={classes.user}>
              <FaUserAlt className={classes.icons} /> {userLogin.username}
            </button>
          </div>
        )}

        <div className={classes.links}>
          <div>
            <button
              className={isActive === "home" ? classes.active : ""}
              onClick={homeButtonHandler}
            >
              <FaHome className={classes.icons} /> Home
            </button>
          </div>
          {isLogin && (
            <div>
              <button
                className={isActive === "shop" ? classes.active : ""}
                onClick={shopButtonHandler}
              >
                <FaSearchPlus className={classes.icons} /> Shop
              </button>
            </div>
          )}
          {isLogin && (
            <div>
              <button
                className={isActive === "cart" ? classes.active : ""}
                onClick={cartButtonHandler}
              >
                <FaShoppingCart className={classes.icons} /> Cart
              </button>
            </div>
          )}
          {isLogin && (
            <div>
              <button
                className={isActive === "history" ? classes.active : ""}
                onClick={historyButtonHandler}
              >
                <FaHistory className={classes.icons} /> History
              </button>
            </div>
          )}
          {!isLogin && (
            <div>
              <button
                className={isActive === "login" ? classes.active : ""}
                onClick={loginButtonHandler}
              >
                <FaSignInAlt className={classes.icons} /> Login
              </button>
            </div>
          )}

          {isLogin && (
            <div>
              <button onClick={logoutButtonHandler}>
                <FaSignOutAlt className={classes.icons} /> Logout
              </button>
            </div>
          )}
        </div>

        {isLogin && (
          <div className={classes["btn-toggle"]}>
            <button onClick={btnToggleHandler}>
              {isOpen ? (
                <FaTimes className={classes["icons-toggle"]} />
              ) : (
                <FaBars className={classes["icons-toggle"]} />
              )}
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className={classes["containt-toggle"]}>
          <div className={classes["links-toggle"]}>
            <div>
              <button
                className={isActive === "home" ? classes.active : ""}
                onClick={homeButtonHandler}
              >
                Home <FaHome className={classes.icons} />
              </button>
            </div>
            {isLogin && (
              <div>
                <button
                  className={isActive === "shop" ? classes.active : ""}
                  onClick={shopButtonHandler}
                >
                  Shop <FaSearchPlus className={classes.icons} />
                </button>
              </div>
            )}
            {isLogin && (
              <div>
                <button
                  className={isActive === "cart" ? classes.active : ""}
                  onClick={cartButtonHandler}
                >
                  Cart <FaShoppingCart className={classes.icons} />
                </button>
              </div>
            )}
            {isLogin && (
              <div>
                <button
                  className={isActive === "history" ? classes.active : ""}
                  onClick={historyButtonHandler}
                >
                  History <FaHistory className={classes.icons} />
                </button>
              </div>
            )}
            {!isLogin && (
              <div>
                <button
                  className={isActive === "login" ? classes.active : ""}
                  onClick={loginButtonHandler}
                >
                  Login <FaSignInAlt className={classes.icons} />
                </button>
              </div>
            )}

            {isLogin && (
              <div>
                <button onClick={logoutButtonHandler}>
                  Logout <FaSignOutAlt className={classes.icons} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
