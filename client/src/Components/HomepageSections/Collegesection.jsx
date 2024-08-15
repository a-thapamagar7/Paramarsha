import React, { useEffect, useState } from "react";
import Contentcards from "../Common/Contentcards";
import { useNavigate } from "react-router-dom";

const Collegesection = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);

  useEffect(() => {
    getDataInfo(
      setContent,
      `${process.env.REACT_APP_API_URL}/api/gethighestcollege`
    );
  }, []);

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

  return (
    <div className="w-full flex flex-col mt-32 gap-y-7">
      <div
        className="mb-10 flex flex-row items-end"
        style={{ justifyContent: "space-between" }}
      >
        <div className="">
          <div className="text-5xl font-sans font-extrabold tracking-tight text-gray-900">
            <span className="">Discover </span>
            <span className="text-blue-700">Colleges</span>
          </div>
          <div className="mt-3 w-max text-lg text-gray-500">
            Explore some of the best colleges from around the country with our
            curated list
          </div>
        </div>
        <div
          onClick={() => {
            navigate("/content/colleges");
            window.scrollTo(0, 0);
          }}
          className="text-gray-500 text-lg cursor-pointer"
        >
          View All
        </div>
      </div>
      <div className="w-full grid grid-cols-12 gap-x-12">
        {content.map((value, index) => {
          return (
            <Contentcards
              overallRating={Math.trunc(value.overallRating)}
              image={value.imgURL}
              name={value.name}
              rating="4"
              address={value.location}
              items={value.subjects}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Collegesection;
