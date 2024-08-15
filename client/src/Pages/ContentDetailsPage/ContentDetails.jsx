import Navbar from "../../Components/Common/Navbar";
import star from "../../Images/star.png";
import userIMG from "../../Images/user.png";
import Footer from "../../Components/Common/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ComboBox from "../../Components/Common/ComboBox";

const ContentDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [facilities, setFacilties] = useState(0);
  const [education, setEducation] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [isCollege, setIsCollege] = useState(false);
  const [comment, setComment] = useState("");
  const [availableRatings, setAvailableRatings] = useState([
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
  ]);
  const [error, setError] = useState({});

  useEffect(() => {
    getDataInfo(
      setContent,
      `${process.env.REACT_APP_API_URL}/api/info/${name}`
    );
  }, [name]);

  const createReview = async () => {
    const overallRating = Math.trunc(
      (parseInt(facilities) + parseInt(education)) / 2
    );
    const college = content._id;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/review/create`,
      {
        method: "POST",
        //sends the data in json format
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        //sends the states to the server

        body: JSON.stringify({
          facilities,
          education,
          overallRating,
          college,
          comment,
        }),
      }
    );
    const data = await response.json();
    if (data.message == "data_added") {
      const newError = { ...error };
      const newReviews = [...reviews];
      newReviews.unshift({
        facilities: facilities,
        education: education,
        overallRating: overallRating,
        comment: comment,
        user: {
          college: college,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
      setReviews(newReviews);
      newError.message = "Added";
      newError.style = "text-green-700 text-sm";
      setError(newError);
    } else if (data.message == "not_user" || data.message == "empty_token") {
      localStorage.removeItem("token");
      navigate("/login");
    } else if (data.error == "input_exists") {
      const newError = { ...error };
      newError.message = "You have already reviewed this college";
      newError.style = "text-red-700 text-sm";
      setError(newError);
    } else {
      const newError = { ...error };
      newError.message = "Error verifying";
      newError.style = "text-red-700 text-sm";
      setError(newError);
    }
  };

  const getReview = async (contentID) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getcolleges/${contentID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    setReviews(answer.data);
    setRatings(answer.allReviews);
  };

  const handleChangeFacilities = (value) => {
    setFacilties(value);
  };
  const handleChangeEducation = (value) => {
    setEducation(value);
  };

  const getDataInfo = async (setData, url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const answer = await response.json();
    if (answer.dataType === "college") {
      setIsCollege(true);
    }
    setData(answer.data);
    getReview(answer.data._id);
  };

  const onReviewSubmit = (event) => {
    event.preventDefault();
    createReview();
    setFacilties("");
    setEducation("");
    setComment("");
  };

  return (
    <>
      <div className="flex flex-col mx-32 gap-y-5">
        <Navbar />

        {content ? (
          <>
            <div className="bg-white border shadow-xl rounded-xl h-72 items-center px-9 flex flex-row">
              {content.logoURL ? (
                <div className="rounded-lg overflow-hidden w-56 h-56 flex justify-center items-center">
                  <img
                    src={content.logoURL}
                    className="h-full object-cover object-center"
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-col ml-10 gap-y-2">
                <div className="text-4xl font-sans font-bold">
                  {content.name}
                </div>
                {isCollege ? (
                  <div className="text-base font-sans text-gray-500 flex flex-row items-center ml-1 gap-x-2">
                    <span>{ratings.overallRatingAvg} / 5</span>{" "}
                    <img className="h-4" src={star} />
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-base text-gray-500 ml-1 lato">
                  {content.location}
                </div>
              </div>
            </div>
            <div className="items-center grid lato mt-10 grid-cols-12 gap-y-6">
              {content.university ? (
                <>
                  <div className="text-gray-500 text-base col-span-4 pl-10">
                    University
                  </div>
                  <div
                    onClick={() => {
                      navigate("/info/" + content.university);
                    }}
                    className="text-gray-700 text-base col-span-8 hover:underline hover:text-blue-700 cursor-pointer"
                  >
                    {content.university}
                  </div>
                  <hr className="w-full text-gray-500 col-span-12" />
                </>
              ) : (
                <></>
              )}
              {content.website ? (
                <>
                  <div className="text-gray-500 text-base col-span-4 pl-10">
                    Website
                  </div>
                  <div className="text-gray-700 text-base col-span-8">
                    <a
                      className="hover:underline hover:text-blue-700"
                      href={content.website}
                    >
                      {content.website}
                    </a>
                  </div>
                  <hr className="w-full text-gray-500 col-span-12" />
                </>
              ) : (
                <></>
              )}
              {ratings.facilitiesAvg ? (
                <>
                  <div className="text-gray-500 text-base col-span-4 pl-10">
                    Facilities
                  </div>
                  <div className="text-gray-700 text-base col-span-8 flex flex-row items-center">
                    {ratings.facilitiesAvg} / 5
                    <img className="h-3 ml-1" src={star} />
                  </div>
                  <hr className="w-full text-gray-500 col-span-12" />
                </>
              ) : (
                <></>
              )}
              {ratings.educationAvg ? (
                <>
                  <div className="text-gray-500 text-base col-span-4 pl-10">
                    Education
                  </div>
                  <div className="text-gray-700 text-base col-span-8 flex flex-row items-center">
                    {ratings.educationAvg} / 5
                    <img className="h-3 ml-1" src={star} />
                  </div>
                  <hr className="w-full text-gray-500 col-span-12" />
                </>
              ) : (
                <></>
              )}
              {content.approximateFee ? (
                <>
                  <div className="text-gray-500 text-base col-span-4 pl-10">
                    Approximate Fee
                  </div>
                  <div className="text-gray-700 text-base col-span-2">
                    Rs. {content.approximateFee}
                  </div>
                  <hr className="w-full text-gray-500 col-span-12" />
                </>
              ) : (
                <></>
              )}
              {content.courses ? (
                <>
                  <div className="text-gray-500 text-base col-span-4 pl-10">
                    Courses
                  </div>
                  <div className="text-gray-700 text-base col-span-8 flex flex-col gap-y-2">
                    {content.courses.map((value, index) => {
                      return (
                        <div
                          className="hover:underline hover:text-blue-700 cursor-pointer"
                          key={index + value}
                          onClick={() => {
                            navigate("/info/" + value);
                          }}
                        >
                          {value}
                        </div>
                      );
                    })}
                  </div>
                  <hr className="w-full text-gray-500 col-span-12" />
                </>
              ) : (
                <></>
              )}

              {content.subjects ? (
                <>
                  <div className="text-gray-500 text-base col-span-4 pl-10">
                    Subjects
                  </div>
                  <div className="text-gray-700 text-base col-span-8">
                    {content.subjects.map((value, i) => {
                      return (
                        <span
                          key={value + i}
                          onClick={() => {
                            navigate("/info/" + value);
                          }}
                          className="inline-block bg-blue-700 rounded-full px-3 py-1 text-xs font-semibold text-white mr-2 mb-2 cursor-pointer"
                        >
                          {value}
                        </span>
                      );
                    })}
                  </div>
                  <hr className="w-full text-gray-500 col-span-12" />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="bg-white grid text-sans mt-16 grid-cols-12 gap-y-4 pl-10">
              <div className="text-gray-700 font-bold text-xl col-span-2">
                Description
              </div>
              <hr className="w-full text-gray-500 col-span-12" />
              <div className="col-span-12 text-justify lato text-gray-700">
                {content.description}
              </div>
            </div>
            {isCollege ? (
              <>
                <div className="bg-white grid text-sans mt-16 grid-cols-12 gap-y-10 pl-10 gap-x-7 px-11">
                  <div className="text-gray-700 font-bold text-xl col-span-2">
                    Reviews
                  </div>
                  <hr className="w-full text-gray-500 col-span-12 place-items-center" />
                  <form
                    onSubmit={onReviewSubmit}
                    className="col-span-12 bg-white grid text-sans grid-cols-12 gap-y-4 gap-x-7 px-7 py-4 rounded lato shadow"
                  >
                    <div className="col-span-2 flex mt-1 justify-start text-sm flex-col h-full items-center gap-y-2">
                      <img className="h-12" src={userIMG} />
                      <div className="text-blue-700">User</div>
                    </div>
                    <div className="col-span-10 grid grid-cols-12 gap-x-7 gap-y-4 mt-1">
                      <div className="col-span-2 flex items-center">
                        Facilities:
                      </div>
                      <div className="col-span-3 text-sm">
                        <ComboBox
                          options={availableRatings}
                          selectedValue={facilities}
                          onValueChange={handleChangeFacilities}
                        />
                      </div>
                      <div className="col-span-2 flex items-center ">
                        Education:
                      </div>
                      <div className="col-span-3 text-sm">
                        <ComboBox
                          options={availableRatings}
                          selectedValue={education}
                          onValueChange={handleChangeEducation}
                        />
                      </div>
                      <div className="col-span-12 flex flex-row items-center">
                        {facilities > 0 && education > 0 ? (
                          <>
                            <div className="flex items-center">
                              Overall Rating:
                            </div>

                            <div className="ml-9 text-sm">
                              {Math.trunc(
                                (parseInt(facilities) + parseInt(education)) / 2
                              )}
                            </div>
                            <img className="h-3 ml-1" src={star} />
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="border-2 border-gray-400 col-span-12 h-32 px-2 py-3 text-sm mt-2"
                      />
                      <button
                        type="submit"
                        className="col-span-2 bg-blue-700 text-white h-8"
                      >
                        Post
                      </button>
                      <div className={error.style + " col-span-12"}>
                        {error.message}
                      </div>
                    </div>
                  </form>
                  {reviews.map((value, index) => {
                    return (
                      <div
                        key={"review" + index}
                        className="col-span-12 bg-white grid text-sans grid-cols-12 gap-y-4 gap-x-7 px-7 py-4 rounded lato shadow"
                      >
                        <div className="col-span-2 flex mt-1 justify-start text-sm flex-col h-full items-center gap-y-2">
                          <img className="h-12" src={userIMG} />
                          <div className="text-blue-700 flex-col text-center">
                            <div>{value.user.firstName}</div>
                            <div>{value.user.lastName}</div>{" "}
                          </div>
                        </div>
                        <div className="col-span-10 grid grid-cols-12 gap-x-7 gap-y-4 mt-1 text-sm">
                          <div className="col-span-2 flex items-center">
                            Facilities:
                          </div>
                          <div className="col-span-3 text-sm flex items-center">
                            {value.facilities} / 5
                            <img className="h-3 ml-1" src={star} />
                          </div>
                          <div className="col-span-2 flex items-center ">
                            Education:
                          </div>
                          <div className="col-span-3 text-sm flex items-center">
                            {value.education} / 5
                            <img className="h-3 ml-1" src={star} />
                          </div>
                          <div className="col-span-12 flex flex-row items-center text-sm">
                            <div className="flex items-center mr-4">
                              Overall Rating:
                            </div>
                            <div className="ml-4  flex items-center">
                              {value.overallRating} / 5
                            </div>
                            <img className="h-3 ml-1" src={star} />
                          </div>
                          <hr className="w-full text-gray-500 col-span-12 place-items-center" />
                          <div className="col-span-12 mb-5 text-gray-800">
                            {value.comment}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div className="flex h-96 items-center justify-center text-xl">
            Loading...
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContentDetails;
