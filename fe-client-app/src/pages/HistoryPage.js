import classes from "./HistoryPage.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ItemOrder from "../component/ItemOrder";

const HistoryPage = () => {
  const token = useSelector((state) => state.loginPage.token);
  const [listOrder, setListOrder] = useState([]);
  // const [reloadCart, setReloadCart] = useState(false);

  // const reloadCartPageHandler = () => {
  //   setReloadCart((prevState) => !prevState);
  // };
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/orders/getById`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setListOrder(result);
      })
      .catch((error) => console.log(error));
  }, [token]);

  return (
    <div>
      <div className="container">
        <div
          className={`row align-items-center justify-content-between ${classes.header}`}
        >
          <h2 className="col">HISTORY</h2>
          <p className="col">HISTORY</p>
        </div>

        <div className="container" style={{ margin: "10% 0" }}>
          <div
            className={`row ${classes["header-table"]} justify-content-between`}
          >
            <div className="col">ID ORDER</div>
            <div className="col" style={{ margin: "0 15px" }}>
              ID USER
            </div>
            <div className="col">NAME</div>
            <div className="col">PHONE</div>
            <div className="col">ADDRESS</div>
            <div className="col">TOTAL</div>
            <div className="col">DELIVERY</div>
            <div className="col">STATUS</div>
            <div className="col">DETAIL</div>
          </div>
          {listOrder.length === 0 ? (
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
            listOrder.map((item) => (
              <div className="row" key={item._id}>
                <ItemOrder data={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default HistoryPage;
