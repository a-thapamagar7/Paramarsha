import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  const GetMeeting = async () => {
    if (localStorage.getItem("token")) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/meetingdetails/${id}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const answer = await response.json();
      console.log(answer);
      setEmail(answer.user.email);
      setRoom(answer.data.roomCode);
    }
  };

  useEffect(() => {
    GetMeeting();
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex items-center w-full flex-col gap-y-7">
        <form
          className="flex flex-col items-center w-[30rem] gap-y-10"
          onSubmit={handleSubmitForm}
        >
          <h1 className=" text-5xl font-extrabold">
            Lob<span className="text-blue-700">by</span>
          </h1>
          <div className="grid grid-flow-row grid-cols-12 w-full text-lg">
            <label className="col-span-4 justify-start" htmlFor="email">
              Email ID:
            </label>
            <div
              className="col-span-8 justify-start"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            >
              {email}
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-12 w-full text-lg">
            <label className="col-span-4" htmlFor="room">
              Room Number:
            </label>
            <div
              className="col-span-8"
              type="text"
              id="room"
              onChange={(e) => setRoom(e.target.value)}
            >
              {room}
            </div>
          </div>

          <button className="w-fit px-5 self-start py-2 rounded text-white spacegrotesk bg-blue-700 ">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
