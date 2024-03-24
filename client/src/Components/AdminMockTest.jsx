import { useState, useEffect } from "react";
import editImg from "../Images/edit.png"
import deleteImg from "../Images/delete.png"
import rightImg from "../Images/check-mark.png"
import wrongImg from "../Images/cross.png"
import addImg from "../Images/add-button.png"
import VerticalNavbar from "./VerticalNavbar";
import ComboBox from "./ComboBox";


const AdminMockTest = () => {
    const wrongError = "text-red-600 text-xs"
    const rightError = "text-green-600 text-xs"
    const [question, setQuestion] = useState([]);
    const [error, setError] = useState({})
    const [editPressed, setEditPressed] = useState(false)
    const [createPressed, setCreatePressed] = useState(false)
    const [identifyID, setIdentifyID] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [isPaidMember, setIsPaidMember] = useState(false)
    const [availableRoles, setAvailableRoles] = useState(
        [
            {label: "Question", value: "question"},
            {label: "Admin", value: "admin"},
            {label: "Counselor", value: "counselor"},
        ]
    )

    useEffect(() => {
        getQuestions()
    }, [])

    const handleChangeRole = (value) => {
        setRole(value);
    }

    const getQuestions = async () => {
        const response = await fetch("http://localhost:1447/api/getquestioninfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        setQuestion(answer.data)
    }


    const deleteQuestions = async (questionId) => {
        const response = await fetch(`http://localhost:1447/api/question/delete/${questionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const answer = await response.json();
        if (answer.message == "data_deleted") {
            const newError = { ...error }
            newError.message = "The data has been deleted"
            newError.style = rightError
            setError(newError)
            const newData = question.filter(item => item._id !== questionId);
            setQuestion(newData)
        }
        else {
            error.message = "There was an error deleting data"
            error.style = wrongError
        }
    }

    const editQuestions = async (questionId) => {
        const response = await fetch(`http://localhost:1447/api/question/update/${questionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                role,
                isPaidMember
            })
        })
        const answer = await response.json();
        if (answer.message == "data_updated") {
            const index = question.findIndex(random => random._id == questionId);
            const updatedSubject = Object.assign({}, question[index], { 
                firstName,
                lastName,
                email,
                password,
                role,
                isPaidMember });
            const newState = [...question];
            newState[index] = updatedSubject;
            setQuestion(newState)
            setFirstName(""); 
            setLastName(""); 
            setEmail(""); 
            setPassword(""); 
            setRole(""); 
            setIsPaidMember(false); 
            setCreatePressed(false);
            const newError = { ...error }
            newError.message = "The data has been updated"
            newError.style = rightError
            setError(newError)
        }
        else {
            error.message = "There was an error deleting data"
            error.style = wrongError
        }
    }

    const createQuestions = async () => {
        const response = await fetch("http://localhost:1447/api/question/create", {
            method: "POST",
            //sends the data in json format
            headers: {
                "Content-Type": "application/json"
            },
            //sends the states to the server
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                role,
                isPaidMember
            })
        })

        const answer = await response.json()
        if (answer.data) {
            const newError = { ...error }
            newError.message = "The question have been sucessfully added"
            newError.style = rightError
            setError(newError)
            setQuestion(answer.data)
        } else {
            const newError = { ...error }
            newError.message = "There was an error"
            newError.style = wrongError
            setError(newError)
        }
    }

    const showEditMode = (firstName, lastName, email, role, isPaidMember, newID) => {
        setFirstName(firstName)
        setLastName(lastName)
        setEmail(email)
        setRole(role)
        setIsPaidMember(isPaidMember)
        setEditPressed(true)
        setIdentifyID(newID)
    }




    return (
        <div className="flex flex-row w-full">
            <VerticalNavbar/>
            <div className="flex w-full pt-10 px-10 flex-col pb-10">
                <div className="text-2xl mb-10 font-bold tracking-tight spacegrotesk text-gray-500"><span>Questions</span></div>
                <div className={error.style}>{error.message}</div>
                <table className=" text-gray-600 text-xs font-medium rounded shadow-lg lato">
                    <thead>
                        <tr className="grid border-y grid-cols-12 place-items-center h-11 bg-gray-100">
                            <th className="col-span-1">S.N.</th>
                            <th className="col-span-4">Question</th>
                            <th className="col-span-1">Subject</th>
                            <th className="col-span-1">Answer</th>
                            <th className="col-span-1">Option</th>
                            <th className="col-span-1">Option</th>
                            <th className="col-span-1">Option</th>
                            <th className="col-span-1">Option</th>
                            <th className="col-span-1"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {question.map((value, index) => {
                            return (
                                (!editPressed || value._id != identifyID) ?
                                    <tr key={index} className={"hover:bg-yellow-100 border-y grid grid-cols-12 h-11 max-h-11 place-items-center " + `${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                        <td className="col-span-1">{index + 1}</td>
                                        <td className="col-span-4 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.question}</td>
                                        <td className="col-span-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.subject}</td>
                                        <td className="col-span-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.answer}</td>
                                       <td key={index + "jk"} className="col-span-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.options[0] || ""}</td>
                                       <td key={index + "jk"} className="col-span-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.options[1] || ""}</td>
                                       <td key={index + "jk"} className="col-span-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.options[2] || ""}</td>
                                       <td key={index + "jk"} className="col-span-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.options[3] || ""}</td>
                                        <td className="flex items-center gap-x-5 col-span-1">
                                            <button onClick={() => showEditMode(value.firstName, value.lastName, value.email, value.role, value.isPaidMember, value._id)}><img className="h-6" src={editImg} /></button>
                                            <button onClick={() => { deleteQuestions(value._id) }}><img className="h-7" src={deleteImg} /></button>
                                        </td>
                                    </tr>
                                    :
                                    <tr key={index} className={"border-y grid grid-cols-12 h-11 max-h-11 place-items-center " + `${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                        <td className="col-span-1">{index + 1}</td>
                                        <td className="col-span-4 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} /></td>
                                        <td className="col-span-1 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setLastName(e.target.value) }} value={lastName} /></td>
                                        <td className="col-span-1 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setEmail(e.target.value) }} value={email} /></td>
                                        <td className="col-span-1 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setEmail(e.target.value) }} value={email} /></td>
                                        <td className="col-span-1 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setEmail(e.target.value) }} value={email} /></td>
                                        <td className="col-span-1 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setEmail(e.target.value) }} value={email} /></td>

                                        <td className="flex items-center gap-x-7 col-span-2">
                                            <button onClick={() => { editQuestions(value._id); setEditPressed(false); }}><img className="h-5" src={rightImg} /></button>
                                            <button onClick={() => setEditPressed(false)}><img className="h-4" src={wrongImg} /></button>
                                        </td>
                                    </tr>
                            )

                        })}
                        {createPressed?
                        (
                            <tr  className="border-y grid grid-cols-12 h-11 max-h-11 place-items-center">
                                <td className="col-span-1 border w-full h-full flex items-center justify-center">+</td>
                                <td className="col-span-1 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} /></td>
                                <td className="col-span-2 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setLastName(e.target.value) }} value={lastName} /></td>
                                <td className="col-span-2 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setEmail(e.target.value) }} value={email} /></td>
                                <td className="col-span-1 w-full h-full border-r"><input className="w-full h-full bg-transparent outline-none" onChange={(e) => { setPassword(e.target.value) }} value={password} /></td>
                                <td className="col-span-2 w-full h-full border-r flex items-center justify-center"><ComboBox border={true} options={availableRoles} selectedValue={role} onValueChange={handleChangeRole}/></td>
                                <td className="col-span-1 w-full h-full border-r flex items-center justify-center"><input type="checkbox" className="w-4/6 h-4/6 bg-transparent outline-none" onChange={(e) => { setIsPaidMember(e.target.checked) }} value={isPaidMember} /></td>
                                
                        
                                <td className="flex items-center gap-x-7 col-span-2">
                                    <button onClick={() => { createQuestions(); setFirstName(""); setLastName(""); setEmail(""); setPassword(""); setRole(""); setIsPaidMember(false); setCreatePressed(false); }}><img className="h-5" src={rightImg} /></button>
                                    <button onClick={() => setCreatePressed(false)}><img className="h-4" src={wrongImg} /></button>
                                </td>
                            </tr>
                        )
                        :
                        (
                            <></>
                        )}
                        

                    </tbody>
                </table>
                <button className="bg-gray-400 w-8 h-8 mt-8 text-white hover:bg-gray-700" onClick={() => setCreatePressed(true)}>+</button>
                
            </div>
        </div>
    );
}

export default AdminMockTest;