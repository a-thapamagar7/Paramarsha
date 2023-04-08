import Navbar from "./Navbar";
import ace from "../Images/ace.jpg"
import star from "../Images/star.png"
import Footer from "./Footer";
import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";

const ContentDetails = () => {
    const [college, setCollege] = useState([])
    const [course, setCourse] = useState([])
    const [university, setUniversity] = useState([])

    useEffect()

    return (
        <>
            <div className="flex flex-col mx-32 gap-y-5">
                <Navbar/>
                <div className="bg-white border shadow-xl rounded-xl h-72 items-center px-9 flex flex-row">
                    <div className="rounded-lg overflow-hidden w-56 h-56 flex justify-center items-center">
                        <img src={ace} className="h-full object-cover object-center"/>
                    </div>
                    <div className="flex flex-col ml-10 gap-y-2">
                        <div className="text-4xl font-sans font-bold">Ace College</div>
                        <div className="text-base font-sans text-gray-500 flex flex-row items-center ml-1 gap-x-2"><span>4 / 5</span> <img className="h-4" src={star}/></div>
                        <div className="text-base text-gray-500 ml-1 lato">New Baneshwor, Kathmandu</div>
                    </div>
                </div>
                <div className="items-center grid lato mt-10 grid-cols-12 gap-y-6">
                    <div className="text-gray-500 text-base col-span-4 pl-10">University</div>
                    <div className="text-gray-700 text-base col-span-2">Pokhara University</div>
                    <hr className="w-full text-gray-500 col-span-12"/>
                    <div className="text-gray-500 text-base col-span-4 pl-10">Website</div>
                    <div className="text-gray-700 text-base col-span-2"><a className="hover:underline hover:text-blue-700" href="https://ace.edu.np/">https://ace.edu.np/</a></div>
                    <hr className="w-full text-gray-500 col-span-12"/>
                    <div className="text-gray-500 text-base col-span-4 pl-10">Approximate Fee</div>
                    <div className="text-gray-700 text-base col-span-2">Rs. 900000</div>
                    <hr className="w-full text-gray-500 col-span-12"/>
                </div>
                <div className="bg-white grid text-sans mt-16 grid-cols-12 gap-y-6 pl-10">
                    <div className="text-gray-700 font-bold text-xl col-span-2">Courses</div>
                    <hr className="w-full text-gray-500 col-span-12"/>
                    <div>
                    {course.map((value, index)=>{
                        return(
                        <InfoCard key={index} name={value.name} imgURL={value.imgURL} location={value.location} description={value.description} subjects={value.subjects}/>
                        )
                        
                    })}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
    );
}
 
export default ContentDetails;