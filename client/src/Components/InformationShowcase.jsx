import React, { useEffect, useState } from 'react';
import InfoCard from './InfoCard';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';


const InformationShowcase = () => {

  const {topic} = useParams()
  const [content, setContent] = useState([])
  const [college, setCollege] = useState([])
  const [course, setCourse] = useState([])
  const [university, setUniversity] = useState([])
  const [subject, setSubject] = useState([])

  useEffect(()=>{
    getContentInfo()
  },)

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
      
    }
  }

  return (
    <>
      <div className='px-20 flex flex-col gap-y-7 mb-10'>
        <Navbar/>
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
          {content.map((value, index)=>{
            return(
              <InfoCard key={index} name={value.name} imgURL={value.imgURL} location={value.location} description={value.description} subjects={value.subjects}/>
            )
            
          })}
        </>)}
        
      </div>
      <Footer/>
    </>
    
    
  );
}

export default InformationShowcase;