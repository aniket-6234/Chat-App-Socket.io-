import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";

import Logo from "./asset/thunder.png";
import BlueIlli from "./asset/blue-iilli.png";
import TopView from "./asset/top-view.png";
import BottomView from "./asset/bottom-view.png";
import Loading from "./asset/loading.gif";

const socket = io.connect("http://localhost:8000");

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChatRoom, setShowChatRoom] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const joinRoomBtn = () => {
    setLoading(!loading);
    setTimeout(() => {
      if (username === "" && room === "") {
        setError(true);
        setLoading(false);
      }
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChatRoom(false);
      }
    }, 2500);
  };

  return (
    <div>
      {showChatRoom ? (
        <div className="container">
          <div className="left-box">
            <img className="logo" src={Logo} alt="logo" />
            <h1 className="title">Join a chat room</h1>
            <p className="para">
              Explore and See with your friend's and make a chat with them!
            </p>
            {error ? (
              <p className="error">
                Error: Username and Room Name is not be an Empty.
              </p>
            ) : (
              " "
            )}
            <p className="label">Enter Username</p>
            <div className="input-box">
              <input
                type="text"
                autocomplete="off"
                className="input"
                placeholder="Ex. John Doe"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <p className="label">Enter Room Name</p>
            <div className="input-box">
              <input
                type="text"
                autocomplete="off"
                className="input"
                placeholder="Ex. Socket Group"
                onChange={e => setRoom(e.target.value)}
              />
            </div>
            <button onClick={joinRoomBtn} className="btn-join">
              {loading ? (
                <img className="loading" src={Loading} alt="loading" />
              ) : (
                "Join Room"
              )}
            </button>
            <p className="copyright">
              © React 2022 Project. All right reserved to thier owner.
            </p>
          </div>

          <div className="right-box">
            <div className="flex-1">
              <img className="top-img" src={TopView} alt="img" />
            </div>
            <div className="flex-2">
              <img className="blue-illi" src={BlueIlli} alt="img" />
            </div>
            <div className="flex-3">
              <img className="bottom-img" src={BottomView} alt="img" />
            </div>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;

