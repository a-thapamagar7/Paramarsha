import { useEffect, useState } from "react";
import mainImage from "../../Images/image.png";
import mainImage1 from "../../Images/image1.png";
import mainImage2 from "../../Images/image2.png";
import mainImage3 from "../../Images/image3.png";
import mainImage4 from "../../Images/image4.png";
import InfoCard from "../../Components/Common/InfoCard";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const [imageUrls] = useState([
    mainImage,
    mainImage1,
    mainImage2,
    mainImage3,
    mainImage4,
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState([
    "Which subject do you prefer in your college?",
    "Which course do you prefer?",
    "Which is the amount you are willing to pay for your bachelors?",
    "This is the college we recommend:",
  ]);
  const [data, setData] = useState([]);
  const [qID, setQID] = useState(0);
  const [found, setFound] = useState(false);
  const [college, setCollege] = useState(false);
  const [collegeFee, setCollegeFee] = useState(false);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState({});

  function updateIndex() {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % imageUrls.length);
  }

  useEffect(() => {
    const intervalId = setInterval(updateIndex, 1200); // Change image every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval timer
  }, []);

  useEffect(() => {
    getDataInfo(
      setOptions,
      `${process.env.REACT_APP_API_URL}/api/getquizsubjects`
    );
  }, []);

  const nextQuestion = async (num, value) => {
    if (num === 1) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/getquizcourses/${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const answer = await response.json();
      if (answer.only == true) {
        setCollege(answer.college);
        setQID(question.length - 1);
        setFound(true);
      } else {
        setOptions(answer.data);
        setCollege(answer.college);
        setQID(qID + 1);
      }
    }
    if (num === 2) {
      const filteredColleges = college.filter((coll) =>
        coll.courses.includes(value)
      );
      if (filteredColleges.length == 1) {
        setCollege(filteredColleges);
        setQID(question.length - 1);
        setFound(true);
      } else {
        setCollege(filteredColleges);
        setQID(qID + 1);
        setLastQuestion(true);
      }
    }
  };

  const getDataInfo = async (setData, url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const answer = await response.json();
    if (answer.data) {
      setData(answer.data);
    }
  };

  const OnSubmit = () => {
    if (collegeFee <= 0) {
      const newError = { ...error };
      newError.message = "The value must be greater than zero";
      newError.style = "text-red-700 text-sm";
      setError(newError);
    } else {
      const diffColleges = college.map((college) => ({
        ...college,
        diff: Math.abs(collegeFee - college.approximateFee),
      }));

      // Sort colleges based on the calculated absolute difference
      diffColleges.sort((a, b) => a.diff - b.diff);

      // Filter colleges with the smallest absolute difference (closest fee)
      setCollege(diffColleges);
      setQID(question.length - 1);
      setFound(true);
    }
  };

  return (
    <div>
      <div className="bg-blue-300 h-screen flex justify-center items-center">
        <div className="bg-white h-5/6 w-2/3 rounded-lg flex flex-col items-center justify-center shadow-2xl drop-shadow-xl">
          {found ? (
            <></>
          ) : (
            <img className="h-48" src={imageUrls[currentIndex]} />
          )}
          <div className="font-bold text-xl lato">
            {qID != question.length - 1 ? qID + 1 + ") " : ""}
            {question[qID]}
          </div>
          {found ? (
            <div className="w-5/6 mt-10 flex flex-col gap-y-5">
              <InfoCard
                key={"ji"}
                name={college[0].name}
                imgURL={college[0].imgURL}
                location={college[0].location}
                description={college[0].description}
                subjects={college[0].subjects}
              />
              <button
                className="bg-blue-700  rounded text-white w-1/3 h-10"
                onClick={() => navigate("/")}
              >
                Home
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-6 justify-between gap-x-10 gap-y-5 mt-10 text-base">
                {lastQuestion ? (
                  <div className="flex flex-col col-span-6 justify-center items-center gap-y-5">
                    <input
                      className="border-2 w-96 ml-10 border-black h-10 px-3 py-2"
                      value={collegeFee}
                      onChange={(e) => {
                        setCollegeFee(e.target.value);
                      }}
                      type="number"
                    />
                    <button
                      onClick={() => OnSubmit()}
                      className="bg-blue-700  rounded-sm text-white w-1/3 h-8"
                    >
                      Submit
                    </button>
                    <div className={error.style}>{error.message}</div>
                  </div>
                ) : (
                  <>
                    {options.map((value, index) => {
                      return (
                        <div
                          onClick={() => {
                            setSelectedValue(value);
                            nextQuestion(qID + 1, value);
                          }}
                          key={index + value}
                          className="quizCard cursor-pointer col-span-2 flex h-20 w-60 text-center justify-center items-center border-2 border-gray-200 rounded shadow-lg"
                        >
                          {value}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
