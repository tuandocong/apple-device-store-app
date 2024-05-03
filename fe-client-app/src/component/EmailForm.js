import classes from "./EmailForm.module.css";
const EmailForm = () => {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className={`col ${classes.text} `}>
          <h2>LET'S BE FRIENDS!</h2>
          <p>Nisi nisi tempor consequat laboris nisi.</p>
        </div>
        <div className="col">
          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email address"
              style={{ padding: "20px", borderRadius: "0" }}
            />
            <div className="input-group-append">
              <span
                className="input-group-text btn btn-dark"
                id="basic-addon2"
                style={{ padding: "20px", borderRadius: "0" }}
              >
                Subscribe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailForm;
