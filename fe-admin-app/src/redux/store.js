import { createStore, combineReducers } from "redux";
import demo from "../img/img_02.jpg";

//-----------reducer cho Navbar---------------
const initStateNavbar = {
  isActiveState: "home",
};
const reducerNavBar = (state = initStateNavbar, action) => {
  switch (action.type) {
    case "HOME_ACTIVE":
      return { isActiveState: "home" };
    case "PRODUCTS_ACTIVE":
      return { isActiveState: "products" };
    case "CHAT_ACTIVE":
      return { isActiveState: "chat" };
    case "HISTORY_ACTIVE":
      return { isActiveState: "history" };
    case "LOGIN_ACTIVE":
      return { isActiveState: "login" };
    default:
      return state;
  }
};
//------------reducer cho trang Home---------------
const initStateHome = {
  showPopup: false,
  itemPopup: {
    _id: "",
    name: "Nothing",
    price: 0,
    short_desc: "nothing",
    img1: demo,
  },
};
const reducerHome = (state = initStateHome, action) => {
  switch (action.type) {
    case "SHOW_POPUP":
      return { ...state, showPopup: true };
    case "HIDE_POPUP":
      return { ...state, showPopup: false };
    case "CHANGE_POPUP":
      return { ...state, itemPopup: action.payload, showPopup: true };
    default:
      return state;
  }
};

//-------------------reducer cho trang Shop--------------
const initStateShop = {
  category: "all",
  findText: "",
};
const reducerShop = (state = initStateShop, action) => {
  switch (action.type) {
    case "FILTER_CATEGORY":
      // console.log(action);
      return { ...state, category: action.payload };
    case "FILTER_TEXT":
      // console.log(action);
      return { ...state, findText: action.payload };
    default:
      return state;
  }
};

//--------------reducer cho LOGIN-----------
const initStateLogin = {
  // isLogin: false,
  user: localStorage.getItem("curUser")
    ? JSON.parse(localStorage.getItem("curUser"))
    : {},
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "",
};
const reducerLogin = (state = initStateLogin, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      return {
        ...state,
        // isLogin: true,
        user: JSON.parse(localStorage.getItem("curUser")),
        token: JSON.parse(localStorage.getItem("token")),
      };
    case "ON_LOGOUT":
      return {
        ...state,
        user: {},
        token: "",
        // isLogin: false,
        // user: JSON.parse(localStorage.getItem("curUser")),
        // token: JSON.parse(localStorage.getItem("token")),
      };
    default:
      return state;
  }
};
//--------------reducer cho Cart-------------
// lấy data từ LocalStorage:
const totalCartDefault = localStorage.getItem("totalCart")
  ? JSON.parse(localStorage.getItem("totalCart"))
  : 0;
const arrItemsCartDefault = localStorage.getItem("arrItems")
  ? JSON.parse(localStorage.getItem("arrItems"))
  : [];

const initStateCart = {
  arrItems: arrItemsCartDefault,
  totalCart: totalCartDefault,
};
const reducerCart = (state = initStateCart, action) => {
  switch (action.type) {
    case "ADD_CART":
      // payload = {name:..., price:..., img:..., quantity:..., id}
      // tong:
      const addTotalCart =
        state.totalCart + action.payload.price * action.payload.quantity;
      // arrary Items:
      const addItemIndex = state.arrItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const addItem = state.arrItems[addItemIndex];
      let addArrItems; //mảng items mới
      if (addItem) {
        //có item trùng vs id của payload -> update quantity cho item
        const newItem = {
          ...addItem,
          quantity: addItem.quantity + action.payload.quantity,
        };
        addArrItems = [...state.arrItems];
        addArrItems[addItemIndex] = newItem;
      } else {
        //ko id payload trong mảng -> thêm mới
        addArrItems = state.arrItems.concat(action.payload);
      }
      // lưu xuống Localstorage
      localStorage.setItem("arrItems", JSON.stringify(addArrItems));
      localStorage.setItem("totalCart", JSON.stringify(addTotalCart));
      return {
        arrItems: addArrItems,
        totalCart: addTotalCart,
      };
    case "UPDATE_CART":
      //------------------  payload:{id, quantity > 0}  --------
      //tìm item cần update:
      const updateItemIndex = state.arrItems.findIndex(
        (item) => item.id === action.payload.id
      );
      let updateItem = state.arrItems[updateItemIndex];
      //tong moi:
      const updateTotalCart =
        state.totalCart -
        updateItem.price * updateItem.quantity +
        updateItem.price * action.payload.quantity;
      // thay doi quantity cho Item
      updateItem.quantity = action.payload.quantity;

      //array moi:
      let updateArrItems = state.arrItems;
      updateArrItems[updateItemIndex] = updateItem;

      // save Localstorage
      localStorage.setItem("arrItems", JSON.stringify(updateArrItems));
      localStorage.setItem("totalCart", JSON.stringify(updateTotalCart));

      return {
        arrItems: updateArrItems,
        totalCart: updateTotalCart,
      };
    case "DELETE_CART":
      //-------------   payload: {id}  -------------------
      // tìm item cần xóa
      const deleteItemIndex = state.arrItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const deleteItem = state.arrItems[deleteItemIndex];

      //tong moi:
      const deletotalCart =
        state.totalCart - deleteItem.price * deleteItem.quantity;

      // array moi:
      const deleArrItems = state.arrItems.filter(
        (item) => item.id !== action.payload.id
      );

      //save localstorage
      localStorage.setItem("arrItems", JSON.stringify(deleArrItems));
      localStorage.setItem("totalCart", JSON.stringify(deletotalCart));
      return {
        arrItems: deleArrItems,
        totalCart: deletotalCart,
      };

    default:
      return state;
  }
};

//-------------------reducer lay data tu LocalStorage:-----------------------
const innitStateLocal = {
  arrCart: [],
  totalCart: 0,
};
const reducerLocal = (state = innitStateLocal, action) => {
  switch (action.type) {
    case "GET_DATA":
      const newArr = localStorage.getItem("arrItems")
        ? JSON.parse(localStorage.getItem("arrItems"))
        : [];
      const newTotal = localStorage.getItem("totalCart")
        ? JSON.parse(localStorage.getItem("totalCart"))
        : 0;
      return {
        arrCart: newArr,
        totalCart: newTotal,
      };
    default:
      return state;
  }
};
//-----------------------------reducer view Chat-----------------------
const innitStatePopup = {
  listChat: [
    { name: "user", text: "Hello" },
    { name: "sup", text: "Hello! How can i hepl you?" },
  ],
};
const reducerPopup = (state = innitStatePopup, action) => {
  switch (action.type) {
    case "SEND_DATA":
      const newListChat = state.listChat.concat(action.payload);
      return { listChat: newListChat };
    default:
      return state;
  }
};

//--------------------------Root reducer---------------------------
const rootReducer = combineReducers({
  mainNavbar: reducerNavBar,
  homePage: reducerHome,
  shopPage: reducerShop,
  loginPage: reducerLogin,
  cartPage: reducerCart,
  cartLocal: reducerLocal,
  popupChat: reducerPopup,
});
const store = createStore(rootReducer);
export default store;
