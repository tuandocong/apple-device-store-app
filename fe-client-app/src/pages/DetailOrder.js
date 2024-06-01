import classes from "./DetailOrder.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductOrder from "../component/ProductOrder";

const DetailOrder = () => {
  const token = useSelector((state) => state.loginPage.token);
  const [dataOrder, setDataOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/orders/order/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.isSuccess) {
          throw new Error(result.msg);
        }
        // console.log(result.data);
        setDataOrder(result.data);
      })
      .catch((error) => console.error(error));
  }, [token, id]);

  return (
    <div>
      <div className={classes["detail-order-p"]}>
        <div
          className={`row align-items-center justify-content-between ${classes.header}`}
        >
          <h2 className="col">DETAIL ORDER</h2>
          <p className="col">DETAIL ORDER</p>
        </div>

        <div className={classes.information}>
          <h1>INFORMATION ORDER</h1>
          <div className={classes["information-user"]}>
            <div className={classes.title}>
              <p>ID User:</p>
              <p>Full Name: </p>
              <p>Phone: </p>
              <p>Address: </p>
              <p>Total: </p>
            </div>
            <div>
              <p> {dataOrder.user ? dataOrder.user._id : ""}</p>
              <p> {dataOrder.user ? dataOrder.user.username : ""}</p>
              <p> {dataOrder.user ? dataOrder.user.phone : ""}</p>
              <p> {dataOrder.user ? dataOrder.user.address : ""}</p>
              <p>
                {new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "VND",
                }).format(dataOrder.totalPrice)}{" "}
              </p>
            </div>
          </div>
        </div>
        <div style={{ margin: "10% 0" }}>
          <div
            className={`row ${classes["header-table"]} justify-content-between`}
          >
            <div className={`col-3 `}>ID PRODUCT</div>
            <div className={`col-3 ${classes.even}`}>IMAGE</div>
            <div className={`col-2`}>NAME</div>
            <div className={`col-2 ${classes.even}`}>PRICE</div>
            <div className={`col-2`}>COUNT</div>
          </div>
          {dataOrder.products?.length === 0 ? (
            <div className="row align-items-center">
              <div
                style={{
                  fontSize: "24px",
                  padding: "30px",
                  fontStyle: "italic",
                }}
              >
                Nothing...
              </div>
            </div>
          ) : (
            dataOrder.products?.map((item) => (
              <div className="row" key={item._id}>
                <ProductOrder data={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default DetailOrder;
