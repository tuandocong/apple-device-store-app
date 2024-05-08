import classes from "./ChatApp.module.css";
import { FcBusinessman } from "react-icons/fc";
import { BsFillSendFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
//ket noi voi server
const socket = io(`${process.env.REACT_APP_API_URL}`);

const ChatApp = () => {
  const token = useSelector((state) => state.loginPage.token);
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState("");
  const [listChat, setListChat] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/users/clients`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.isSuccess) {
          setClients(result.data);
        }
      })
      .catch((error) => console.error(error));
  }, [token]);

  useEffect(() => {
    // khi kết nối thành công
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    // Lắng nghe các thông điệp từ server
    socket.on("receive-message", (data) => {
      // console.log("Received message from server:", data);
      setListChat(data);
    });
    //Lắng nghe server gui data khi join Room:
    socket.on("list-chat", (data) => {
      // console.log("List chat:", data);
      setListChat(data);
    });
  }, []);

  //ham khi click de join vao 1 room
  const joinRoomHandler = (data) => {
    const room = data._id;
    // console.log(room);
    socket.emit("join", room);
    setRoomName(data.username);
  };

  const sendMsgHandler = () => {
    socket.emit("send-message", { msg: message, user: "adviser" });
    setMessage("");
  };

  return (
    <div className={classes["contain-chatapp"]}>
      <div className={classes.appTitle}>Chat App</div>
      <div className={classes.appContainer}>
        <div className={classes.leftApp}>
          <div className={classes["l-search"]}>
            <input type="text" placeholder="Search Contact"></input>
          </div>
          {clients.map((client) => (
            <div key={client._id} className={classes["l-list"]}>
              <button
                onClick={() => {
                  joinRoomHandler(client);
                }}
              >
                <FcBusinessman className={classes["avt-icon"]} />
                {client.username}
              </button>
            </div>
          ))}
        </div>
        <div className={classes.rightApp}>
          {!roomName && (
            <div className={classes["r-context"]}>
              <div className={classes.headRoom}>
                Choose someone to start with
              </div>
            </div>
          )}

          {roomName && (
            <div className={classes["r-context"]}>
              <div className={classes.headRoom}>Chat with "{roomName}"</div>
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
            </div>
          )}
          {roomName && (
            <div className={classes["r-input"]}>
              <div style={{ flex: "8" }}>
                <input
                  type="text"
                  placeholder="Type and enter"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
              </div>
              <div>
                <button onClick={sendMsgHandler}>
                  <BsFillSendFill className={classes["send-icon"]} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatApp;
