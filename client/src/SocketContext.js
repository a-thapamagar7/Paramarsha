// import React, { createContext, useState, useRef, useEffect } from "react"
// import { io } from "socket.io-client"
// import Peer from "simple-peer"

// const SocketContext = createContext();

// const socket = io("http://localhost:1447");

// const ContextProvider = ({ children }) => {

//     const [stream, setStream] = useState(null)
//     const [me, setMe] = useState("")
//     const [call, setCall] = useState({});
//     const [callAccepted, setCallAccepted] = useState(false)
//     const [callEnded, setCallEnded] = useState(false)
//     const [name, setName] = useState("")

//     const myVideo = useRef();
//     const userVideo = useRef();
//     const connectionRef = useRef();

//     useEffect(() => {
//         //asks for permission of video and audio
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((currentStream) => {
//                 setStream(currentStream)

//             })

//         socket.on("me", (id) => setMe(id))

//         socket.on("calluser", ({ from, name: callerName, signal }) => {
//             setCall({ isReceivedCall: true, from, name: callerName, signal })
//         })
//     }, [])

//     useEffect(() => {
//         if (myVideo.current) {
//           myVideo.current.srcObject = stream;
//         }
//       }, [myVideo, stream]);

//     const answerCall = () => {
//         setCallAccepted(true);

//     const peer = new Peer({ initiator: false, trickle: false, stream });

//     // Attach the signal event listener
//     peer.on("signal", (data) => {
//         socket.emit("answercall", { signal: data, to: call.from });
//     });

//     // sets the video for the caller
//     peer.on("stream", (currentStream) => {
//         userVideo.current.srcObject = currentStream;
//     });

//     // Call peer.signal() after attaching the signal event listener
//     peer.signal(call.signal);

//   connectionRef.current = peer;
//     }

//     const callUser = (id) => {
//         const peer = new Peer({ initator: true, trickle: false, stream });

//         peer.on("signal", (data) => {
//             socket.emit("calluser", { userToCall: id, signalData: data, from: me, name })
//         })

//         //sets the video for the caller
//         peer.on("stream", (currentStream) => {
//             userVideo.current.srcObject = currentStream
//         })

//         socket.on("callaccepted", (signal) => {
//             setCallAccepted(true);

//             peer.signal(signal)
//         })

//         connectionRef.current = peer;
//     }

//     const leaveCall = () => {
//         setCallEnded(true);

//         connectionRef.current.destroy()

//         window.location.reload();
//     }

//     return (
//         <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }}>
//             {children}
//         </SocketContext.Provider>
//     )
// }

// export { ContextProvider, SocketContext }