import classes from "./Navbav.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaDiceD6 } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  //---------  lay du lieu tu localStorage
  let isLogin = false; // trạng thái Login/out
  let isAdmin = false;
  const userLogin = JSON.parse(localStorage.getItem("curUser"));
  if (Object.values(userLogin).length !== 0) {
    // console.log(Object.values(curUser).length === 0);    //  kiem tra doi tuong tra ve === {} ?
    isLogin = true;
  }
  if (userLogin.role === "admin") {
    isAdmin = true;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //hiển thị trạng thái Active phù hợp:
  const isActive = useSelector((state) => state.mainNavbar.isActiveState);

  //khi click vào btn:
  const homeButtonHandler = () => {
    dispatch({ type: "HOME_ACTIVE" });
    navigate("/");
  };
  const productButtonHandler = () => {
    dispatch({ type: "PRODUCTS_ACTIVE" });
    navigate("/products");
  };
  const chatButtonHandler = () => {
    dispatch({ type: "CHAT_ACTIVE" });
    navigate("/chat");
  };
  const loginButtonHandler = () => {
    dispatch({ type: "LOGIN_ACTIVE" });
    navigate("/login");
  };
  const logoutButtonHandler = () => {
    localStorage.setItem("curUser", JSON.stringify({}));
    localStorage.setItem("token", JSON.stringify(""));

    dispatch({ type: "ON_LOGOUT" });
    dispatch({ type: "LOGIN_ACTIVE" });
    navigate("/login");
  };

  return (
    <div className={classes["context-navbar"]}>
      <div className={classes["items-nav"]}>
        {isLogin && isAdmin && (
          <button
            className={isActive === "home" ? classes.active : ""}
            onClick={homeButtonHandler}
          >
            <FaClipboardList className={classes.icons} />
            Home
          </button>
        )}
        {isLogin && isAdmin && (
          <button
            className={isActive === "products" ? classes.active : ""}
            onClick={productButtonHandler}
          >
            <FaDiceD6 className={classes.icons} />
            Products
          </button>
        )}
        {isLogin && (
          <button
            className={isActive === "chat" ? classes.active : ""}
            onClick={chatButtonHandler}
          >
            <FaFacebookMessenger className={classes.icons} />
            ChatApp
          </button>
        )}
      </div>

      <div className={classes["items-nav"]}>
        {!isLogin && (
          <button
            className={isActive === "login" ? classes.active : ""}
            onClick={loginButtonHandler}
          >
            <FaSignInAlt className={classes.icons} />
            Login
          </button>
        )}

        {isLogin && (
          <div className={classes.user}>
            <FaUserAlt className={classes.icons} />
            {userLogin.username}
          </div>
        )}
        {isLogin && (
          <button onClick={logoutButtonHandler}>
            <FaSignOutAlt className={classes.icons} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
