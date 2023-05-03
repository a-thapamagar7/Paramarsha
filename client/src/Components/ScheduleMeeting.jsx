import Footer from "./Footer";
import Navbar from "./Navbar";
import videoIMG from "../Images/videocall.png"
import { useEffect, useState } from "react";

const ScheduleMeeting = () => {

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [roomCode, setRoomCode] = useState("")
    const [error, setError] = useState({})
    const [availableMeeting, setAvailableMeeting] = useState({})
    const [user, setUser] = useState("")

    useEffect(()=>{
        GetMeetings()
    },[])

    

    const SendMeeting = async() => {
        const scheduledDate = `${date}T${time}:00.000Z`;
        const response = await fetch("http://localhost:1447/api/meeting/create", {
            method: "POST",
            //sends the data in json format
            headers: {
                'x-access-token': localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            //sends the states to the server
            body: JSON.stringify({
                scheduledDate,
                roomCode
            })
        })

        const data = await response.json()
        console.log(data)
        if (data.message == "data_added") {
            const newError = { ...error }
            newError.message = "The meeting has been sucessfully added"
            newError.style = "text-green-700 text-sm"
            setError(newError)
        } else {
            const newError = { ...error }
            newError.message = "There was an error"
            newError.style = "text-red-600 text-sm"
            setError(newError)
        }
    }

    const GetMeetings = async() => {
        const response = await fetch("http://localhost:1447/api/getmeetings", {
            method: "POST",
            //sends the data in json format
            headers: {
                'x-access-token': localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        console.log(data)
        setUser(data.user)
        if (data.data) {
            setAvailableMeeting(data.data)
        }
            
    }

    const OnSubmit = () => {
        if(date === "" || time === ""){
            const newError = { ...error }
            newError.message = "There can be no empty fields"
            newError.style = "text-red-600 text-sm"
            setError(newError)
        }
        SendMeeting()
        setDate("")
        setTime("")
        setRoomCode("")

    }

    return (
        <>
            <div className="w-full px-20">
                <Navbar/>
                <div className="w-full flex flex-row mt-10 gap-x-20">
                    <div className="w-5/12 ml-10">
                        <img className="w-full" src={videoIMG}/>
                    </div>
                    
                    <div className="w-full flex flex-col gap-y-3">
                        <div className="font-bold tracking-tight text-2xl">Request <span className="text-blue-700">Meeting</span></div>
                        <hr/>
                        {availableMeeting? 
                            <></>
                        :
                            <div className="w-full grid grid-cols-12 h-52 rounded shadow-xl border px-7 py-4 lato gap-x-6 gap-y-4">
                                <div className="text-sm font-bold col-span-2">Counselor:</div>
                                <div className="text-sm font-bold col-span-10 text-blue-700">???</div>
                                <div className="text-sm font-bold col-span-2 flex h-8 items-center">Date:</div>
                                <input value={date} onChange={(e)=>{setDate(e.target.value)}} type="date" className="col-span-4 text-sm border-2 h-8"/>
                                <div className="text-sm font-bold col-span-2 flex h-8 items-center">Time:</div>
                                <input value={time} onChange={(e)=>{setTime(e.target.value)}} type="time" className="col-span-4 text-sm border-2 h-8"/>
                                <div className="text-sm font-bold col-span-2 flex h-8 items-center">Room Code:</div>
                                <input value={roomCode} onChange={(e)=>{setRoomCode(e.target.value)}} className="col-span-4 text-sm border-2 h-8"/>
                                <div className="col-span-12 grid grid-cols-12">
                                    <button onClick={OnSubmit} className="col-span-3 text-white text-sm bg-blue-700 h-10">Request</button>
                                </div>
                                
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
    );
}
 
export default ScheduleMeeting;