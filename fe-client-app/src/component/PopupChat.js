import { RiMessengerLine } from "react-icons/ri";
import { FcBusinessman } from "react-icons/fc";
import { BsFillSendFill, BsFillEmojiSmileFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";

import classes from "./PopupChat.module.css";
import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import io from "socket.io-client";
//ket noi voi server
const socket = io(`${process.env.REACT_APP_API_URL}`);

const PopupChat = () => {
  // const dispatch = useDispatch();
  //lấy data listChat
  const [listChat, setListChat] = useState([]);
  const user = useSelector((state) => state.loginPage.user);

  //trạng thái Show/hide
  const [isShow, setIsShow] = useState(false);
  const showScreenChatHandler = () => {
    setIsShow((prevState) => !prevState);
  };

  //input message
  const [sendInput, setSendInput] = useState("");
  const sendInputChange = (e) => {
    setSendInput(e.target.value);
  };

  useEffect(() => {
    // khi kết nối thành công
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    //join vao room tren server:
    const room = user._id;
    socket.emit("join", room);
    // Lắng nghe các message moi từ server
    socket.on("receive-message", (data) => {
      // console.log("Received message from server:", data);
      setListChat(data);
    });
    //Lắng nghe server gui data khi join Room:
    socket.on("list-chat", (data) => {
      // console.log("List chat:", data);
      setListChat(data);
    });
  }, [user]);

  //ham gui message
  const sendBtnHandler = () => {
    socket.emit("send-message", { msg: sendInput, user: "client" });
    setSendInput("");
  };

  return (
    <div>
      <div className={classes.popup}>
        <button onClick={showScreenChatHandler} className={classes.btn}>
          <RiMessengerLine className={classes.icon} />
        </button>
      </div>

      {isShow && (
        <div className={classes["screen-chat"]}>
          <div className={classes.context}>
            <header
              className={`d-flex justify-content-between align-items-center ${classes.header}`}
            >
              <p>Customer Support</p>
              <button>Let's Chat App</button>
            </header>

            <div className={classes.chat}>
              {listChat.map((item) => (
                <div
                  key={item._id}
                  className={
                    item.userSend === "client" ? classes.user : classes.sup
                  }
                >
                  <div
                    className={
                      item.userSend === "client"
                        ? classes["user-chat"]
                        : classes["sup-chat"]
                    }
                  >
                    {item.chatMessage}
                  </div>
                </div>
              ))}
            </div>

            <div className={`d-flex justify-content-start ${classes.send}`}>
              <div className={classes["avt"]}>
                <FcBusinessman className={classes["avt-icon"]} />
              </div>
              <input
                type="text"
                placeholder="Enter Message!"
                onChange={sendInputChange}
                value={sendInput}
              ></input>
              <button>
                <GrAttachment className={classes["orther-icon"]} />
              </button>
              <button>
                <BsFillEmojiSmileFill className={classes["orther-icon"]} />
              </button>
              <button onClick={sendBtnHandler}>
                <BsFillSendFill className={classes["send-icon"]} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PopupChat;
