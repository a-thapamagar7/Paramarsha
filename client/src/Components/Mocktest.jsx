import { useEffect, useState } from "react";
import ComboBox from "./ComboBox";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Question from "./Question";
import right from "../Images/check-mark.png"
import wrong from "../Images/cross.png"
import { capitalizeFirstLetter } from "../utils/formatter";

const Mocktest = () => {
    const wrongError = "text-red-600 text-lg"
    const [start, setStart] = useState(false)
    const [finished, setFinished] = useState(false)
    const [questionNos, setQuestionNos] = useState(0)
    const [selectedSubject, setSelectedSubject] = useState('');
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [error, setError] = useState({});
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getSubjects()
    }, [])

    //for random shuffle of elements in options
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array
      }

    //to get the subjects which are available and capitalizing the first letter of the subject
    const getSubjects = async () => {
        const response = await fetch("http://localhost:1447/api/getquestions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();

        const newOptions = []
        for (let i = 0; i < answer.data.length; i++) {
            const labelValue = {}
            labelValue.label = capitalizeFirstLetter(answer.data[i])
            labelValue.value = answer.data[i]
            newOptions.push(labelValue)
        }

        setOptions(newOptions)
    }

    const askQuestions = async () => {
        const response = await fetch("http://localhost:1447/api/getquestions", {
            method: "POST",
            //sends the data in json format
            headers: {
                "Content-Type": "application/json"
            },
            //sends the states to the server
            body: JSON.stringify({
                selectedSubject,
                questionNos
            })
        })
        const answer = await response.json();
        if (!answer.data) {
            error.message = "There was an error fetching data"
            error.style = wrongError
        }
        else {
            const newQuestions = answer.data
            for(let i = 0; i < newQuestions.length; i++)
            {
                const newOptions = shuffleArray(newQuestions[i].options)
                newQuestions[i].options = newOptions
            }
            setQuestions(newQuestions)
            setStart(true)
        }
    }

    const handleValueChange = (value) => {
        setSelectedSubject(value);
    }

    const handleAnswerSelect = (questionID, answer) => {
        //sets the selected answer everytime the user clicks a radio button of a question
        const newSelectedAnswers = { ...selectedAnswers }
        newSelectedAnswers[questionID] = answer
        setSelectedAnswers(newSelectedAnswers)

        const question = questions.find((q) => q._id === questionID)
        const newWrongAnswers = [...wrongAnswers]


        //checks and stores the wrong answer in array
        if (question.answer !== answer) {
            //checks to see if the user has already gave a wrong answer and to replace it with the recent one
            if (newWrongAnswers.find((q) => q.q_ID === questionID)) {
                const index = newWrongAnswers.indexOf(newWrongAnswers.find((q) => q.q_ID === questionID))
                newWrongAnswers[index].selectedAnswer = answer
            }
            else {
                newWrongAnswers.push({
                    q_ID: question._id,
                    question: question.question,
                    selectedAnswer: answer,
                    answer: question.answer
                })

            }
            setWrongAnswers(newWrongAnswers)
            if (newSelectedAnswers[questionID]) {
                delete newSelectedAnswers[questionID]
                setSelectedAnswers(newSelectedAnswers)
            }
        }
        // to remove the wrong response if the user has corrected it
        else if (newWrongAnswers.find((q) => q.q_ID === questionID)) {
            const i = newWrongAnswers.indexOf(newWrongAnswers.find((q) => q.q_ID === questionID))
            newWrongAnswers.splice(i, 1)
            setWrongAnswers(newWrongAnswers)
        }

    }

    const checkAnswers = () => {
        let newscore = 0
        for (let i = 0; i < Object.keys(selectedAnswers).length; i++) {
            const selectedAnswer = Object.values(selectedAnswers)[i]
            const question = questions.find((q) => q._id === Object.keys(selectedAnswers)[i])
            if (selectedAnswer === question.answer) {
                newscore++
            }
        }
        setScore(newscore)
    }

    const onFinished = async (event) => {
        event.preventDefault()
        if ((Object.keys(selectedAnswers).length + wrongAnswers.length) !== questions.length) {
            const newError = { ...error }
            newError.message = "Please attempt all the questions"
            newError.style = wrongError
            setError(newError)
        }
        else {
            checkAnswers()
            setFinished(true)
            window.scrollTo(0, 0)
        }
    }

    const OnStartSubmit = async (event) => {
        event.preventDefault()
        if (selectedSubject === "" || questionNos === "") {
            const newError = { ...error }
            newError.message = "Please input all the required fields"
            newError.style = wrongError
            setError(newError)
        }
        else {
            setError({})
            askQuestions()
        }
    }


    return (
        <div>
            <div className="px-20 w-full mb-0">
                <Navbar />
                {start ?
                    (
                        <>
                            {finished ?
                                (
                                    //displays the result
                                    <div className="w-full flex-col flex justify-center mt-14">
                                        <div className="flex flex-col gap-y-4 text-center font-sans tracking-tighter w-full">
                                            <div className="flex gap-x-3 font-bold w-full justify-center">
                                                <span className="text-5xl">You got </span>
                                                <span className="text-5xl text-blue-700"> {((score / questions.length) * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="text-xl justify-center w-full">{score} out of {questions.length} answers were correct in {selectedSubject}</div>
                                        </div>

                                        <div className="flex flex-col gap-y-11 mt-20">
                                            {wrongAnswers.map((result, i) => (
                                                <div key={result.selectedAnswer + i}>
                                                    <div className="flex flex-row items-center w-max gap-x-6">
                                                        <div className="lato text-lg">{i + 1}.</div>
                                                        <div className="lato text-lg">{result.question}</div>
                                                    </div>
                                                    <div className="flex flex-col mt-3 gap-y-2">
                                                        <div className="flex flex-row lato text-lg items-center gap-x-5">
                                                            <img alt="wrong" src={wrong} className="w-5 h-5" />
                                                            <div className="underline decoration-double underline-offset-4 decoration-red-600">
                                                                {result.selectedAnswer}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row lato text-lg items-center gap-x-5">
                                                            <img alt="right" src={right} className="w-5 h-5" />
                                                            <div>
                                                                {result.answer}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <form onSubmit={onFinished} className="flex flex-col gap-y-11 mt-10 pl-5">
                                        <div className="w-full text-center text-2xl tracking-tighter">{capitalizeFirstLetter(selectedSubject)}</div>
                                        {questions.map((question, i) => (
                                            <Question key={i} question={question} questionNo={i + 1} nameGroup={question._id} handleOption={handleAnswerSelect} />
                                        ))}
                                        <button className="w-36 h-11 bg-blue-700 text-white spacegrotesk" type="submit">Submit</button>
                                        <div className={error.style}>{error.message}</div>
                                    </form>
                                )}

                        </>

                    )
                    :
                    (<div className="flex justify-center items-center mt-20">
                        <div className="p-5 w-1/2 flex flex-col gap-y-12">
                            <div className="text-4xl font-sans font-extrabold tracking-tight text-gray-900 w-full flex">Practice Mock Test</div>
                            <form onSubmit={OnStartSubmit} className="flex flex-col gap-x-4 gap-y-9 text-lg">
                                <div className="flex justify-between">
                                    <label className="">Subject: </label>
                                    <div className="w-80">
                                        <ComboBox options={options} selectedValue={selectedSubject} onValueChange={handleValueChange} />
                                    </div>
                                    
                                </div>
                                <div className="flex justify-between gap-x-5">
                                    <label className="" >No of questions: </label>
                                    <input type="number" className="border border-black py-2 px-3 w-80" value={questionNos} onChange={(e) => setQuestionNos(e.target.value)} />
                                </div>
                                <button type="submit" className='border w-2/6 h-10 bg-blue-700 spacegrotesk text-sm text-white'>Start</button>
                            </form>
                            <div className={error.style}>{error.message}</div>
                        </div>
                    </div>)
                }
            </div>

            <Footer />
        </div>

    );
}

export default Mocktest;