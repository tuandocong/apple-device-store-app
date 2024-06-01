import classes from "./CheckoutPage.module.css";
import CheckoutOrder from "../component/CheckoutOrder";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//--------------------
const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // -----   lấy data USER từ store   -----
  const token = useSelector((state) => state.loginPage.token);
  const user = useSelector((state) => state.loginPage.user);
  // -----   lấy data CART từ localStorage   -----
  let orderList = localStorage.getItem("arrItemsCart")
    ? JSON.parse(localStorage.getItem("arrItemsCart"))
    : [];
  let total = localStorage.getItem("totalCart")
    ? JSON.parse(localStorage.getItem("totalCart"))
    : 0;

  // state chứa giá trị cho các input:
  const [phoneInput, setPhoneInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  //cập nhật giá trị input
  const phoneChange = (e) => {
    setPhoneInput(e.target.value);
  };
  const addressChange = (e) => {
    setAddressInput(e.target.value);
  };

  //click Submit btn:
  const submitHandler = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      phone: phoneInput,
      address: addressInput,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/orders/add-order`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.isSuccess) {
          throw new Error(result.msg);
        }

        //xoa cart trong local
        localStorage.setItem("totalCart", JSON.stringify(""));
        localStorage.setItem("arrItemsCart", JSON.stringify([]));

        //reset input
        setPhoneInput("");
        setAddressInput("");

        //chuyen toi historyPage
        dispatch({ type: "HISTORY_ACTIVE" });
        navigate("/history");
        alert("Checkout Success !!!");
      })
      .catch((error) => console.error(error));
  };

  //kiem tra form input:
  let isValidate = false;
  if (
    phoneInput.trim() !== "" &&
    addressInput.trim() !== "" &&
    orderList.length > 0
  ) {
    isValidate = true;
  }

  return (
    <div>
      <div className={classes["checkout-p"]}>
        <div
          className={`row align-items-center justify-content-between ${classes.header}`}
        >
          <h2 className="col">CHECKOUT</h2>
          <div className={`col ${classes.link}`}>
            <div
              style={{
                display: "inline",
                color: "rgb(40, 40, 40)",
                paddingRight: "5px",
              }}
            >
              HOME/ CART/
            </div>
            CHECK OUT
          </div>
        </div>
        <div className="row">
          <h2 className={classes["text-h2"]}>BILLING DETAILS</h2>
        </div>
        <div className={`row ${classes.order}`} style={{ width: "100%" }}>
          <div
            className="col-12 col-lg-7"
            style={{ textAlign: "left", padding: "0 20px" }}
          >
            <form className={classes.form} onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="nameInput">FULL NAME:</label>
                <input
                  value={user.username}
                  readOnly
                  type="text"
                  className="form-control"
                  id="nameInput"
                  placeholder="Enter Your Full Name Here!"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="emailInput">Email:</label>
                <input
                  value={user.email}
                  readOnly
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="Enter Your Email Here!"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="phoneInput">PHONE NUMBER:</label>
                <input
                  value={phoneInput}
                  onChange={phoneChange}
                  type="tel"
                  className="form-control"
                  id="phoneInput"
                  placeholder="Enter Your Phone Number Here!"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="addressInput">ADDRESS:</label>
                <input
                  value={addressInput}
                  onChange={addressChange}
                  type="text"
                  className="form-control"
                  id="addressInput"
                  placeholder="Enter Your Address Here!"
                ></input>
              </div>
              <button className="btn-order" disabled={!isValidate}>
                Place order
              </button>
            </form>
          </div>
          <div className="col-12 col-lg-5">
            <CheckoutOrder data={orderList} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
