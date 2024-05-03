import { useParams, useNavigate } from "react-router-dom";
import classes from "./DetailPage.module.css";
import ItemProduct from "../component/ItemProduct";
import { useSelector } from "react-redux";
import { useState } from "react";
const DetailPage = (props) => {
  // console.log(props.data);
  const token = useSelector((state) => state.loginPage.token);
  //lấy id từ useParams
  const { productId } = useParams();
  const navigate = useNavigate();

  // state chứa số lượng muốn thêm (default = 1)
  const [quantity, setQuantity] = useState(1);

  //lấy data của sản phẩm từ ID đã có:
  const dataProduct = props.data.filter((item) => {
    return item["_id"] === productId;
  });

  //lấy các sản phẩm liên quan (có cùng categary):
  const relateList = props.data.filter((item) => {
    return (
      item.category === dataProduct[0].category &&
      item["_id"] !== dataProduct[0]["_id"]
    );
  });

  //Chuyển trang tới detail/id của sản phẩm liên quan:
  const relateProductClick = (e) => {
    navigate(`/detail/${e["_id"]}`);
  };

  // cập nhật số lượng sản phẳm muốn thêm:
  const quantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // thêm vào Cart:
  const addItemBtnHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      productId: productId,
      quantity: quantity,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/carts/add-cart`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.isSuccess) {
          throw new Error(result.msg);
        }
        setQuantity(1);
        alert("Add to cart successfully!");
      })
      .catch((error) => alert(error.message));
    // if (Number(quantity) !== 0) {
    //   dispatch({
    //     type: "ADD_CART",
    //     payload: {
    //       name: dataProduct[0].name,
    //       id: productId,
    //       img: dataProduct[0].img1,
    //       price: dataProduct[0].price,
    //       quantity: Number(quantity),
    //     },
    //   });
    //   setQuantity("");
    // }
  };

  return (
    <div className={classes.detail}>
      {dataProduct.length !== 0 && (
        <div className="container">
          <div
            className="row  align-items-center"
            style={{ marginBottom: "80px" }}
          >
            <div className="col-2  ">
              <img src={dataProduct[0].img1} width={"70%"} alt="img1"></img>
              <img src={dataProduct[0].img2} width={"70%"} alt="img2"></img>
              <img src={dataProduct[0].img3} width={"70%"} alt="img2"></img>
              <img src={dataProduct[0].img4} width={"70%"} alt="img2"></img>
            </div>
            <div className="col-4">
              <img src={dataProduct[0].img1} width={"100%"} alt="img2"></img>
            </div>
            <div className={`col-6 ${classes.context}`}>
              <h2 className={classes.name}>{dataProduct[0].name}</h2>
              <div className={classes.price}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataProduct[0].price)}
              </div>
              <div className={classes["short-desc"]}>
                {dataProduct[0].short_desc}
              </div>
              <div className={classes.category}>
                CATEGORY:<p>{dataProduct[0].category}</p>{" "}
              </div>
              <div className={classes["input-quantity"]}>
                <input
                  type="number"
                  placeholder="QUANTITY"
                  min={1}
                  onChange={quantityChange}
                  value={quantity}
                ></input>
                <button onClick={addItemBtnHandler}>Add to card</button>
              </div>
            </div>
          </div>
          <div className={`row justify-content-start ${classes.desc}`}>
            <div className="col-12" style={{ textAlign: "left" }}>
              <button>DESCRIPTION</button>
              <h2>PRODUCT DESCRIPTION</h2>
              <div className={classes["desc-text"]}>
                {dataProduct[0].long_desc}
              </div>
              <h2>RELATED PRODUCT</h2>
              <div className={classes["relate-list"]}>
                {relateList.map((item) => (
                  <div key={item.name} className={classes["relate-item"]}>
                    <ItemProduct
                      item={item}
                      clickHandler={relateProductClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailPage;
