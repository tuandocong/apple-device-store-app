import classes from "./FormInput.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const FormInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // chế độ hiện tại Sign In/Up (default là Sign In)
  const [isSignIn, setIsSignIn] = useState(true);

  //gia tri Input
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  // kiem tra input hop le:
  const isNameValidate = nameInput.trim() !== "";
  const isEmailValidate = emailInput.trim() !== "" && emailInput.includes("@");
  const isPasswordValidate = passwordInput.length > 8;
  const isPhoneValidate = phoneInput.trim() !== "";

  //ktra tính validate:
  let isValidate = false;

  //khi ở chế độ Sign In:
  if (isSignIn && isEmailValidate && isPasswordValidate) {
    isValidate = true;
  }
  //khi ở chế độ Sign up:
  if (
    !isSignIn &&
    isNameValidate &&
    isEmailValidate &&
    isPasswordValidate &&
    isPhoneValidate
  ) {
    isValidate = true;
  }

  //ham cap nhap gia tri tu Input
  const nameInputChange = (e) => {
    setNameInput(e.target.value);
  };
  const emailInputChange = (e) => {
    setEmailInput(e.target.value);
  };
  const passwordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };
  const phoneInputChange = (e) => {
    setPhoneInput(e.target.value);
  };
  //-----------------------------------------------Ham su kien khi nhan Button----------------------------------------
  const signUpHandler = () => {
    // console.log(isValidate);
    if (!isSignIn) {
      //-------------------------------------------khi click button SIGN UP(dang ky):

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: emailInput,
        password: passwordInput,
        phone: phoneInput,
        username: nameInput,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (!result.isSuccess) {
            alert("Sign up fail!");
            console.log("result:", result);
            throw new Error(result.msg);
          }
          alert("Dang ky user thanh cong !!!");
          setIsSignIn(true);
        })
        .catch((error) => console.error(error.message));
    } else {
      //---------khi click button SIGN IN(dang nhap): ----------

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: emailInput,
        password: passwordInput,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}/auth/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (!result.isSuccess) {
            alert("Login fail!");
            console.log("result:", result);
            throw new Error(result.msg);
          }

          localStorage.setItem("curUser", JSON.stringify(result.user));
          localStorage.setItem("token", JSON.stringify(result.token));

          dispatch({ type: "ON_LOGIN" });
          dispatch({ type: "HOME_ACTIVE" });
          navigate("/");
          alert("LOGIN Thanh cong!!!");
        })
        .catch((error) => alert(error.message));
    }
  };

  //------------Ham thay doi SIGN IN/UP:
  const changStateHandler = () => {
    isValidate = false;
    setIsSignIn((prevState) => !prevState);
  };

  return (
    <div className={classes.contain}>
      <header>{isSignIn ? "Sign In" : "Sign Up"}</header>
      <div>
        {!isSignIn && (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={nameInput}
              onChange={nameInputChange}
            ></input>
          </div>
        )}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={emailInputChange}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={passwordInputChange}
          ></input>
        </div>
        {!isSignIn && (
          <div>
            <input
              type="tel"
              placeholder="Phone"
              value={phoneInput}
              onChange={phoneInputChange}
            ></input>
          </div>
        )}
        <button
          className={classes["submit-btn"]}
          onClick={signUpHandler}
          disabled={!isValidate}
        >
          {isSignIn ? "SIGN IN" : "SIGN UP"}
        </button>
        <div className={classes["change-box"]}>
          <p className={classes["text-change"]}>
            {isSignIn ? "Create an account?" : "Login?"}
          </p>
          <button onClick={changStateHandler} className={classes["click-btn"]}>
            {isSignIn ? "Sign Up" : "Click"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default FormInput;
