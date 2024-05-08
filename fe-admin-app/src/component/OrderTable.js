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
        console.log(result);
        if (!result.isSuccess) {
          throw new Error(result.msg);
        }
        setRows(result.data);
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <TableContainer className={classes.table}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={classes["table-head"]}>
          <TableRow>
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
        <TableBody>
          {rows &&
            rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell className={classes.tableCell}>
                  {row.user._id}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.user.username}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.user.phone}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.user.address}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.totalPrice}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  Chưa vận chuyển
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.status}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <button className={classes.btnCell}>View</button>
                </TableCell>
                {/* {row.hotel ? (
                <TableCell className="tableCell">{row.user.phone} </TableCell>
              ) : (
                <TableCell className="tableCell">None </TableCell>
              )}
              <TableCell className="tableCell">{row.room.join(",")}</TableCell>
              <TableCell className="tableCell">
                {getDate(row.startDate)} - {getDate(row.endDate)}
              </TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.payment}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
