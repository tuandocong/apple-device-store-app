import classes from "./LoginPage.module.css";
import FormInput from "../component/FormInput";
const LoginPage = () => {
  return (
    <div className={classes["login-page"]}>
      <div className={classes["form-input"]}>
        <FormInput />
      </div>
    </div>
  );
};
export default LoginPage;
