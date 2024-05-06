import classes from "./Footer.module.css";
const customerArr = [
  "Help & Contact Us",
  "Returns & Refunds",
  "Online Stores",
  "Terms & Conditions",
];
const CompanyArr = ["What We Do", "Available Services", "Latest Posts", "FAQs"];
const SocialArr = ["Twitter", "Instagram", "Facebook", "Pinterest"];
const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.item}>
        <h2>CUSTOMER SERVICES</h2>
        <ul>
          {customerArr.map((items) => (
            <li key={items}>
              <a href="#top">{items}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.item}>
        <h2>COMPANY</h2>
        <ul>
          {CompanyArr.map((items) => (
            <li key={items}>
              <a href="#top">{items}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.item}>
        <h2>SOCIAL MEDIA</h2>
        <ul>
          {SocialArr.map((items) => (
            <li key={items}>
              <a href="#top">{items}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Footer;
