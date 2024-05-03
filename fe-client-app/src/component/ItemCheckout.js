const ItemCheckout = (props) => {
  return (
    <div
      className="d-flex justify-content-between"
      style={{ padding: "10px 0", borderBottom: "2px solid rgb(200, 200,200)" }}
    >
      <div style={{ fontWeight: "500", color: "rgb(59, 59,59)" }}>
        {props.item.productId.name}
      </div>
      <div style={{ color: "rgb(150, 150, 150)" }}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.item.productId.price)}
        x{props.item.quantity}
      </div>
    </div>
  );
};
export default ItemCheckout;
