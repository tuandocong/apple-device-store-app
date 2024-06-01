import classes from "./OrderTable.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

const OrderTable = () => {
  const token = useSelector((state) => state.loginPage.token);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/orders/latest`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (!result.isSuccess) {
          throw new Error(result.msg);
        }
        setRows(result.data);
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <TableContainer className={classes["table-contain"]}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes["table-head"]}>
          <TableRow className={classes["table-row"]}>
            <TableCell className={classes.headCell}> ID User</TableCell>
            <TableCell className={classes.headCell}>Name</TableCell>
            <TableCell className={classes.headCell}>Phone</TableCell>
            <TableCell className={classes.headCell}>Address</TableCell>
            <TableCell className={classes.headCell}>Total</TableCell>
            <TableCell className={classes.headCell}>Delivery</TableCell>
            <TableCell className={classes.headCell}>Status</TableCell>
            <TableCell className={classes.headCell}>Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes["table-body"]}>
          {rows &&
            rows.map((row) => (
              <TableRow key={row._id} className={classes["table-row"]}>
                <TableCell data-label="ID User" className={classes.tableCell}>
                  {row.user._id}
                </TableCell>
                <TableCell data-label="Name" className={classes.tableCell}>
                  {row.user.username}
                </TableCell>
                <TableCell data-label="Phone" className={classes.tableCell}>
                  {row.user.phone}
                </TableCell>
                <TableCell data-label="Address" className={classes.tableCell}>
                  {row.user.address}
                </TableCell>
                <TableCell data-label="Total" className={classes.tableCell}>
                  {row.totalPrice}
                </TableCell>
                <TableCell data-label="Delivery" className={classes.tableCell}>
                  Chưa vận chuyển
                </TableCell>
                <TableCell data-label="Status" className={classes.tableCell}>
                  {row.status}
                </TableCell>
                <TableCell data-label="Detail" className={classes.tableCell}>
                  <button className={classes.btnCell}>View</button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
