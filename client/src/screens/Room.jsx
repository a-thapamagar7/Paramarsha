import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import endCallIMG from "../Images/circle.png";
import { useNavigate } from "react-router-dom";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [status, setStatus] = useState([]);
  const [myStream, setMyStream] = useState();
  const [called, setCalled] = useState(false);
  const [remoteStream, setRemoteStream] = useState();

  const navigate = useNavigate();

  console.log(remoteSocketId, remoteStream, myStream, called);

  useEffect(() => {
    if (remoteSocketId && !remoteStream && !myStream) {
      handleCallUser();
    }
  }, [remoteSocketId]);

  useEffect(() => {
    if (remoteSocketId && remoteStream && myStream && !called) {
      sendStreams();
    }
  }, []);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} joined room`);
    setStatus([...status, `Email ${email} joined room`]);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    setCalled(true);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="w-full h-screen flex flex-row bg-[#171616]">
      <div className="h-full pl-[3rem] relative min-w-[50%]">
        {remoteStream && (
          <ReactPlayer
            playing
            muted
            id={"remoteStream"}
            url={remoteStream}
            width="100%"
            height="100%"
          />
        )}
        {myStream && (
          <div className="absolute h-[8rem] bottom-3 right-3">
            <ReactPlayer
              id={"mystream"}
              playing
              muted
              url={myStream}
              height="100%"
              width="100%"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center w-[3.5rem] border-r border-gray-400">
        <img
          src={endCallIMG}
          onClick={() => {
            navigate("/meeting");
          }}
          className="w-[2.5rem] hover:scale-110 ease-in-out duration-150 cursor-pointer"
        />
      </div>
      <div className="flex flex-1 flex-row bg-white p-5">
        <div className="col-span-12 flex flex-col text-black">
          <div className="font-extrabold text-3xl pb-7">
            Up<span className="text-blue-700">dates</span>
          </div>
          <h4>{!remoteSocketId && "No one in room"}</h4>
          {status.map((value) => (
            <div className="spacegrotesk text-xs text-slate-700">{value}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
