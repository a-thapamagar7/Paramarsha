import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {stream && (
        <div style={{ border: "solid 1px black" }}>
          <div>
            <h5>{name || "Name"}</h5>
            <video playsInline muted ref={myVideo} autoPlay />
          </div>
        </div>
      )}

      {callAccepted && !callEnded && (
        <div style={{ border: "solid 1px black" }}>
          <div>
            <h5>{call.name || "Name"}</h5>
            <video playsInline muted ref={null} autoPlay />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
