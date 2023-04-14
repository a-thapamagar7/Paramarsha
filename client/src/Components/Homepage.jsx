import { useState } from "react";
import React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar";
import searchIcon from "../Images/search-icon.png";
import mainImage from "../Images/image.png"
import mainImage1 from "../Images/image1.png"
import mainImage2 from "../Images/image2.png"
import mainImage3 from "../Images/image3.png"
import mainImage4 from "../Images/image4.png"
import test from "../Images/test.png"
import quiz from "../Images/quiz.png"
import review from "../Images/review.png"
import call from "../Images/video-call.png";
import college from "../Images/college.png";
import Collegesection from "./Collegesection";
import Universitysection from "./Universitysection";
import Footer from "./Footer";
import Features from "./Features";
import Subjectcard from "./Subjectcard";

const Homepage = () => {

    const navigate = useNavigate()
    const [imageUrls] = useState([mainImage, mainImage1, mainImage2, mainImage3, mainImage4]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [subject, setSubject] = useState([])
    const [searchValue, setSearchValue] = useState([])


    function updateIndex() {
        setCurrentIndex(currentIndex => (currentIndex + 1) % imageUrls.length);
    }

    useEffect(() => {
        getSubjects()
        const intervalId = setInterval(updateIndex, 1200); // Change image every 5 seconds
        return () => clearInterval(intervalId); // Clean up the interval timer


    }, []);

    const getSubjects = async () => {
        const response = await fetch("http://localhost:1447/api/getsubjects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        setSubject(answer.data)
    }

    return (
        <>
            <div className="px-20">
                {/* Navbar section */}
                <Navbar />
                <div className="w-full h-full maincard flex flex-row gap-10">
                    <div className="pt-14 flex flex-col w-7/12 gap-y-2">
                        <div className="text-5xl font-sans font-extrabold tracking-tight">
                            Find Your Perfect
                        </div>
                        <div className="text-5xl text-blue-700 font-sans font-extrabold tracking-tight">
                            College, Course, University
                        </div>
                        <div className="text-lg mt-8 text-justify lato">
                            With our professional advice and extensive tools, find the ideal bachelor program, college, and university in Nepal. Make a well-informed choice to ensure your future academic and professional success. Welcome to our website "Paramarsha".
                        </div>
                        <div className="w-full flex flex-row mt-10">
                            <div onClick={()=>{navigate(`/content/${searchValue}`)}} className="flex bg-white px-1 items-center justify-center w-2/12 searchBorder">
                                <img className="w-4/12" src={searchIcon} />
                            </div>
                            <input value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}  className="w-11/12 py-1 searchBorder2 inter pr-2" style={{ fontSize: "23px" }} placeholder="Search" type="search" />
                        </div>
                    </div>
                    <div className="w-5/12 h-full">
                        <img className="w-full" src={imageUrls[currentIndex]} />
                    </div>
                </div>
                {/* Features */}
                <div className="mt-20">
                    <div className="text-5xl font-sans font-extrabold tracking-tight text-gray-900 w-full">
                        <span className="">What We </span>
                        <span className="text-blue-700">Offer</span>
                    </div>
                    <div className="w-full grid grid-cols-12 gap-y-10 pt-10">
                        <Features link="/test" name="Mock Tests" details="User will be able to take mock test or exams for preparation of certain courses which require entrance examination." premium="For premium users only, Join Us" image={test}/>
                        <Features name="Meeting with Counselors" details="User will be able to take advice from professional counselors to help them gain proper guidance and support." premium="For premium users only, Join Us" image={call}/>
                        <Features name="Quiz" details="User will be able to take a quiz which will be able to recommend students a course which may be suitable for them according to our system." image={quiz} />
                        <Features link="/content/colleges" name="Review System" details="User will be able rate the rate the colleges on the basis of different factors which will be later rounded to give an overall rating." image={review} />
                        <Features link="/content/all" name="Colleges and Courses" details="User will be able to access information about the vast number of colleges, courses and univesities of Nepal." image={college} />
                    </div>
                </div>

                <div className="mt-24">
                    <div className="text-5xl font-sans font-extrabold tracking-tight text-gray-900 w-full flex flex-row justify-center">
                        <span className="">Sub </span>
                        <span className="text-blue-700">jects</span>
                    </div>
                    <div className="w-full grid grid-cols-12">
                        {subject.map((value, index) => {
                            return(
                                <Subjectcard name={value} key={index} />
                            )
                            
                        })}
                    </div>
                </div>
                <Collegesection />
                <Universitysection />
            </div>
            <Footer className="mt-20" />
        </>
    );
}

export default Homepage;