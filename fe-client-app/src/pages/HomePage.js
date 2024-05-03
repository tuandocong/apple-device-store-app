import Banner from "../component/Banner";
import Categories from "../component/Categories";
import ListProducts from "../component/ListProducts";
import Shipping from "../component/Shipping";
import EmailForm from "../component/EmailForm";
import Popup from "../component/Popup";
import { useSelector } from "react-redux";
const HomePage = (props) => {
  // trạng thái của popup và data item hiển thị trên popup:
  const isShow = useSelector((state) => state.homePage.showPopup);
  const itemPopup = useSelector((state) => state.homePage.itemPopup);

  // data list products:
  const listProduct = props.data;

  return (
    <div>
      <Banner />
      <Categories />
      <ListProducts data={listProduct} />
      <Shipping />
      <EmailForm />
      {isShow && <Popup data={itemPopup} />}
    </div>
  );
};
export default HomePage;
