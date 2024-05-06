import classes from "./HomePage.module.css";
import Widget from "../component/Widget";
import OrderTable from "../component/OrderTable";
import useFetch from "../hooks/useFetch";

const HomePage = (props) => {
  const clientCount = useFetch(
    `${process.env.REACT_APP_API_URL}/users/count`
  ).data;
  const orderCount = useFetch(
    `${process.env.REACT_APP_API_URL}/orders/count`
  ).data;
  const earning = useFetch(
    `${process.env.REACT_APP_API_URL}/orders/earnings`
  ).data;

  return (
    <div className={classes.home}>
      <div className={classes.homeContainer}>
        <div className={classes.charts}>Dashboard</div>
        <div className={classes.widgets}>
          <Widget type="client" value={clientCount} />
          <Widget type="earning" value={earning} />
          <Widget type="order" value={orderCount} />
        </div>

        <div className={classes.listContainer}>
          <div className={classes.listTitle}>History</div>
          <div className={classes.nameTable}>
            Information about the 5 latest orders:
          </div>
          <OrderTable />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
