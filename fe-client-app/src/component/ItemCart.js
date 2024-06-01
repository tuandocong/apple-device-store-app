import classes from "./ItemCart.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
// import { useState } from "react";
const ItemCart = (props) => {
  const token = useSelector((state) => state.loginPage.token);
  const total = props.data.productId.price * props.data.quantity;

  const deleteItemHandler = () => {
    // const confirmValue = confirm(
    //   "Bạn có chắc chắn muốn thực hiện thao tác này không?"
    // );
    // if (confirmValue) {
    // //...
    // }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      productId: props.data.productId._id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/carts/remove-cart`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        props.reloadHandler();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div
        className="row align-items-center justify-content-between"
        style={{ marginTop: "15px" }}
      >
        <div className="col-2">
          <img
            src={props.data.productId.img1}
            alt={"this is a img"}
            width={"100%"}
          />
        </div>

        <div className={`col-2 ${classes.product}`}>
          {" "}
          {props.data.productId.name}
        </div>
        <div className={`col-2 ${classes.price}`}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.data.productId.price)}
        </div>
        <div className="col-2">
          <input
            type="number"
            value={props.data.quantity}
            readOnly
            className={classes.quantity}
            // onChange={quantityChangeHandler}
          ></input>
        </div>
        <div className={`col-2 ${classes.price}`}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(total)}
        </div>
        <div className="col-2">
          <button className={classes.icon} onClick={deleteItemHandler}>
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ItemCart;
