import classes from "./ItemProduct.module.css";
const ItemProduct = (props) => {
  const item = props.item;
  const itemPopupHandler = () => {
    // console.log(item["_id"]["$oid"]);
    props.clickHandler(item);
  };
  return (
    <div className={classes["product-item"]} onClick={itemPopupHandler}>
      <img src={props.item.img1} alt="this is a img" width={"100%"} />
      <div className={classes.name}>{props.item.name}</div>
      <div className={classes.price}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.item.price)}
      </div>
    </div>
  );
};
export default ItemProduct;
