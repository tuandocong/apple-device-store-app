import classes from "./EditProduct.module.css";
// import useFetch from "../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.loginPage.token);
  //khai bao cac bien gia tri cua form:
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");

  //Lay du lieu ban dau cua Product:
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/products/product/${params.productId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setName(result.name);
        setCategory(result.category);
        setPrice(Number(result.price));
        setShortDesc(result.short_desc);
        setLongDesc(result.long_desc);
      })
      .catch((error) => console.error(error));
  }, [params.productId]);

  // //Ham khi Click UPDATE Btn
  const handleClick = async (e) => {
    e.preventDefault();

    //kiem tra xem cac truong co bi bo trong khong?
    const isValidate =
      name.trim() !== "" &&
      category.trim() !== "" &&
      price.toString().trim() !== "" &&
      longDesc.trim() !== "" &&
      shortDesc.trim() !== "";

    //dua ra canh bao khi chua full fields
    if (!isValidate) {
      alert("Please fill in all fields");
    } else {
      console.log("Updating!");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({
        name: name,
        category: category,
        short_desc: shortDesc,
        long_desc: longDesc,
        price: price,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/products/update-product/${params.productId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (!result.isSuccess) {
            throw new Error("Update fail!");
          }
          navigate("/products");
          alert(result.msg ? result.msg : "Updated!");
        })
        .catch((error) => console.error(error));
    }
  };
  //ham quay tro ve products Page:
  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <div className={classes["contain-edit-product"]}>
      <div className={classes.listContainer}>
        <div className={classes.listTitle}>Update Product</div>

        <div className={classes["form-contain"]}>
          <form>
            <div className="formInput">
              <label htmlFor="name">Product Name</label>
              <div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="category">Category</label>
              <div>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="price">Price</label>
              <div>
                <input
                  min={1}
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="s_desc">Short Description</label>
              <div>
                <textarea
                  type="text"
                  id="s_desc"
                  rows="3"
                  value={shortDesc}
                  onChange={(e) => {
                    setShortDesc(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="l_desc">Long Description</label>
              <div>
                <textarea
                  type="text"
                  id="l_desc"
                  rows="5"
                  value={longDesc}
                  onChange={(e) => {
                    setLongDesc(e.target.value);
                  }}
                />
              </div>
            </div>

            <button className={classes.updateBtn} onClick={handleClick}>
              Update
            </button>
            <button className={classes.cancelBtn} onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
