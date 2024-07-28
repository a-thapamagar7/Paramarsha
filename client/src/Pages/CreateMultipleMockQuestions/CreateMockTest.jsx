import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ComboBox from '../../Components/Common/ComboBox';
import Footer from '../../Components/Common/Footer';
import Navbar from '../../Components/Common/Navbar';
import Question from '../TakeMock/Question';

const CreateMockTest = () => {

    const navigate = useNavigate()
    const methodOptions = [
        { label: 'One at a time', value: "one" },
        { label: 'Mutiple at a time', value: "many" },
    ]

    const [selectedValue, setSelectedValue] = useState("");
    const forHeading = "text-base font-sans"
    const [subject, setSubject] = useState("")
    const [question, setQuestion] = useState("")
    const [multiQuestions, setMultiQuestions] = useState("")
    const [multiQuestionArray, setMultiQuestionArray] = useState("")
    const [multiAdded, setMultiAdded] = useState(false)
    const [answer, setAnswer] = useState("")
    const [options, setOptions] = useState(["", "", ""])
    const [error, setError] = useState({});
    const [forShow, setForShow] = useState({});
    const [added, setAdded] = useState(false);
    const [submittedMethod, setSubmittedMethod] = useState(false);

    const OnStartSubmit = async (event) => {
        event.preventDefault()
        console.log(selectedValue)
        if (selectedValue == "") {
            const newError = { ...error }
            newError.message = "Please input all the required fields"
            newError.style = "text-red-600 text-lg"
            setError(newError)
        }
        else {
            setError({})
            setSubmittedMethod(true)
        }
    }

    const handleValueChange = (value) => {
        setSelectedValue(value);
    }

    const OnMultiSubmit = async (event) => {
        event.preventDefault()
        const newMutiQuestionArray = [...multiQuestionArray]
        const splitMultiQuestions = multiQuestions.split("\n")
        for (let i = 0; i < splitMultiQuestions.length; i++) {
            const random = splitMultiQuestions[i].split(";")
            const newQuestion = {}
            const newOptions = []
            newQuestion.subject = subject
            for (let j = 0; j < random.length; j++) {
                if (random[j].substring(0, 5) === "(que)") {
                    newQuestion.question = random[j].slice(5)
                }
                else if (random[j].substring(0, 5) === "(ans)") {
                    newQuestion.answer = random[j].slice(5)
                    newOptions.push(random[j].slice(5))
                }
                else if (random[j].substring(0, 5) === "(opt)") {
                    newOptions.push(random[j].slice(5))
                }

            }
            newQuestion.options = newOptions
            newMutiQuestionArray.push(newQuestion)
        }
        setMultiQuestionArray(newMutiQuestionArray)
        createMultiQuestion(newMutiQuestionArray)
        setMultiQuestions("")
    }


    //checks if there any empty strings in an array
    const checkNull = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "") return true
        }
    }

    const createMultiQuestion = async (multiArray) => {
        const response = await fetch("http://localhost:1447/api/createquestion/many", {
            method: "POST",
            //sends the data in json format
            headers: {
                "Content-Type": "application/json"
            },
            //sends the states to the server
            body: JSON.stringify({
                multiArray
            })
        })

        const data = await response.json()
        console.log(data.message)
        if (data.message == "data_added") {
            const newError = { ...error }
            newError.message = "The questions have been sucessfully added"
            newError.style = "text-green-700 text-lg"
            setError(newError)
        } else {
            const newError = { ...error }
            newError.message = "There was an error"
            newError.style = "text-red-600 text-lg"
            setError(newError)
        }
    }

    const createQuestion = async () => {
        const response = await fetch("http://localhost:1447/api/createquestion/one", {
            method: "POST",
            //sends the data in json format
            headers: {
                "Content-Type": "application/json"
            },
            //sends the states to the server
            body: JSON.stringify({
                question,
                subject,
                answer,
                options
            })
        })

        const data = await response.json()
        console.log(data)
        if (data.message == "data_added") {
            const newError = { ...error }
            newError.message = "The question has been sucessfully added"
            newError.style = "text-green-700 text-lg"
            setError(newError)
        } else {
            const newError = { ...error }
            newError.message = "There was an error"
            newError.style = "text-red-600 text-lg"
            setError(newError)
        }
    }

    const onMultiQuestions = (event) => {
        setMultiQuestions(event.target.value)
    }

    const onSubject = (event) => {
        setSubject(event.target.value)
    }

    const onQuestion = (event) => {
        setQuestion(event.target.value)
    }

    const onAnswer = (event) => {
        setAnswer(event.target.value)
    }

    const onOption = (index, e) => {
        const newOption = [...options]
        newOption[index] = e.target.value
        setOptions(newOption)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!subject || !question || !answer || checkNull(options)) {

            const newError = { ...error }
            newError.message = "Please fill all required fields"
            newError.style = "text-red-600 text-lg"
            setError(newError)

        }
        else {
            createQuestion()
            const newShow = {}
            newShow.question = question
            newShow.options = options
            newShow.options.push(answer)
            setForShow(newShow)

            setAnswer("")
            setQuestion("")
            setSubject("")
            setOptions(["", "", ""])
            setAdded(true)
        }
    }



    return (
        <>
            <div className='px-20'>
                <Navbar />
                {!submittedMethod ?
                    (
                        <div className="flex justify-center items-center mt-20">
                            <div className="p-5 w-1/2 flex flex-col gap-y-12">
                                <div className="text-4xl font-sans font-extrabold tracking-tight text-gray-900 w-full flex">Create Mock Questions</div>
                                <form onSubmit={OnStartSubmit} className="flex flex-col gap-x-4 gap-y-7 text-lg">
                                    <div className="flex justify-between items-center">
                                        <label className="">Method: </label>
                                        <div className='w-80'>
                                            <ComboBox options={methodOptions} selectedValue={selectedValue} onValueChange={handleValueChange} />
                                        </div>
                                        
                                    </div>
                                    <button type="submit" className='border w-2/6 h-10 bg-blue-700 spacegrotesk text-sm text-white'>Start</button>

                                </form>
                            </div>

                        </div>
                    )
                    :
                    (
                        <>
                            {selectedValue == "many" ?
                                (
                                    <div className='grid grid-cols-1 gap-y-5 mb-5'>
                                        <div className="text-3xl font-sans font-extrabold tracking-tight">Create Mock <span className='text-blue-700'>Test</span></div>
                                        <form onSubmit={OnMultiSubmit} className='grid grid-cols-1 gap-y-5 mb-20'>
                                            <div className='flex flex-row gap-x-7 items-center'>
                                                <label className={forHeading + " font-extrabold"}>Subject:</label>
                                                <input value={subject} placeholder='Subject' onChange={onSubject} className='border-black text-base borderM question1 w-4/12 py-3 px-6' />
                                            </div>
                                            <hr className='mb-10' />
                                            <div>
                                                <div className={forHeading + " font-extrabold"}>Instructions:</div>
                                                <ul className='list-disc'>
                                                    <li>Each individual question should be in different lines.</li>
                                                    <li>Use ; as seperator between questions, options and answer without the use of space.</li>
                                                    <li>Denote question with (que) at the begining with no space, (ans) for answer and (opt) for options at the begining with no spaces</li>
                                                </ul>
                                                <div className='flex flex-col mt-5 mb-5'>
                                                    <span className={forHeading + " font-extrabold"}>Demo</span>
                                                    <span>(que)What is earth?;(ans)planet;(opt)star;(opt)satellite;(opt)galaxy</span>
                                                    <span>(que)Which planet is called the red planet?;(ans)mars;(opt)earth;(opt)venus;(opt)jupiter</span>
                                                </div>
                                            </div>
                                            <textarea value={multiQuestions} onChange={onMultiQuestions} className='flex text-sm border-black borderM question w-full h-96 py-3 px-6' />
                                            <button type='submit' className='border w-2/12 h-14  bg-blue-700 spacegrotesk text-white mt-6 text-sm'>Submit</button>
                                            <div className={error.style}>{error.message}</div>
                                            {/* {multiAdded ?
                                                (
                                                    <div>
                                                        <span className={forHeading + " font-extrabold"}>Preview</span>
                                                        {multiQuestionArray.map((result, index)=>{
                                                            <Question question={result} questionNo={1} nameGroup={1} />
                                                        })}
                                                        <Question question={forShow} questionNo={1} nameGroup={1} />
                                                    </div>)
                                                :
                                                (
                                                    <></>
                                                )
                                            } */}
                                        </form>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        <form onSubmit={handleSubmit} className='mt-14 flex flex-col gap-y-14'>
                                            <div className="text-3xl font-sans font-extrabold tracking-tight">Create Mock <span className='text-blue-700'>Test</span></div>
                                            <div className='grid grid-cols-1 gap-y-5 mb-20'>
                                                <div className='flex flex-row gap-x-7 items-center'>
                                                    <label className={forHeading + " font-extrabold"}>Subject:</label>
                                                    <input value={subject} placeholder='Subject' onChange={onSubject} className='border-black text-base borderM question1 w-4/12 py-3 px-6' />
                                                </div>
                                                <hr className='mb-10' />
                                                <label className={forHeading + " underline underline-offset-2"}>Question</label>
                                                <textarea value={question} onChange={onQuestion} className='flex text-sm border-black border-2 question w-full h-28 py-3 px-6' />
                                                <div className='flex flex-row gap-x-5 items-center'>
                                                    <label className={forHeading + " text-blue-700"}>Answer:</label>
                                                    <input value={answer} onChange={onAnswer} placeholder='Answer' className='border-black text-sm borderM question1 w-8/12 py-3 px-6' />
                                                </div>
                                                <div className='flex flex-row gap-x-6 items-center'>
                                                    <label className={forHeading + ""}>Option:</label>
                                                    <input value={options[0]} onChange={(e) => onOption(0, e)} placeholder='Option' className='border-black text-sm borderM question1 w-1/2 py-3 px-6' />
                                                </div>
                                                <div className='flex flex-row gap-x-6 items-center'>
                                                    <label className={forHeading + ""}>Option:</label>
                                                    <input value={options[1]} onChange={(e) => onOption(1, e)} placeholder='Option' className='border-black text-sm borderM question1 w-1/2 py-3 px-6' />
                                                </div>
                                                <div className='flex flex-row gap-x-6 items-center'>
                                                    <label className={forHeading + ""}>Option:</label>
                                                    <input value={options[2]} onChange={(e) => onOption(2, e)} placeholder='Option' className='border-black text-sm borderM question1 w-1/2 py-3 px-6' />
                                                </div>
                                                <button type='submit' className='border w-2/12 h-14  bg-blue-700 spacegrotesk text-white mt-6 text-sm'>Submit</button>
                                                <div className={error.style}>{error.message}</div>
                                            </div>
                                        </form>
                                        {added ?
                                            (
                                                <div>
                                                    <span className={forHeading + " font-extrabold"}>Demo</span>
                                                    <Question question={forShow} questionNo={1} nameGroup={1} />
                                                </div>)
                                            :
                                            (
                                                <></>
                                            )
                                        }
                                    </>
                                )}

                        </>
                    )}

            </div>
            <Footer />
        </>

    );
}

export default CreateMockTest;