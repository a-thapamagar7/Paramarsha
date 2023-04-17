import Footer from "./Footer";
import Navbar from "./Navbar";
import videoIMG from "../Images/videocall.png"
import { useState } from "react";

const ScheduleMeeting = () => {

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

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
                        <div className="w-full grid grid-cols-12 h-48 rounded shadow-xl border px-7 py-4 lato gap-x-6 gap-y-4">
                            <div className="text-sm font-bold col-span-2">Counselor:</div>
                            <div className="text-sm font-bold col-span-10 text-blue-700">???</div>
                            <div className="text-sm font-bold col-span-2 flex h-8 items-center">Date:</div>
                            <input type="date" className="col-span-4 text-sm border-2 h-8"/>
                            <div className="text-sm font-bold col-span-2 flex h-8 items-center">Time:</div>
                            <input type="time" className="col-span-4 text-sm border-2 h-8"/>
                            <button className="col-span-3 text-white text-sm bg-blue-700 h-10">Request</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
    );
}
 
export default ScheduleMeeting;