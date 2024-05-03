import ItemProduct from "./ItemProduct";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ListShopPage = (props) => {
  const dispatch = useDispatch();
  //-----   lấy giá trị cần lọc ra từ list Product   -----

  // 1. giá trị từ navbar
  const filterCategory = useSelector((state) => state.shopPage.category);
  // 2. giá trị từ input
  const filterText = useSelector((state) => state.shopPage.findText);

  // lọc các item trong list thỏa mãn:
  const listProducts = props.data.filter((item) => {
    if (filterCategory === "all" && filterText === "") {
      // trường hợp 'all' navbar và '' input
      return true;
    } else if (filterCategory === "all") {
      // trường hợp 'all' navbar và  input chứa giá trị
      return item.name.includes(filterText);
    } else {
      // trường hợp navbar khac 'all' và  input chứa (hoặc không chứa) giá trị
      return item.category === filterCategory && item.name.includes(filterText);
    }
  });

  //cập nhật giá trị tìm kiếm từ input
  const textFilterChange = (e) => {
    // console.log(e.target.value);
    dispatch({ type: "FILTER_TEXT", payload: e.target.value });
  };

  //chuyển trang khi nhấn vào sản phẩm (detail/id):
  const navigate = useNavigate();
  const itemClickHandler = (e) => {
    console.log(e["_id"]);
    navigate(`/detail/${e["_id"]}`);
  };

  return (
    <div style={{ margin: "30px 0" }}>
      <div style={{ textAlign: "left", margin: "10px 0", padding: "10px" }}>
        <input
          onChange={textFilterChange}
          style={{ padding: "5px 10px", width: "40%" }}
          type="text"
          placeholder="Enter Search Here!"
        ></input>
      </div>

      <div className="row g-3">
        {listProducts.map((item) => (
          <div className="col-4" key={item.name}>
            <ItemProduct item={item} clickHandler={itemClickHandler} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListShopPage;
