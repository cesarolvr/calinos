import React from "react";

// Style
// import "./Home.scss";

// State
import { useStateValue } from "../../state";

const Chat = () => {
  const [{ pinOpened }, dispatch] = useStateValue();
  console.log(pinOpened);

  return <div className="panel chat">Chat</div>;
};

export default Chat;
