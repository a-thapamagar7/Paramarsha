import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Common/Navbar";
import khaltiIMG from "../../Images/khalti.png";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Features from "../../Components/HomepageSections/Features";
import test1 from "../../Images/test.png";
import call from "../../Images/video-call.png";

const EPayment = () => {
  const [searchParams] = useSearchParams();
  const [transactionSent, setTransactionSent] = useState(false);
  const [requested, setRequested] = useState(false);
  const [premium, setPremium] = useState(false);
  const [error, setError] = useState({});
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length !== 0) {
      setRequested(true);
      if (params.pidx) {
        sendTransaction(params);
      }
    }
  }, [transactionSent]);

  const initiatePayment = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/epay`, {
      method: "POST",
      //sends the data in json format
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      //sends the states to the server
    });
    const answer = await response.json();
    if (answer.data) {
      window.location.replace(answer.data.payment_url);
    } else if (answer.message === "user_paid") {
      setRequested(true);
      setPremium(true);
    } else {
      const newError = { ...error };
      newError.message = "The was an error";
      newError.style = "text-red-700 text-lg";
      setError(newError);
    }
  };

  const sendTransaction = async (params) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/transaction`,
      {
        method: "POST",
        //sends the data in json format
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          params,
        }),
        //sends the states to the server
      }
    );
    const answer = await response.json();
    if (answer.message === "premium_updated") {
      setPremium(true);
    } else {
      setPremium(false);
    }
  };

  return (
    <>
      <div className="flex px-20 flex-col items-center">
        <Navbar />
        {!requested ? (
          <div className="flex flex-col mt-10 items-center">
            <div className="flex flex-row text-3xl gap-x-2 ">
              <div className="tracking-tight font-extrabold">Become </div>
              <div className="text-purple-900 tracking-tight font-extrabold">
                Premium Member
              </div>
            </div>
            <div className="inter text-sm mt-2">
              Get access to features such as Mock Test and Meeting with
              Counselors
            </div>
            <img
              alt="khalti Logo"
              className="h-44 mr-16 mt-2"
              src={khaltiIMG}
            />
            <button
              onClick={initiatePayment}
              className="mr-10 w-4/12 h-10 border mt-7 bg-purple-900 rounded-md text-white lato font-bold"
            >
              Pay with Khalti
            </button>
            <div className="mr-12 text-xl mt-5">Rs. 200</div>
            <div className={error.style}>{error.message}</div>
          </div>
        ) : (
          <>
            {premium ? (
              <div className="flex flex-col mt-10 items-center">
                <div className="flex flex-row text-3xl gap-x-2 ">
                  <div className="tracking-tight font-extrabold">Welcome</div>
                  <div className="text-blue-700 tracking-tight font-extrabold">
                    Premium Member
                  </div>
                </div>
                <div className="inter text-sm mt-2">
                  You have gained access to features such as Mock Test and
                  Meeting with Counselors
                </div>
                <div className="flex flex-row gap-x-10">
                  <Features
                    link="/test"
                    name="Mock Tests"
                    details="User will be able to take mock test or exams for preparation of certain courses which require entrance examination."
                    premium="For premium users only, Join Us"
                    image={test1}
                  />
                  <Features
                    name="Meeting with Counselors"
                    details="User will be able to take advice from professional counselors to help them gain proper guidance and support."
                    premium="For premium users only, Join Us"
                    image={call}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col mt-10 items-center">
                <div className="flex flex-row text-3xl gap-x-2 ">
                  <div className="text-red-700 tracking-tight font-extrabold">
                    Error
                  </div>
                </div>
                <div className="inter text-sm mt-2">
                  An error occured during the transaction please try again
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EPayment;
