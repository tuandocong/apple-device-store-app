import classes from "./ShopPage.module.css";
import NavShopPage from "../component/NavShopPage";
import ListShopPage from "../component/ListShopPage";
const ShopPage = (props) => {
  // console.log(props.data);
  return (
    <div>
      <div className="container">
        <div
          className={`row align-items-center justify-content-between ${classes.header}`}
        >
          <h2 className="col">SHOP</h2>
          <p className="col">SHOP</p>
        </div>

        <div className="row">
          <div className="col-3">
            <NavShopPage />
          </div>
          <div className="col-9">
            <ListShopPage data={props.data} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopPage;
