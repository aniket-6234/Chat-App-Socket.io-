import React, { useEffect, useState } from "react";
import Profile from "./asset/thunder.png";
import Send from "./asset/send.svg";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data.message);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <nav className="navbar">
        <h1>Socket.io</h1>
        <div>
          <div className="profile-container">
            <img className="profile" src={Profile} alt="profile" />
          </div>
        </div>
      </nav>
      <div className="chat-container">
        <div className="chat-box">
          {/* <ScrollToBottom className="scoll-div"> */}
          {messageList.map((messageContent) => {
            return (
              <>
                {username === messageContent.author ? (
                  <div className="msg-box-1">
                    <p className="author">me</p>
                    <div className="message-1">{messageContent.message}</div>
                    <p className="time">{messageContent.time}</p>
                  </div>
                ) : (
                  <div className="msg-box-2">
                    <p className="author">{messageContent.author}</p>
                    <div className="message-2">{messageContent.message}</div>
                    <p className="time">{messageContent.time}</p>
                  </div>
                )}
              </>
            );
          })}
          {/* </ScrollToBottom> */}
        </div>
      </div>
      <footer className="footer">
        <input
          className="send-input"
          type="text"
          value={message}
          placeholder="Hey..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <div onClick={sendMessage} className="send-btn">
          <p>Send</p>
          <img src={Send} alt="send" />
        </div>
      </footer>
    </div>
  );
};

export default Chat;
