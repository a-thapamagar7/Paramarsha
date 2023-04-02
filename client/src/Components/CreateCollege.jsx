import { useState, react, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/formatter";

const CreateCollege = () => {

    const { id } = useParams();
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [university, setUniversity] = useState("")
    const [website, setWebsite] = useState("")
    const [fee, setFee] = useState("")
    const [courses, setCourses]= useState("")
    const [course, setCourse] = useState([])
    const [subjects, setSubjects] = useState([])
    const [description, setDescription] = useState("")
    const [availableSubjects, setAvailableSubjects] = useState([])
    const [availableCourses, setAvailableCourses] = useState([])
    const [error, setError] = useState([])

    const handleCheckboxSubject = (event) => {
        const value = event.target.value;
        const index = subjects.indexOf(value);
    
        if (event.target.checked) {
          if (index === -1) {
            setSubjects([...subjects, value]);
          }
        } else {
          if (index !== -1) {
            const newCheckedBoxes = [...subjects];
            newCheckedBoxes.splice(index, 1);
            setSubjects(newCheckedBoxes);
          }
        }
    }

    const handleCheckboxCourse = (event) => {
        const value = event.target.value;
        const index = courses.indexOf(value);
    
        if (event.target.checked) {
          if (index === -1) {
            setCourses([...courses, value]);
          }
        } else {
          if (index !== -1) {
            const newCheckedBoxes = [...courses];
            newCheckedBoxes.splice(index, 1);
            setCourses(newCheckedBoxes);
          }
        }
    }

    const getSubjects = async () => {
        const response = await fetch("http://localhost:1447/api/getsubjectinfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        setAvailableSubjects(answer.data)
    }

    const getCourses = async () => {
        const response = await fetch("http://localhost:1447/api/getcourseinfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const answer = await response.json();
        setAvailableCourses(answer.data)
    }

    useEffect(() => {
        getSubjects()
        getCourses()
    }, [])

    return (
        <>
            <div className="px-20">
            <Navbar/>
            <form className="flex flex-col mt-10 gap-y-6 lato">
                <div className=" text-4xl tracking-tighter font-sans font-bold"><span>Add New </span><span className="text-blue-700">College</span></div>
                
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Name</div>
                    <input value={name} OnChange={(e) => setName(e)} className="border border-black col-span-4 h-8 text-sm px-2 py-4"/>
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Location</div>
                    <input value={location} OnChange={(e) => setLocation(e)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>
                
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">University</div>
                    <input value={university} OnChange={(e) => setUniversity(e)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>

                <div className="grid grid-cols-12 items-center w-2/3 gap-y-4">
                        <div className="col-span-12">Courses</div>
                        {availableCourses.map((v, i) => {
                            return (
                                <div key={v.name+i} className='flex items-center gap-x-3 col-span-6'>
                                    <input id={v.name + i} type="checkbox" value={v.name} checked={courses.indexOf(v.name) !== -1} onChange={handleCheckboxCourse} />
                                    <label htmlFor={v.name + i} className='text-base'>{capitalizeFirstLetter(v.name)}</label>
                                </div>
                            )
                        })}
                </div>

                <div className="grid grid-cols-12 items-center w-2/3 gap-y-4">
                    <div className="col-span-12">Subjects</div>
                    {availableSubjects.map((v, i) => {
                        return (
                            <div key={v.name + i} className='flex items-center gap-x-3 col-span-4'>
                                <input id={v.name + i} type="checkbox" value={v.name} checked={subjects.indexOf(v.name) !== -1} onChange={handleCheckboxSubject} />
                                <label htmlFor={v.name + i} className='text-base'>{capitalizeFirstLetter(v.name)}</label>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2">Approximate Fee</div>
                    <input value={fee} OnChange={(e) => setFee(e)}  className="border border-black col-span-4 h-8 text-sm px-2"/>
                </div>

                <div className="grid grid-cols-12 items-center gap-y-4">
                    <div className="col-span-12">Description</div>
                    <textarea OnChange={(e) => setDescription(e)}   className="border border-black col-span-8 h-40"/>
                </div>

                <button type="submit" className="border bg-blue-700 text-white w-2/12 spacegrotesk h-12">Submit</button>
            </form>
        </div>
        <Footer/>
    </>
        
    )
}
 
export default CreateCollege;