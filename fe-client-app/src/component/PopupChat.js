import { RiMessengerLine } from "react-icons/ri";
import { FcBusinessman } from "react-icons/fc";
import { BsFillSendFill, BsFillEmojiSmileFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";

import classes from "./PopupChat.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PopupChat = () => {
  const dispatch = useDispatch();

  //lấy data listChat
  const listChat = useSelector((state) => state.popupChat.listChat);

  //trạng thái Show/hide
  const [isShow, setIsShow] = useState(false);
  const showScreenChatHandler = () => {
    setIsShow((prevState) => !prevState);
  };

  //gửi message
  const [sendInput, setSendInput] = useState("");
  const sendInputChange = (e) => {
    setSendInput(e.target.value);
  };
  const sendBtnHandler = () => {
    dispatch({
      type: "SEND_DATA",
      payload: [{ name: "user", text: sendInput }],
    });
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
              {listChat.map((item, index) => (
                <div
                  key={index}
                  className={item.name === "sup" ? classes.sup : classes.user}
                >
                  <div
                    className={
                      item.name === "sup"
                        ? classes["sup-chat"]
                        : classes["user-chat"]
                    }
                  >
                    {item.text}
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
