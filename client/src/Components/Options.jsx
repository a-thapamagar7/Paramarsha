import React, { useContext, useState } from 'react'
import { SocketContext } from '../SocketContext';

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState("");

    return (
        <div>
            <div>
                <div noValidate autoComplete='off' style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <div>
                        <div>
                            <h6>Account Info</h6>
                            <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                            <h6>{me}</h6>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h6>Make a call</h6>
                            <input placeholder='ID to call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
                            {console.log(idToCall)}
                            {callAccepted && !callEnded ? (
                                <button onClick={leaveCall}>Leave Call</button>
                            ) : (
                                <button onClick={() => callUser(idToCall)}>Call</button>
                            )}
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Options;