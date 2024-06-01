import classes from "./AddProduct.module.css";
// import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.loginPage.token);
  //khai bao cac bien gia tri cua form:
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");

  // //Ham khi Click SUBMIT Btn
  const handleClick = async (e) => {
    e.preventDefault();
    const imgFiles = document.getElementById("image");
    console.log(imgFiles.files);

    //kiem tra xem cac truong co bi bo trong khong?
    let isValidate =
      name.trim() !== "" &&
      category.trim() !== "" &&
      price.toString().trim() !== "" &&
      longDesc.trim() !== "" &&
      shortDesc.trim() !== "" &&
      imgFiles.files.length === 4;

    //dua ra canh bao khi chua full fields
    if (!isValidate) {
      //input bi trong
      alert("Please fill in all fields and choose 4 images!");
    } else {
      console.log("Creating!");
      //gui req cho Server:
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formdata = new FormData();
      formdata.append("images", imgFiles.files[0]);
      formdata.append("images", imgFiles.files[1]);
      formdata.append("images", imgFiles.files[2]);
      formdata.append("images", imgFiles.files[3]);
      formdata.append("name", name);
      formdata.append("category", category);
      formdata.append("price", price);
      formdata.append("short_desc", shortDesc);
      formdata.append("long_desc", longDesc);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/products/add-product`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (!result.isSuccess) {
            alert("Create product fail!");
            throw new Error(result.msg);
          } else {
            console.log("success!");
            navigate("/products");
          }
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
        <div className={classes.listTitle}>New Product</div>

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
            <div className={classes.imgInput}>
              <label htmlFor="img">Update image (4 imgages)</label>
              <div>
                <input type="file" id="image" multiple />
              </div>
            </div>

            <button className={classes.updateBtn} onClick={handleClick}>
              Submit
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

export default AddProduct;
