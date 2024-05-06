import classes from "./ProductPage.module.css";
import ProductTable from "../component/ProductTable";
const ProductPage = () => {
  return (
    <div className={classes["contain-product"]}>
      <div className={classes.listContainer}>
        <div className={classes.listTitle}>Products</div>
        <ProductTable />
      </div>
    </div>
  );
};
export default ProductPage;
