import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const {id} = useParams()
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
    if (localStorage.getItem('token')) {
      const response = await fetch(`http://localhost:1447/api/meetingdetails/${id}`, {
          method: "GET",
          headers: {
            'x-access-token': localStorage.getItem('token'),
            "Content-Type": "application/json"
          }
      })
      const answer = await response.json()
      console.log(answer)
      setEmail(answer.user.email)
      setRoom(answer.data.roomCode)
  }

}

  useEffect(()=>{
    GetMeeting()
  },[])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex items-center flex-col gap-y-7">
        <h1 className="spacegrotesk text-2xl">Lobby</h1>
        <form className="flex flex-col items-center gap-y-7" onSubmit={handleSubmitForm}>
          <div className="grid grid-flow-row grid-cols-12 text-lg">
            <label className="col-span-5" htmlFor="email">Email ID:</label>
            <div
              className="col-span-7"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            >
              {email}
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-12 w-full text-lg">
            <label className="col-span-5" htmlFor="room">Room Number:</label>
            <div
              className="col-span-7"
              type="text"
              id="room"
              onChange={(e) => setRoom(e.target.value)}
            >
              {room}
            </div>
          </div>
          
          <button className="w-fit px-5 self-start py-2 rounded text-white spacegrotesk bg-blue-700 ">Join</button>
        </form>
      </div>
      
    </div>
  );
};

export default LobbyScreen;
