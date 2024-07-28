import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Common/Navbar";
import videoIMG from "../../Images/videocall.png"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const ScheduleMeeting = () => {

    const navigate = useNavigate()
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [roomCode, setRoomCode] = useState("")
    const [error, setError] = useState({})
    const [availableMeeting, setAvailableMeeting] = useState([])
    const [user, setUser] = useState("")

    useEffect(() => {
        GetMeetings()
    }, [])

    const tomorrowDate = () => {
        const currentDate = new Date();
        const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        const tomorrowDateString = tomorrowDate.toISOString().slice(0, 10);
        return tomorrowDateString
    }

    const DeleteMeeting = async (id) => {
        const response = await fetch(`http://localhost:1447/api/meeting/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const answer = await response.json()
        if (answer.status = "success") {
            const newData = availableMeeting.filter(item => item._id !== id)
            setAvailableMeeting(newData)
            toast.success(answer.message)
        }
        else {
            toast.error(answer.message)
        }

    }

    const AcceptMeeting = async (id) => {
        const response = await fetch(`http://localhost:1447/api/acceptmeeting/${id}`, {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        })
        const answer = await response.json()
        if (answer.status = "success") {
            toast.success(answer.message)
            GetMeetings()
        }
        else {
            toast.error(answer.message)
        }

    }

    const MakeNormalDate = (utcTimestamp) => {
        const date = new Date(utcTimestamp);
        const localDateString = date.toLocaleString();
        return localDateString
    }

    const SendMeeting = async () => {
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
                scheduledDate
            })
        })

        const data = await response.json()
        if (data.status == "success") {
            toast.success(data.message)
            GetMeetings()

        } else {
            toast.error(data.message)
        }
    }

    const GetMeetings = async () => {
        if (localStorage.getItem('token')) {
            const response = await fetch("http://localhost:1447/api/getmeetings", {
                method: "POST",
                //sends the data in json format
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            setUser(data.user)
            if (data.data) {
                console.log(data.data)
                console.log(data.user)
                setAvailableMeeting(data.data)
            }

        }

    }

    const OnSubmit = (e) => {
        e.preventDefault()
        if (date === "" || time === "") {
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
                <ToastContainer />
                <Navbar />
                <div className="w-full flex flex-row mt-10 gap-x-20">
                    <div className="w-5/12 ml-10">
                        <img className="w-full" src={videoIMG} />
                    </div>

                    <div className="w-full flex flex-col gap-y-3">
                        <div className="font-bold tracking-tight text-2xl">Request <span className="text-blue-700">Meeting</span></div>
                        <hr />
                        {availableMeeting.length > 0 ?
                            <>
                                {availableMeeting.map((value, index) => {
                                    return (
                                        <>
                                            {(user.role === "user")? 
                                                <div key={index} className="w-full grid grid-cols-12 h-fit rounded shadow-xl border px-7 py-4 lato gap-x-6 gap-y-4">
                                                    <div className="text-sm font-bold col-span-2">Counselor:</div>
                                                    <div className="text-sm font-bold col-span-10">{`${value.counselor.firstName} ${value.counselor.lastName}`}</div>
                                                    <div className="text-sm font-bold col-span-2 flex items-center">Date:</div>
                                                    <div className="col-span-10 text-sm flex flex-row items-center">{MakeNormalDate(value.scheduledDate)}</div>
                                                    {(!value.roomCode ?
                                                        <>
                                                            <div className="text-sm font-bold col-span-2 flex items-center">Status:</div>
                                                            <div className="col-span-10 text-sm flex flex-row items-center">Pending</div>
                                                            <div className="text-sm font-bold col-span-2 flex items-center">Room code:</div>
                                                            <div className="col-span-10 text-sm flex flex-row items-center">???</div>
                                                            <div className="col-span-12 grid grid-cols-12">
                                                                <button onClick={() => { DeleteMeeting(value._id) }} className="col-span-3 text-white text-sm bg-red-700 hover:bg-red-600 h-10">Cancel</button>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="text-sm font-bold col-span-2 flex items-center">Status:</div>
                                                            <div className="col-span-10 text-sm flex flex-row items-center">Approved</div>
                                                            <div className="text-sm font-bold col-span-2 flex items-center">Room code:</div>
                                                            <div className="col-span-4 text-sm flex flex-row items-center">{value.roomCode}</div>
                                                            <div className="col-span-12 grid grid-cols-12">
                                                                <button onClick={() => {navigate(`/lobby/${value._id}`)}} className="col-span-3 text-white text-sm bg-blue-700 hover:bg-blue-600 h-10">Join</button>
                                                            </div>

                                                        </>
                                                    )}
                                                </div>
                                            :
                                            <div key={index} className="w-full grid grid-cols-12 h-fit rounded shadow-xl border px-7 py-4 lato gap-x-6 gap-y-4">
                                                <div className="text-sm font-bold col-span-2">User:</div>
                                                <div className="text-sm font-bold col-span-10">{`${value.user.firstName} ${value.user.lastName}`}</div>
                                                <div className="text-sm font-bold col-span-2 flex items-center">Date:</div>
                                                <div className="col-span-10 text-sm flex flex-row items-center">{MakeNormalDate(value.scheduledDate)}</div>
                                                {(!value.roomCode ?
                                                    <>
                                                        <div className="text-sm font-bold col-span-2 flex items-center">Status:</div>
                                                        <div className="col-span-10 text-sm flex flex-row items-center">Pending</div>
                                                        <div className="text-sm font-bold col-span-2 flex items-center">Room code:</div>
                                                        <div className="col-span-10 text-sm flex flex-row items-center">???</div>
                                                        <div className="col-span-12 grid grid-cols-12 gap-x-2">
                                                            <button onClick={() => { AcceptMeeting(value._id) }} className="col-span-3 text-white text-sm bg-green-700 hover:bg-green-600 h-10">Accept</button>
                                                            <button onClick={() => { DeleteMeeting(value._id) }} className="col-span-3 text-white text-sm bg-red-700 hover:bg-red-600 h-10">Cancel</button>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="text-sm font-bold col-span-2 flex items-center">Status:</div>
                                                        <div className="col-span-10 text-sm flex flex-row items-center">Approved</div>
                                                        <div className="text-sm font-bold col-span-2 flex items-center">Room code:</div>
                                                        <div className="col-span-4 text-sm flex flex-row items-center">{value.roomCode}</div>
                                                        <div className="col-span-12 grid grid-cols-12 gap-x-2">
                                                            <button onClick={() => {navigate(`/lobby/${value._id}`)}} className="col-span-3 text-white text-sm bg-blue-700 hover:bg-blue-600 h-10">Join</button>
                                                            <button onClick={() => { DeleteMeeting(value._id) }} className="col-span-3 text-white text-sm bg-red-700 hover:bg-red-600 h-10">Cancel</button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>}
                                            
                                        </>
                                        
                                    )

                                })}
                            </>

                            :
                            <form onSubmit={(e) => OnSubmit(e)} className="w-full grid grid-cols-12 h-52 rounded shadow-xl border px-7 py-4 lato gap-x-6 gap-y-4">
                                <div className="text-sm font-bold col-span-2">Counselor:</div>
                                <div className="text-sm font-bold col-span-10 text-blue-700">???</div>
                                <div className="text-sm font-bold col-span-2 flex h-8 items-center">Date:</div>
                                <input value={date} min={tomorrowDate()} onChange={(e) => { setDate(e.target.value) }} type="date" className="col-span-4 text-sm border-2 h-8" />
                                <div className="text-sm font-bold col-span-2 flex h-8 items-center">Time:</div>
                                <input value={time} onChange={(e) => { setTime(e.target.value) }} type="time" className="col-span-4 text-sm border-2 h-8" />
                                <div className="col-span-12 grid grid-cols-12">
                                    <button type="submit" className="col-span-3 hover:bg-blue-500 text-white text-sm bg-blue-700 h-10">Request</button>
                                </div>

                            </form>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default ScheduleMeeting;