const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoute = require("./routes/products");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/carts");
const orderRoute = require("./routes/orders");
const userRoute = require("./routes/users");
const path = require("path");
const multer = require("multer");

const Session = require("./models/session");
//
//
const app = express();

//---------------middlewares-------------
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.use(cors());
app.use(bodyParser.json());

app.use(
  multer({
    storage: fileStorage,
  }).array("images", 4)
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/products", productRoute);
app.use("/auth", authRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/users", userRoute);

//ERROR 404 PAGE
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "No Found Page!",
  });
});

app.use((err, req, res, next) => {
  console.log("ERROR MIDDLEWARE:", err.message);
  return res.status(500).json({
    isSuccess: false,
    msg: err.message || "something went wrong!",
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected !!!");
    return result;
  })
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log("SERVER start at POST: ", process.env.PORT);
    });

    //tao Websocket
    const io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    // Xử lý sự kiện khi kết nối thành công
    io.on("connection", (socket) => {
      console.log("Client Connected");
      let curRoom;

      //them client vao 1 room
      socket.on("join", (newRoom) => {
        //leave room cũ
        socket.leave(curRoom);
        //lấy giá trị room mới muốn join
        curRoom = newRoom;
        socket.join(curRoom);

        Session.find({ chatRoom: curRoom })
          .then((result) => {
            io.to(socket.id).emit("list-chat", result);
          })
          .catch((err) => console.log(err));
      });

      //khi client gui di tin nhan
      socket.on("send-message", (data) => {
        // console.log(">>>From room: ", curRoom);
        const newSession = new Session({
          userSend: data.user,
          chatRoom: curRoom,
          chatMessage: data.msg,
        });
        newSession
          .save()
          .then(() => {
            return Session.find({ chatRoom: curRoom });
          })
          .then((data) => {
            // console.log(data);
            io.to(curRoom).emit("receive-message", data);
          })
          .catch((err) => console.log(err));
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
