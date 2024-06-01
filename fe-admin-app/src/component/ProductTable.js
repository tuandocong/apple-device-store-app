import classes from "./ProductTable.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const navigate = useNavigate();

  //lay token tu redux store
  const token = useSelector((state) => state.loginPage.token);

  //lay du lieu tu API
  const { data, reFetch } = useFetch(
    `${process.env.REACT_APP_API_URL}/products`
  );

  //gia tri cua input Search
  const [filterText, setFilterText] = useState("");

  // lọc các item trong list thỏa mãn:
  const rows = data.filter((item) => {
    return item.name.includes(filterText);
  });

  //Function cập nhật giá trị tìm kiếm từ input
  const textFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  //Function xoa Product
  const deleteProdHandler = (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirm) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/products/delete-product/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (!result.isSuccess) {
            throw new Error("Delete Product fail!");
          }
          reFetch();
        })
        .catch((error) => console.error(error));
    }
  };
  //Ham khi nhan btn Update
  const updateProductBtnHandler = (id) => {
    navigate(`/edit-product/${id}`);
  };
  const newProductBtnHandler = (id) => {
    navigate(`/add-product`);
  };
  return (
    <div>
      <div className={classes.prodSearch}>
        <div>
          <input
            onChange={textFilterChange}
            type="text"
            placeholder="Enter Search!"
          ></input>
        </div>
        <div>
          <button onClick={newProductBtnHandler}>New Product</button>
        </div>
      </div>
      <TableContainer className={classes.table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={classes["table-head"]}>
            <TableRow className={classes["table-row"]}>
              <TableCell className={classes.headCell}> ID </TableCell>
              <TableCell className={classes.headCell}>Name</TableCell>
              <TableCell className={classes.headCell}>Price</TableCell>
              <TableCell className={classes.headCell}>Image</TableCell>
              <TableCell className={classes.headCell}>Category</TableCell>
              <TableCell className={classes.headCell}>Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className={classes["table-body"]}>
            {rows?.map((row) => (
              <TableRow key={row._id} className={classes["table-row"]}>
                <TableCell data-label="ID" className={classes.tableCell}>
                  {row._id}
                </TableCell>
                <TableCell data-label="Name" className={classes.tableCell}>
                  {row.name}
                </TableCell>
                <TableCell data-label="Price" className={classes.tableCell}>
                  {row.price}
                </TableCell>
                <TableCell data-label="Image" className={classes.tableCell}>
                  <img
                    src={row.img1}
                    alt="img-prod"
                    style={{ maxWidth: "100px" }}
                  />
                </TableCell>
                <TableCell data-label="Category" className={classes.tableCell}>
                  {row.category}
                </TableCell>
                <TableCell data-label="Edit" className={classes.tableCell}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                    }}
                  >
                    <button
                      onClick={() => {
                        updateProductBtnHandler(row._id);
                      }}
                      className={classes.btnUpdateCell}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        deleteProdHandler(row._id);
                      }}
                      className={classes.btnDeleteCell}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;
