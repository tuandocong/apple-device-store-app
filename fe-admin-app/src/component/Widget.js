import classes from "./Widget.module.css";

import { FaUsers } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

const Widget = ({ type, value }) => {
  let data;

  //temporary
  const amount = value;

  switch (type) {
    case "client":
      data = {
        title: "Clients",
        isMoney: false,
        icon: <FaUsers className={classes.icon} />,
      };
      break;

    case "order":
      data = {
        title: "Orders",
        isMoney: false,
        icon: <FaFileAlt className={classes.icon} />,
      };
      break;

    case "earning":
      data = {
        title: "Earnings",
        isMoney: true,
        icon: <FaDollarSign className={classes.icon} />,
      };
      break;

    default:
      break;
  }

  return (
    <div className={classes.widget}>
      <div className={classes.left}>
        {!data.isMoney && <span className={classes.counter}>{amount}</span>}
        {data.isMoney && (
          <span className={classes.counter}>
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "VND",
            }).format(amount)}
          </span>
        )}
        <span className={classes.title}>{data.title}</span>
      </div>
      <div className={classes.right}>{data.icon}</div>
    </div>
  );
};

export default Widget;
