import ItemProduct from "./ItemProduct";
import classes from "./ListProduct.module.css";
import { useDispatch } from "react-redux";
const ListProducts = (props) => {
  const dispatch = useDispatch();

  // Thay đổi item popup
  const itemPopupChange = (item) => {
    // console.log(item);
    dispatch({
      type: "CHANGE_POPUP",
      payload: {
        _id: item._id,
        name: item.name,
        price: item.price,
        short_desc: item.short_desc,
        img1: item.img1,
      },
    });
  };
  return (
    <div className={classes.products}>
      <header className={classes.header}>
        <p>MADE THE HARD WAY</p>
        <div>TOP TRENDING PRODUCTS</div>
      </header>
      <div className="row g-3">
        {props.data.map((item, i) => {
          if (item) {
            return (
              <div className="col-6 col-md-4 col-lg-3" key={item.name}>
                <ItemProduct item={item} clickHandler={itemPopupChange} />
              </div>
            );
          } else {
            return <div key={i}></div>;
          }
        })}
      </div>
    </div>
  );
};
export default ListProducts;
