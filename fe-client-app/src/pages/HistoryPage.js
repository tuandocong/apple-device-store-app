import classes from "./HistoryPage.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ItemOrder from "../component/ItemOrder";

const HistoryPage = () => {
  const token = useSelector((state) => state.loginPage.token);
  const [listOrder, setListOrder] = useState([]);

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
      <div className={classes["history-p"]}>
        <div
          className={`row align-items-center justify-content-between ${classes.header}`}
        >
          <h2 className="col">HISTORY</h2>
          <p className="col">HISTORY</p>
        </div>

        <div style={{ width: "100%", margin: "10% 0px" }}>
          <div
            className={`row ${classes["header-table"]} justify-content-between`}
          >
            <div className={`col-2 ${classes.overflow}`}>ID ORDER</div>
            <div className={`col-2 ${classes.overflow} ${classes.even} `}>
              ID USER
            </div>
            <div className={`col-1 ${classes.overflow}`}>NAME</div>
            <div className={`col-1 ${classes.overflow} ${classes.even}`}>
              PHONE
            </div>
            <div className={`col-2 ${classes.overflow}`}>ADDRESS</div>
            <div className={`col-1  ${classes.overflow} ${classes.even}`}>
              TOTAL
            </div>
            <div className={`col-1  ${classes.overflow} `}>DELIVERY</div>
            <div className={`col-1 ${classes.overflow}  ${classes.even}`}>
              STATUS
            </div>
            <div className={`col-1  ${classes.overflow} `}>DETAIL</div>
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
