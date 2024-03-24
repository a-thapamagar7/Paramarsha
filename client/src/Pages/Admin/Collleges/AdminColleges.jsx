import { useState, useEffect } from "react";
import editImg from "../../../Images/edit.png"
import deleteImg from "../../../Images/delete.png"
import { useNavigate } from "react-router-dom";
import VerticalNavbar from "../../../Components/VerticalNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminColleges = () => {
    const navigate = useNavigate()

    const wrongError = "text-red-600 text-xs"
    const rightError = "text-green-600 text-xs"
    const [college, setCollege] = useState([]);
    const [error, setError] = useState({})

    useEffect(() => {
        getColleges()
    }, [])

    const getColleges = async () => {
        const response = await fetch("http://localhost:1447/api/getcollegeinfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        console.log(answer)
        setCollege(answer.data)
        console.log()
    }

    

    const deleteColleges = async (userId) => {
        const response = await fetch(`http://localhost:1447/api/college/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const answer = await response.json();
        if (answer.status == "success") {
            toast.success(answer.message)
            const newData = college.filter(item => item._id !== userId);
            setCollege(newData)
        }
        else {
            toast.success(answer.message)
        }
    }


    return (
        <div className="flex flex-row w-full">
            <ToastContainer/>
            <VerticalNavbar/>
            <div className="flex w-full pt-10 px-10 flex-col pb-10">
                <div className="text-2xl mb-10 font-bold tracking-tight spacegrotesk text-gray-500"><span>Colleges</span></div>
                <div className={error.style}>{error.message}</div>
                <table className=" text-gray-600 text-xs font-medium rounded shadow-lg lato">
                    <thead>
                        <tr className="grid border-y grid-cols-12 place-items-center h-11 bg-gray-100">
                            <th className="col-span-1">S.N.</th>
                            <th className="col-span-2">Name</th>
                            <th className="col-span-1">Location</th>
                            <th className="col-span-1">Website</th>
                            <th className="col-span-2">University</th>
                            <th className="col-span-1">Fee</th>
                            <th className="col-span-1">Description</th>
                            <th className="col-span-1">Subjects</th>
                            <th className="col-span-1">Courses</th>
                            <th className="col-span-1"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {college.map((value, index) => {
                            return (
                                <tr key={index} className={"border-y hover:bg-yellow-100 grid grid-cols-12 h-11 max-h-11 place-items-center " + `${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="col-span-1">{index + 1}</td>
                                    <td className="gap-x-1 col-span-2 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.name}</td>
                                    <td className="gap-x-1 col-span-1 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.location}</td>
                                    <td className="gap-x-1 col-span-1 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.website}</td>
                                    <td className="gap-x-1 col-span-2 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.university}</td>
                                    <td className="gap-x-1 col-span-1 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{value.approximateFee}</td>
                                    <td className="relative col-span-1 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
                                        {value.description}
                                    </td>
                                    <td className="gap-x-1 col-span-1 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full ">
                                        {value.subjects.map((val, index)=>{
                                            return(<span key={val + index} className="">{(index === value.subjects.length-1)?(<> {" " + val}</>):(<>{val + ","} </>)}</span>)
                                        })}
                                    </td>
                                    <td className="gap-x-1 col-span-1 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
                                        {value.courses.map((val, index)=>{
                                            return(<span key={val + index} className="">{(index === value.subjects.length-1)?(<> {" " + val}</>):(<>{val + ","} </>)}</span>)
                                        })}
                                    </td>

                                    <td className="flex items-center gap-x-5 col-span-1">
                                        <button onClick={()=>{navigate(`/admin/colleges/add/${value._id}`)}}><img className="h-6" src={editImg} /></button>
                                        <button onClick={()=>{deleteColleges(value._id)}}><img className="h-7" src={deleteImg} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="bg-gray-400 w-8 h-8 mt-8 text-white hover:bg-gray-700" onClick={()=>{navigate("/admin/colleges/add")}}>+</button>
                
                
            </div>
        </div>
        
    );
}
 
export default AdminColleges;