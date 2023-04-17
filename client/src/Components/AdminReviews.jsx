import { useState, useEffect } from "react";
import editImg from "../Images/edit.png"
import deleteImg from "../Images/delete.png"
import rightImg from "../Images/check-mark.png"
import wrongImg from "../Images/cross.png"
import addImg from "../Images/add-button.png"
import VerticalNavbar from "./VerticalNavbar";


const AdminReviews = () => {
    const wrongError = "text-red-600 text-xs"
    const rightError = "text-green-600 text-xs"
    const [review, setReview] = useState([]);
    const [error, setError] = useState({})
    const [editPressed, setEditPressed] = useState(false)
    const [createPressed, setCreatePressed] = useState(false)
    const [identifyID, setIdentifyID] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        getReviews()
    }, [])

    const getReviews = async () => {
        const response = await fetch("http://localhost:1447/api/getreviewinfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        setReview(answer.data)
    }


    const deleteReviews = async (userId) => {
        const response = await fetch(`http://localhost:1447/api/review/delete/${userId}`, {
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
            const newData = review.filter(item => item._id !== userId);
            setReview(newData)
        }
        else {
            error.message = "There was an error deleting data"
            error.style = wrongError
        }
    }
    

    return (
        <div className="flex flex-row w-full">
            <VerticalNavbar/>
            <div className="flex w-full pt-10 px-10 flex-col pb-10">
                <div className="text-2xl mb-10 font-bold tracking-tight spacegrotesk text-gray-500"><span>Reviews</span></div>
                <div className={error.style}>{error.message}</div>
                <table className=" text-gray-600 text-xs font-medium rounded shadow-lg lato">
                    <thead>
                        <tr className="grid border-y grid-cols-12 place-items-center h-11 bg-gray-100">
                            <th className="col-span-1">S.N.</th>
                            <th className="col-span-1 flex">Name</th>
                            <th className="col-span-3">College</th>
                            <th className="col-span-1">Email</th>
                            <th className="col-span-1">Facilities</th>
                            <th className="col-span-1">Education</th>
                            <th className="col-span-1">Overall Rating</th>
                            <th className="col-span-2">Comment</th>
                            <th className="col-span-1"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {review.map((value, index) => {
                            return (
                                <tr key={index} className={"hover:bg-yellow-100 border-y grid grid-cols-12 h-11 max-h-11 place-items-center " + `${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="col-span-1">{index + 1}</td>
                                    <td className="col-span-1 flex flex-col items-center"><div>{value.user.firstName + " "}</div><div>{value.user.lastName}</div></td>
                                    <td className="col-span-3">{value.college.name}</td>
                                    <td className="col-span-1">{value.user.email}</td>
                                    
                                    
                                    <td className="col-span-1">{value.facilities}/5</td>
                                    <td className="col-span-1">{value.education}/5</td>
                                    <td className="col-span-1">{value.overallRating}/5</td>
                                    <td className="col-span-2 max-w-full overflow-hidden whitespace-nowrap truncate h-full hover:whitespace-nowrap hover:trunca hover:overflow-x-scroll">{value.comment}</td>
                                    <td className="flex items-center gap-x-5 col-span-1">
                                        <button onClick={() => { deleteReviews(value._id) }}><img className="h-7" src={deleteImg} /></button>
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}

export default AdminReviews;