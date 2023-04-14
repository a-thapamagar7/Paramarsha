import React, { useEffect, useState } from 'react';
import InfoCard from './InfoCard';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate, useParams } from 'react-router-dom';

import searchIcon from "../Images/search-icon.png";

const InformationShowcase = () => {
  const navigate = useNavigate()
  const {topic} = useParams()
  const [content, setContent] = useState([])
  const [college, setCollege] = useState([])
  const [course, setCourse] = useState([])
  const [university, setUniversity] = useState([])
  const [subject, setSubject] = useState([])
  const [searchValue, setSearchValue] = useState([])

  useEffect(()=>{
    getContentInfo()
  },[topic])

  const getDataInfo = async(setData, url) => {
    const response = await fetch(url, 
      {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
      }
      });
      
      const answer = await response.json();
      setData(answer.data)
  }

  const getIndiDataInfo = async(setData, url) => {
    const response = await fetch(url, 
      {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
      }
      });
      
      const answer = await response.json();
      let newContent = [...content]
      if(answer.data) newContent = answer.data
      setData(newContent)
  }

  const getContentInfo = async() => {
    if(topic === "colleges")
    {
      getDataInfo(setContent, "http://localhost:1447/api/getcollegeinfo")
    }
    else if(topic === "universities")
    {
      getDataInfo(setContent, "http://localhost:1447/api/getuniversityinfo")
    }
    else if(topic === "subjects")
    {
      getDataInfo(setContent, "http://localhost:1447/api/getsubjectinfo")
    }
    else if(topic === "course")
    {
      getDataInfo(setContent, "http://localhost:1447/api/getcourseinfo")
    }
    else if(topic === "all")
    {
      getDataInfo(setUniversity, "http://localhost:1447/api/getuniversityinfo")
      getDataInfo(setCollege, "http://localhost:1447/api/getcollegeinfo")
      getDataInfo(setSubject, "http://localhost:1447/api/getsubjectinfo")
      getDataInfo(setCourse, "http://localhost:1447/api/getcourseinfo")
    }
    else{
      getIndiDataInfo(setContent, `http://localhost:1447/api/search/${topic}`)
      
    }
  }

  return (
    <>
      <div className='px-20 flex flex-col gap-y-7 mb-10'>
        <Navbar/>
        <div className="w-full flex flex-row mt-10 mb-10 justify-center">
          <div className='w-2/3 flex flex-row'>
            <div onClick={()=>{navigate(`/content/${searchValue}`); window.scrollTo(0, 0)}} className="flex bg-white px-1 items-center justify-center w-2/12 searchBorder">
                <img className="w-2/12" src={searchIcon} />
            </div>
            <input value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}  className="w-11/12 py-1 searchBorder2 inter pr-2" style={{ fontSize: "23px" }} placeholder="Search" type="search" />
          </div>
        </div>
        {(topic === "all")?
        (<>
            {college.map((value, index)=>{
            return(
              <InfoCard key={index} name={value.name} imgURL={value.imgURL} location={value.location} description={value.description} subjects={value.subjects}/>
            )
            
          })}
          {university.map((value, index)=>{
            return(
              <InfoCard key={index} name={value.name} imgURL={value.imgURL} location={value.location} description={value.description} subjects={value.subjects}/>
            )
            
          })}
          {subject.map((value, index)=>{
            return(
              <InfoCard key={index} name={value.name} imgURL={value.imgURL} location={value.location} description={value.description} subjects={value.subjects}/>
            )
            
          })}
          {course.map((value, index)=>{
            return(
              <InfoCard key={index} name={value.name} imgURL={value.imgURL} location={value.location} description={value.description} subjects={value.subjects}/>
            )
            
          })}
        </>)
        :
        (<>
          {content.length != 0? 
          <>
            {content.map((value, index)=>{
              
            return(
              <InfoCard key={index} name={value.name} imgURL={value.imgURL} location={value.location} description={value.description} subjects={value.subjects}/>
            )
            
            })}
          </>:
          <>

          </>}
        </>)}
        
      </div>
      <Footer/>
    </>
    
    
  );
}

export default InformationShowcase;