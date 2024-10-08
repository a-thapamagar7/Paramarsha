import React, { useEffect, useState } from "react";
import InfoCard from "../../Components/Common/InfoCard";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";
import { useNavigate, useParams } from "react-router-dom";

import searchIcon from "../../Images/search-icon.png";

const InformationShowcase = () => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [content, setContent] = useState([]);
  const [college, setCollege] = useState([]);
  const [course, setCourse] = useState([]);
  const [university, setUniversity] = useState([]);
  const [subject, setSubject] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  useEffect(() => {
    getContentInfo();
  }, [topic]);

  const getDataInfo = async (setData, url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const answer = await response.json();
    setData(answer.data);
  };

  const getIndiDataInfo = async (setData, url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const answer = await response.json();
    let newContent = [...content];
    if (answer.data) newContent = answer.data;
    setData(newContent);
  };

  const getContentInfo = async () => {
    if (topic === "colleges") {
      getDataInfo(
        setContent,
        `${process.env.REACT_APP_API_URL}/api/getcollegeinfo`
      );
    } else if (topic === "universities") {
      getDataInfo(
        setContent,
        `${process.env.REACT_APP_API_URL}/api/getuniversityinfo`
      );
    } else if (topic === "subjects") {
      getDataInfo(
        setContent,
        `${process.env.REACT_APP_API_URL}/api/getsubjectinfo`
      );
    } else if (topic === "courses") {
      getDataInfo(
        setContent,
        `${process.env.REACT_APP_API_URL}/api/getcourseinfo`
      );
    } else if (topic === "all") {
      getDataInfo(
        setUniversity,
        `${process.env.REACT_APP_API_URL}/api/getuniversityinfo`
      );
      getDataInfo(
        setCollege,
        `${process.env.REACT_APP_API_URL}/api/getcollegeinfo`
      );
      getDataInfo(
        setSubject,
        `${process.env.REACT_APP_API_URL}/api/getsubjectinfo`
      );
      getDataInfo(
        setCourse,
        `${process.env.REACT_APP_API_URL}/api/getcourseinfo`
      );
    } else {
      getIndiDataInfo(
        setContent,
        `${process.env.REACT_APP_API_URL}/api/search/${topic}`
      );
    }
  };

  return (
    <>
      <div className="px-20 flex flex-col gap-y-7 mb-10">
        <Navbar />
        <div className="w-full flex flex-row mt-10 mb-10 justify-center">
          <div className="w-2/3 flex flex-row">
            <div
              onClick={() => {
                navigate(`/content/${searchValue}`);
                window.scrollTo(0, 0);
              }}
              className="flex bg-white px-1 items-center justify-center w-2/12 searchBorder cursor-pointer"
            >
              <img className="w-3/12" src={searchIcon} />
            </div>
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="w-11/12 py-1 searchBorder2 inter pr-2"
              style={{ fontSize: "23px" }}
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
        {topic === "all" ? (
          <>
            {college.map((value, index) => {
              return (
                <InfoCard
                  key={index}
                  name={value.name}
                  imgURL={value.imgURL}
                  location={value.location}
                  description={value.description}
                  subjects={value.subjects}
                />
              );
            })}
            {university.map((value, index) => {
              return (
                <InfoCard
                  key={index}
                  name={value.name}
                  imgURL={value.imgURL}
                  location={value.location}
                  description={value.description}
                  subjects={value.subjects}
                />
              );
            })}
            {subject.map((value, index) => {
              return (
                <InfoCard
                  key={index}
                  name={value.name}
                  imgURL={value.imgURL}
                  location={value.location}
                  description={value.description}
                  subjects={value.subjects}
                />
              );
            })}
            {course.map((value, index) => {
              return (
                <InfoCard
                  key={index}
                  name={value.name}
                  imgURL={value.imgURL}
                  location={value.location}
                  description={value.description}
                  subjects={value.subjects}
                />
              );
            })}
          </>
        ) : (
          <>
            {content.length != 0 ? (
              <>
                {content.map((value, index) => {
                  return (
                    <InfoCard
                      key={index}
                      name={value.name}
                      imgURL={value.imgURL}
                      location={value.location}
                      description={value.description}
                      subjects={value.subjects}
                    />
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InformationShowcase;
